
"use client";

import { useState, useEffect } from "react";
import { getAllChats } from "@/app/dashboard/messages/actions";
import { Loader } from "@/components/common/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Chat = {
    id: string;
    lastMessageAt: string;
};

export function AllChatsList() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true);
            const result = await getAllChats();
            if (result.success) {
                const sortedChats = result.chats.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
                setChats(sortedChats as Chat[]);
            }
            setLoading(false);
        };
        fetchChats();
    }, []);

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
                            <TableHead>Client ID</TableHead>
                            <TableHead>Last Update</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {chats.length > 0 ? (
                            chats.map((chat) => (
                                <TableRow key={chat.id}>
                                    <TableCell className="font-mono text-xs">{chat.id.replace('support_', '')}</TableCell>
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
