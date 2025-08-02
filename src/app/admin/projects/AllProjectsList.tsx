
"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db, collection, query, onSnapshot } from "@/lib/firebase/client";
import { Loader } from "@/components/common/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
        <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="px-0">
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                    {totalProjects} project(s) found across {totalClients} client(s).
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                {groupedProjects.length > 0 ? (
                    <Accordion type="multiple" className="w-full space-y-4">
                        {groupedProjects.map(({ user, projects }) => (
                            <AccordionItem value={user.id} key={user.id} className="border border-border/50 rounded-lg bg-secondary overflow-hidden">
                                <AccordionTrigger className="hover:no-underline px-6 py-4 data-[state=open]:border-b data-[state=open]:border-border/50">
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
                                <AccordionContent className="px-0 pt-0 pb-0">
                                    {/* Responsive container for projects */}
                                    <div className="md:hidden p-4 space-y-4 bg-background/20">
                                        {/* Mobile Card View */}
                                        {projects.map(project => (
                                            <Card key={project.id} className="bg-secondary/50">
                                                <CardHeader>
                                                    <CardTitle>{project.projectTitle}</CardTitle>
                                                    <Badge variant={project.status === 'Open' ? 'secondary' : 'default'} className="w-fit">{project.status}</Badge>
                                                </CardHeader>
                                                <CardContent className="space-y-2 text-sm">
                                                    <div><span className="font-semibold text-muted-foreground">Budget:</span> Rs. {project.budget}{project.paymentType !== 'fixed' ? ` / ${project.paymentType.replace('ly', '')}` : ''}</div>
                                                    <div><span className="font-semibold text-muted-foreground">Deadline:</span> {format(new Date(project.deadline), 'PP')}</div>
                                                </CardContent>
                                                <CardFooter>
                                                    <Button asChild size="sm" className="w-full bg-primary/20 text-primary-foreground/90 hover:bg-primary/30">
                                                        <Link href={`/projects/${project.id}`}>
                                                            View Details
                                                        </Link>
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                    <div className="hidden md:block overflow-x-auto">
                                        {/* Desktop Table View */}
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="pl-6">Title</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Budget</TableHead>
                                                    <TableHead>Deadline</TableHead>
                                                    <TableHead className="text-right pr-9">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {projects.map(project => (
                                                    <TableRow key={project.id}>
                                                        <TableCell className="font-medium pl-6">{project.projectTitle}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={project.status === 'Open' ? 'secondary' : 'default'}>{project.status}</Badge>
                                                        </TableCell>
                                                        <TableCell>Rs. {project.budget}{project.paymentType !== 'fixed' ? ` / ${project.paymentType.replace('ly', '')}` : ''}</TableCell>
                                                        <TableCell>{format(new Date(project.deadline), 'PP')}</TableCell>
                                                        <TableCell className="text-right pr-6">
                                                            <Button asChild size="sm" className="bg-primary/20 text-primary-foreground/90 hover:bg-primary/30">
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
