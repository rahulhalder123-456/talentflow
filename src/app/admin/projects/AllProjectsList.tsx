
"use client";

import { useState, useEffect } from "react";
import { getAllProjects } from "@/app/projects/actions";
import { Loader } from "@/components/common/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';

type Project = {
    id: string;
    projectTitle: string;
    userId: string;
    budget: string;
    status: string;
    createdAt: string;
};

export function AllProjectsList() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            const result = await getAllProjects();
            if (result.success) {
                const sortedProjects = result.projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setProjects(sortedProjects as Project[]);
            }
            setLoading(false);
        };
        fetchProjects();
    }, []);

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
                            <TableHead>Posted</TableHead>
                            <TableHead className="text-right">Client ID</TableHead>
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
                                    <TableCell>{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</TableCell>
                                    <TableCell className="text-right font-mono text-xs text-muted-foreground">{project.userId}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
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
