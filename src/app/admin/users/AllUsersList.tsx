
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db, collection, query, onSnapshot, doc, getDoc } from "@/lib/firebase/client";
import { Loader } from "@/components/common/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { updateAdminStatus } from "./actions";

type UserProfile = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export function AllUsersList() {
    const { user: authUser } = useAuth();
    const { toast } = useToast();

    const [users, setUsers] = useState<UserProfile[]>([]);
    const [adminUids, setAdminUids] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authUser) {
            setLoading(false);
            return;
        }

        setLoading(true);
        // Fetch all users
        const usersRef = collection(db, "users");
        const usersQuery = query(usersRef);
        const unsubscribeUsers = onSnapshot(usersQuery, 
            (querySnapshot) => {
                const usersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as UserProfile[];
                setUsers(usersData);
            }, 
            (error) => {
                console.error("Error fetching all users:", error);
                toast({ variant: "destructive", title: "Failed to load users" });
            }
        );

        // Fetch admin UIDs
        const adminDocRef = doc(db, 'config', 'admins');
        const unsubscribeAdmins = onSnapshot(adminDocRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    setAdminUids(docSnap.data().uids || []);
                } else {
                    toast({ variant: "destructive", title: "Admin Config Missing", description: "The admin configuration document was not found in Firestore." });
                }
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching admin UIDs:", error);
                toast({ variant: "destructive", title: "Failed to load admin roles" });
                setLoading(false);
            }
        );

        return () => {
            unsubscribeUsers();
            unsubscribeAdmins();
        };
    }, [authUser, toast]);
    
    const handleAdminToggle = async (userId: string, makeAdmin: boolean) => {
        const originalAdminUids = [...adminUids];
        // Optimistic UI update
        if(makeAdmin) {
            setAdminUids(prev => [...prev, userId]);
        } else {
            setAdminUids(prev => prev.filter(uid => uid !== userId));
        }

        const result = await updateAdminStatus(userId, makeAdmin);
        if (!result.success) {
            // Revert on failure
            setAdminUids(originalAdminUids);
            toast({
                variant: 'destructive',
                title: 'Update Failed',
                description: result.error?.includes('permission-denied') 
                    ? 'Permission Denied. You might not have the rights to perform this action.'
                    : result.error
            });
        } else {
            toast({
                title: 'Success!',
                description: `User's admin status has been updated.`,
            });
        }
    };


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
                            <TableHead>User ID</TableHead>
                            <TableHead className="text-right">Admin Role</TableHead>
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
                                    <TableCell className="font-mono text-xs text-muted-foreground">{user.id}</TableCell>
                                    <TableCell className="text-right">
                                       <Switch
                                            checked={adminUids.includes(user.id)}
                                            onCheckedChange={(checked) => handleAdminToggle(user.id, checked)}
                                            disabled={user.id === authUser?.uid}
                                            aria-label={`Toggle admin status for ${user.email}`}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
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
