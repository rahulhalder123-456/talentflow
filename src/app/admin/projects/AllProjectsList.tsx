
"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db, collection, query, onSnapshot } from "@/lib/firebase/client";
import { Loader } from "@/components/common/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type UserProfile = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

type Project = {
    id: string;
    projectTitle: string;
    userId: string;
    budget: string;
    status: string;
    createdAt: string;
    deadline: string;
    paymentType: string;
};

type GroupedProject = {
    user: UserProfile;
    projects: Project[];
};

export function AllProjectsList() {
    const { user: authUser } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const { toast } = useToast();

    // Effect for fetching projects
    useEffect(() => {
        if (!authUser) {
            setLoadingProjects(false);
            return;
        }
        const projectsQuery = query(collection(db, "projects"));
        const unsubscribe = onSnapshot(projectsQuery, 
            (snapshot) => {
                const projectsData = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
                        deadline: data.deadline?.toDate().toISOString() || new Date().toISOString(),
                    } as Project;
                });
                setProjects(projectsData);
                setLoadingProjects(false);
            },
            (error) => {
                console.error("Error fetching projects:", error);
                toast({ variant: "destructive", title: "Failed to load projects", description: "This is likely a security rules issue." });
                setLoadingProjects(false);
            }
        );
        return () => unsubscribe();
    }, [authUser, toast]);

    // Effect for fetching users
    useEffect(() => {
        if (!authUser) {
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
    }, [authUser, toast]);
    
    const groupedProjects = useMemo(() => {
        if (loadingProjects || loadingUsers) return [];

        const userMap = new Map(users.map(u => [u.id, u]));
        const projectsByUser: Record<string, GroupedProject> = {};

        for (const project of projects) {
            const projectUser = userMap.get(project.userId) || {
                id: project.userId,
                firstName: 'Client Profile',
                lastName: `Pending`,
                email: 'No profile created yet'
            };
            
            if (!projectsByUser[project.userId]) {
                projectsByUser[project.userId] = { user: projectUser, projects: [] };
            }
            projectsByUser[project.userId].projects.push(project);
        }
        
        const groupedData = Object.values(projectsByUser).filter(group => group.projects.length > 0);
        
        groupedData.forEach(group => {
            group.projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        });

        groupedData.sort((a, b) => {
            const lastA = new Date(a.projects[0].createdAt).getTime();
            const lastB = new Date(b.projects[0].createdAt).getTime();
            return lastB - lastA;
        });

        return groupedData;
    }, [projects, users, loadingProjects, loadingUsers]);
    
    const loading = loadingProjects || loadingUsers;

    if (loading) {
        return <Loader />;
    }

    const totalProjects = projects.length;
    const totalClients = groupedProjects.length;

    return (
        <Card className="bg-secondary/20 border-border/50 shadow-lg">
            <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                    {totalProjects} project(s) found across {totalClients} client(s).
                </CardDescription>
            </CardHeader>
            <CardContent>
                {groupedProjects.length > 0 ? (
                    <Accordion type="multiple" className="w-full space-y-4">
                        {groupedProjects.map(({ user, projects }) => (
                            <AccordionItem value={user.id} key={user.id} className="border border-border/50 rounded-lg bg-secondary/30 px-4">
                                <AccordionTrigger className="hover:no-underline">
                                    <div className="flex items-center gap-3 w-full">
                                        <Avatar>
                                            <AvatarFallback>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <div className="font-semibold">{user.firstName} {user.lastName}</div>
                                            <div className="text-sm text-muted-foreground">{projects.length} project(s)</div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="bg-background/30 -mx-4 -mb-4 rounded-b-lg">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Title</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Budget</TableHead>
                                                    <TableHead>Deadline</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {projects.map(project => (
                                                    <TableRow key={project.id} className="border-border/50">
                                                        <TableCell className="font-medium">{project.projectTitle}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={project.status === 'Open' ? 'secondary' : 'default'}>{project.status}</Badge>
                                                        </TableCell>
                                                        <TableCell>${project.budget}</TableCell>
                                                        <TableCell>{format(new Date(project.deadline), 'PP')}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Button asChild variant="outline" size="sm">
                                                                <Link href={`/projects/${project.id}`}>
                                                                    View Details
                                                                </Link>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className="flex items-center justify-center h-24 text-center text-muted-foreground">
                        No projects found on the platform.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
