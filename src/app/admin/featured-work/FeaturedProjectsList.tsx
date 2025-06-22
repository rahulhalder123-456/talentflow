
"use client";

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Link as LinkIcon, AppWindow, Apple, Play } from 'lucide-react';
import type { FeaturedProject } from '@/features/landing/types';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { revalidateFeaturedWorkPaths } from './actions';
import { db, doc, deleteDoc } from '@/lib/firebase/client';


interface FeaturedProjectsListProps {
    projects: FeaturedProject[];
}

export function FeaturedProjectsList({ projects: initialProjects }: FeaturedProjectsListProps) {
    const { toast } = useToast();
    const [projects, setProjects] = React.useState(initialProjects);

    const handleDelete = async (id: string) => {
        try {
            // Perform delete on the client side to ensure auth context
            const projectRef = doc(db, 'featuredProjects', id);
            await deleteDoc(projectRef);

            // Revalidate paths on the server
            await revalidateFeaturedWorkPaths();

            setProjects(projects.filter(p => p.id !== id));
            toast({
                title: "Project Removed",
                description: "The project has been removed from the showcase.",
            });
        } catch (error) {
            console.error("Error deleting featured project:", error);
            toast({
                variant: "destructive",
                title: "Deletion Failed",
                description: "Could not remove the project. Please try again.",
            });
        }
    };

    if (projects.length === 0) {
        return (
            <Card className="bg-secondary/20 border-border/50 shadow-lg mt-8">
                <CardHeader>
                    <CardTitle>Current Featured Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">No featured projects have been added yet.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-secondary/20 border-border/50 shadow-lg mt-8">
            <CardHeader>
                <CardTitle>Current Featured Projects</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card key={project.id} className="flex flex-col bg-background/50">
                            <CardHeader>
                                <Image 
                                    src={project.imageUrl} 
                                    alt={project.title} 
                                    width={400} 
                                    height={250} 
                                    className="rounded-md aspect-[16/10] object-cover"
                                />
                                <CardTitle className="pt-4">{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm line-clamp-3">{project.description}</p>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-4">
                                <div className="flex flex-wrap gap-2">
                                    {project.projectUrl && <Button size="sm" variant="outline" asChild><Link href={project.projectUrl} target="_blank"><LinkIcon />Website</Link></Button>}
                                    {project.appStoreUrl && <Button size="sm" variant="outline" asChild><Link href={project.appStoreUrl} target="_blank"><Apple />App Store</Link></Button>}
                                    {project.playStoreUrl && <Button size="sm" variant="outline" asChild><Link href={project.playStoreUrl} target="_blank"><Play />Play Store</Link></Button>}
                                </div>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => handleDelete(project.id)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
