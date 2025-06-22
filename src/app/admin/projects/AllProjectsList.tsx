
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db, collection, query, onSnapshot } from "@/lib/firebase/client";
import { Loader } from "@/components/common/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format, formatDistanceToNow } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export function AllProjectsList() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef);

        const unsubscribe = onSnapshot(q, 
            (querySnapshot) => {
                const projectsData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
                        deadline: data.deadline?.toDate().toISOString() || new Date().toISOString(),
                    } as Project;
                });

                const sortedProjects = projectsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setProjects(sortedProjects);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching all projects:", error);
                toast({
                    variant: "destructive",
                    title: "Failed to load projects",
                    description: "An error occurred fetching projects. This is likely a security rules issue.",
                });
                setLoading(false);
            }
        );

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, [user, toast]);

    if (loading) {
        return <Loader />;
    }

    return (
        <Card className="bg-secondary/20 border-border/50 shadow-lg">
            <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                    {projects.length} project(s) found on the platform.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Payment Type</TableHead>
                            <TableHead>Deadline</TableHead>
                            <TableHead>Posted</TableHead>
                            <TableHead>Client ID</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.projectTitle}</TableCell>
                                    <TableCell>
                                        <Badge variant={project.status === 'Open' ? 'secondary' : 'default'}>{project.status}</Badge>
                                    </TableCell>
                                    <TableCell>${project.budget}</TableCell>
                                    <TableCell className="capitalize">{project.paymentType}</TableCell>
                                    <TableCell>{format(new Date(project.deadline), 'PP')}</TableCell>
                                    <TableCell>{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</TableCell>
                                    <TableCell className="text-right font-mono text-xs text-muted-foreground">{project.userId}</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/projects/${project.id}`}>
                                                View Details
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    No projects found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
