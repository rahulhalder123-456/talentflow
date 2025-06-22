
"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db, collection, query, onSnapshot } from "@/lib/firebase/client";
import { Loader } from "@/components/common/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Define UserProfile type
type UserProfile = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

// Updated Chat type to include user details
type Chat = {
    id: string; // The chat document ID (e.g., support_userId)
    lastMessageAt: string;
    userId: string;
    userName: string;
    userAvatar: string;
};

export function AllChatsList() {
    const { user } = useAuth();
    const [rawChats, setRawChats] = useState<{ id: string; lastMessageAt: string }[]>([]);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loadingChats, setLoadingChats] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const { toast } = useToast();

    // Effect to fetch all chats
    useEffect(() => {
        if (!user) {
            setLoadingChats(false);
            return;
        }

        const chatsRef = collection(db, "chats");
        const q = query(chatsRef);

        const unsubscribe = onSnapshot(q, 
            (querySnapshot) => {
                const chatsData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        lastMessageAt: data.lastMessageAt?.toDate().toISOString() || new Date().toISOString(),
                    };
                });
                
                const sortedChats = chatsData.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
                setRawChats(sortedChats);
                setLoadingChats(false);
            },
            (error) => {
                console.error("Error fetching all chats:", error);
                toast({
                    variant: "destructive",
                    title: "Failed to load chats",
                    description: "An error occurred fetching chats. This is likely a security rules issue.",
                });
                setLoadingChats(false);
            }
        );

        return () => unsubscribe();
    }, [user, toast]);

    // Effect to fetch all users
    useEffect(() => {
        if (!user) {
            setLoadingUsers(false);
            return;
        }

        const usersQuery = query(collection(db, "users"));
        const unsubscribe = onSnapshot(usersQuery,
            (snapshot) => {
                const usersData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as UserProfile[];
                setUsers(usersData);
                setLoadingUsers(false);
            },
            (error) => {
                console.error("Error fetching users:", error);
                toast({ variant: "destructive", title: "Failed to load users", description: "This might be a permission issue." });
                setLoadingUsers(false);
            }
        );
        return () => unsubscribe();
    }, [user, toast]);
    
    // Combine chat and user data
    const chats = useMemo((): Chat[] => {
        if (loadingChats || loadingUsers) return [];

        const userMap = new Map(users.map(u => [u.id, u]));

        return rawChats.map(chat => {
            const userId = chat.id.replace('support_', '');
            const userProfile = userMap.get(userId);
            
            const firstName = userProfile?.firstName || '';
            const lastName = userProfile?.lastName || '';
            const userName = `${firstName} ${lastName}`.trim();
            
            return {
                ...chat,
                userId,
                userName: userName || 'Client Profile Pending',
                userAvatar: `${firstName.charAt(0)}${lastName.charAt(0)}`
            };
        });

    }, [rawChats, users, loadingChats, loadingUsers]);


    const loading = loadingChats || loadingUsers;

    if (loading) {
        return <Loader />;
    }

    return (
        <Card className="bg-secondary/20 border-border/50 shadow-lg">
            <CardHeader>
                <CardTitle>Client Conversations</CardTitle>
                <CardDescription>
                    {chats.length} active conversation(s) found.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Last Update</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {chats.length > 0 ? (
                            chats.map((chat) => (
                                <TableRow key={chat.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarFallback>{chat.userAvatar}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                              <span className="font-medium">{chat.userName}</span>
                                              <span className="text-xs text-muted-foreground font-mono">{chat.userId}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{formatDistanceToNow(new Date(chat.lastMessageAt), { addSuffix: true })}</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/admin/messages/${chat.id}`}>
                                                Open Chat <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    No conversations yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
