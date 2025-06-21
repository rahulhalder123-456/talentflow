
"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Paperclip, Send, File as FileIcon, LoaderCircle } from "lucide-react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebase/client";
import { sendMessage } from "@/app/dashboard/messages/actions";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from 'date-fns';

type Message = {
  id: string;
  senderId: string;
  text?: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: any;
};

// List of disallowed file extensions
const BLOCKED_EXTENSIONS = [
  '.exe', '.msi', '.bat', '.com', '.cmd', '.inf', '.ipa', '.osx', '.pif', 
  '.run', '.wsh', '.sh', '.dll', '.scr', '.jar'
];

interface AdminChatInterfaceProps {
    chatId: string;
}

export function AdminChatInterface({ chatId }: AdminChatInterfaceProps) {
  const { user } = useAuth(); // for auth check
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const clientUserId = chatId.replace('support_', '');
  const ADMIN_USER_ID = 'support-admin';

  useEffect(() => {
    if (!chatId) return;

    setIsLoadingMessages(true);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
        } as Message;
      });
      setMessages(msgs);
      setIsLoadingMessages(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not load messages." });
      setIsLoadingMessages(false);
    });

    return () => unsubscribe();
  }, [chatId, toast]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || !chatId) return;
    setIsSending(true);
    // Admin sends message with their special ID
    await sendMessage({ chatId, userId: ADMIN_USER_ID, text: newMessage });
    setNewMessage("");
    setIsSending(false);
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !user || !chatId) return;
    
    const file = event.target.files[0];
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

    if (BLOCKED_EXTENSIONS.includes(fileExtension)) {
      toast({ variant: "destructive", title: "Upload Failed", description: "This file type is not allowed for security reasons." });
      return;
    }
    
    setIsSending(true);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `chat_files/${chatId}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      await sendMessage({
        chatId,
        userId: ADMIN_USER_ID,
        fileUrl: downloadURL,
        fileName: file.name,
      });

    } catch (error) {
       toast({ variant: "destructive", title: "Upload Failed", description: "Could not upload your file. Please try again." });
    } finally {
      setIsSending(false);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex-1 flex flex-col border border-border/50 rounded-lg shadow-lg overflow-hidden bg-secondary/20 h-[calc(100vh-250px)]">
        <div className="border-b border-border/50 p-4">
            <h1 className="font-headline text-xl font-bold">Chat with Client</h1>
            <p className="text-sm text-muted-foreground font-mono text-xs">{clientUserId}</p>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {isLoadingMessages ? (
            <div className="flex justify-center items-center h-full">
                <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
            </div>
            ) : messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                    No messages yet.
                </div>
            ) : (
            messages.map(message => (
                <div key={message.id} className={`flex items-end gap-3 ${message.senderId === clientUserId ? 'justify-start' : 'justify-end'}`}>
                {message.senderId === clientUserId && (
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                )}
                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${message.senderId === clientUserId ? 'bg-secondary text-secondary-foreground rounded-bl-none' : 'bg-primary text-primary-foreground rounded-br-none'}`}>
                    {message.text && <p className="text-sm">{message.text}</p>}
                    {message.fileUrl && (
                    <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm underline hover:no-underline">
                        <FileIcon className="h-5 w-5 shrink-0" />
                        <span className="truncate">{message.fileName || "View File"}</span>
                    </a>
                    )}
                    {message.createdAt && <p className="text-xs opacity-60 mt-1.5 text-right">{formatDistanceToNow(message.createdAt, { addSuffix: true })}</p>}
                </div>
                 {message.senderId !== clientUserId && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>TF</AvatarFallback>
                        </Avatar>
                    )}
                </div>
            ))
            )}
            <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-border/50 p-4 bg-background/50">
            <div className="relative">
            <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message as an admin..."
                className="pr-24 min-h-[50px] resize-none"
                onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                }
                }}
                disabled={isSending}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" disabled={isSending} />
                <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} disabled={isSending}>
                    <Paperclip className="h-5 w-5" />
                </Button>
                <Button type="button" size="icon" onClick={handleSendMessage} disabled={isSending || !newMessage.trim()}>
                    {isSending ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
            </div>
            </div>
        </div>
    </div>
  );
}
