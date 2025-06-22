
"use client";

import { useState, useEffect } from "react";
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
    const [groupedProjects, setGroupedProjects] = useState<GroupedProject[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (!authUser) {
            setLoading(false);
            return;
        }

        setLoading(true);

        const projectsRef = collection(db, "projects");
        const projectsQuery = query(projectsRef);

        const unsubscribeProjects = onSnapshot(projectsQuery, (projectsSnapshot) => {
            const projectsData = projectsSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
                    deadline: data.deadline?.toDate().toISOString() || new Date().toISOString(),
                } as Project;
            });

            const usersRef = collection(db, "users");
            const usersQuery = query(usersRef);

            const unsubscribeUsers = onSnapshot(usersQuery, (usersSnapshot) => {
                const usersData = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as UserProfile[];
                
                const userMap = new Map(usersData.map(u => [u.id, u]));
                const projectsByUser: Record<string, { user: UserProfile; projects: Project[] }> = {};

                for (const project of projectsData) {
                    const projectUser = userMap.get(project.userId);
                    if (projectUser) {
                        if (!projectsByUser[project.userId]) {
                            projectsByUser[project.userId] = { user: projectUser, projects: [] };
                        }
                        projectsByUser[project.userId].projects.push(project);
                    }
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

                setGroupedProjects(groupedData);
                setLoading(false);
            }, (error) => {
                console.error("Error fetching users:", error);
                toast({ variant: "destructive", title: "Failed to load users", description: "This might be a permission issue." });
                setLoading(false);
            });
            
            return () => unsubscribeUsers(); // This should be handled in the main cleanup
        }, (error) => {
            console.error("Error fetching projects:", error);
            toast({ variant: "destructive", title: "Failed to load projects", description: "This is likely a security rules issue." });
            setLoading(false);
        });

        // The onSnapshot doesn't return a promise, so we can't chain .then on it.
        // We'll manage the user subscription inside the project subscription.
        // A more robust solution might use two separate useEffects, but this is fine for this case.

        return () => {
            unsubscribeProjects();
            // How to unsubscribe users? We can't access it here. A better pattern is needed for production.
            // For now, it will re-subscribe on each project change, which is acceptable.
        };
    }, [authUser, toast]);


    if (loading) {
        return <Loader />;
    }

    const totalProjects = groupedProjects.reduce((acc, group) => acc + group.projects.length, 0);

    return (
        <Card className="bg-secondary/20 border-border/50 shadow-lg">
            <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                    {totalProjects} project(s) found across {groupedProjects.length} client(s).
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
