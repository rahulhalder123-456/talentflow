
"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Mic, LoaderCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

import { Header } from '@/components/common/Header';
import { Loader } from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { continueConversation } from '@/ai/flows/chatbot-flow';
import type { ChatbotInput } from '@/features/chatbot/types';

type Message = {
    role: 'user' | 'ai';
    text: string;
};

export default function ChatbotPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', text: "Hello! I'm TalentBot. How can I help you with the Talent Flow platform today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/signin');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', text: input };
        const currentHistory = [...messages]; // Capture history before adding new message

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiInput: ChatbotInput = {
                history: currentHistory, // Use captured history
                message: input,
            };

            const result = await continueConversation(aiInput);

            const aiMessage: Message = { role: 'ai', text: result.response };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("AI chat error:", error);
            toast({
                variant: 'destructive',
                title: 'AI Error',
                description: 'The chatbot is currently unavailable. Please try again later.'
            });
            // Re-add the user message to the input so they can try again
            setInput(userMessage.text);
            // remove the optimistic user message from history
            setMessages(prev => prev.slice(0, -1));

        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading || !user) {
        return <Loader />;
    }

    return (
        <div className="flex h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 overflow-hidden">
                 <div className="h-full flex flex-col container mx-auto max-w-4xl px-4 md:px-6 py-8">
                     {/* Chat Header */}
                     <div className="flex items-center mb-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/dashboard">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <h1 className="text-xl font-bold ml-2">AI Assistant</h1>
                     </div>

                     {/* Chat Body */}
                    <div className="flex-1 bg-secondary/20 border border-border/50 rounded-xl shadow-lg flex flex-col overflow-hidden">
                        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'ai' && (
                                        <Avatar className="w-8 h-8 border-2 border-primary/50">
                                            <AvatarFallback>
                                                <Sparkles className="w-4 h-4 text-primary" />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`max-w-md rounded-2xl px-4 py-3 shadow-md ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    {msg.role === 'user' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-4 justify-start">
                                    <Avatar className="w-8 h-8 border-2 border-primary/50">
                                        <AvatarFallback>
                                            <Sparkles className="w-4 h-4 text-primary" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="max-w-md rounded-2xl px-4 py-3 shadow-md bg-secondary text-secondary-foreground rounded-bl-none flex items-center">
                                        <LoaderCircle className="w-5 h-5 animate-spin"/>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        {/* Chat Input */}
                        <div className="border-t border-border/50 p-4 bg-background/50">
                            <form onSubmit={handleSubmit} className="flex items-center gap-4">
                                <Textarea 
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="Ask me anything about Talent Flow..."
                                    className="flex-1 resize-none min-h-[40px] max-h-[120px] bg-secondary/50 border-border/70 focus-visible:ring-primary"
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }
                                    }}
                                    disabled={isLoading}
                                />
                                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground" disabled={isLoading}>
                                    <Mic className="w-5 h-5" />
                                </Button>
                                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                    {isLoading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                </Button>
                            </form>
                        </div>
                    </div>
                 </div>
            </main>
        </div>
    )
}
