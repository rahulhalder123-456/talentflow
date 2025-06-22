
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db, collection, query, onSnapshot } from "@/lib/firebase/client";
import { Loader } from "@/components/common/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

type UserProfile = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export function AllUsersList() {
    const { user } = useAuth();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const usersRef = collection(db, "users");
        const q = query(usersRef);

        const unsubscribe = onSnapshot(q, 
            (querySnapshot) => {
                const usersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as UserProfile[];
                setUsers(usersData);
                setLoading(false);
            }, 
            (error) => {
                console.error("Error fetching all users:", error);
                toast({
                    variant: "destructive",
                    title: "Failed to load users",
                    description: "An error occurred fetching users. This is likely a security rules issue.",
                });
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user, toast]);

    if (loading) {
        return <Loader />;
    }

    return (
        <Card className="bg-secondary/20 border-border/50 shadow-lg">
            <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                    {users.length} user(s) found on the platform.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">User ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarFallback>
                                                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.firstName} {user.lastName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="text-right font-mono text-xs text-muted-foreground">{user.id}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    No users found. Users will appear here after they update their profile.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
