
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/common/Header";
import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, PlusCircle } from "lucide-react";
import { format, formatDistanceToNow } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";
import { db, collection, query, where, onSnapshot } from "@/lib/firebase/client";
import { useToast } from "@/hooks/use-toast";

type Project = {
    id: string;
    projectTitle: string;
    projectDescription: string;
    budget: string;
    status: string;
    createdAt: string;
    deadline: string;
    paymentType: string;
};

export default function ProjectsPage() {
    const { user, loading: authLoading } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (user) {
            setLoading(true);
            const q = query(collection(db, "projects"), where("userId", "==", user.uid));
            
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
            }, (error) => {
                console.error("Error fetching real-time projects:", error);
                toast({
                    variant: "destructive",
                    title: "Could Not Load Projects",
                    description: "A permissions error occurred. Please ensure your Firestore security rules are up-to-date in the Firebase Console.",
                });
                setLoading(false);
            });

            return () => unsubscribe();
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading, toast]);

    if (authLoading) {
        return <Loader />;
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="mb-8">
                        <Button variant="ghost" asChild>
                            <Link href="/dashboard">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Link>
                        </Button>
                    </div>

                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="font-headline text-4xl font-bold tracking-tight">My Projects</h1>
                            <p className="mt-2 text-muted-foreground">View and manage all your project listings.</p>
                        </div>
                        <Button asChild>
                            <Link href="/post-project">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Post New Project
                            </Link>
                        </Button>
                    </div>
                    
                    {loading ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array(3)].map((_, i) => (
                                <Card key={i} className="bg-secondary/20 border-border/50 shadow-lg">
                                    <CardHeader>
                                        <Skeleton className="h-6 w-3/4 rounded-md" />
                                        <Skeleton className="h-5 w-1/4 rounded-md" />
                                    </CardHeader>
                                    <CardContent>
                                        <Skeleton className="h-4 w-full rounded-md mb-2" />
                                        <Skeleton className="h-4 w-full rounded-md mb-2" />
                                        <Skeleton className="h-4 w-2/3 rounded-md" />
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                         <Skeleton className="h-5 w-1/3 rounded-md" />
                                         <Skeleton className="h-5 w-1/4 rounded-md" />
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : projects.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                            {projects.map((project) => (
                                <Link href={`/projects/${project.id}`} key={project.id}>
                                    <Card className="flex h-full flex-col cursor-pointer bg-secondary/20 border-border/50 shadow-lg transition-transform duration-300 hover:-translate-y-1">
                                        <CardHeader>
                                            <CardTitle>{project.projectTitle}</CardTitle>
                                            <Badge variant={project.status === 'Open' ? 'secondary' : 'default'} className="w-fit">{project.status}</Badge>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p className="text-muted-foreground line-clamp-3">
                                                {project.projectDescription || "No description provided."}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground border-t border-border/50 pt-4 mt-4">
                                            <div>Budget: <span className="font-semibold text-foreground">Rs. {project.budget}{project.paymentType !== 'fixed' ? ` / ${project.paymentType.replace('ly', '')}` : ''}</span></div>
                                            <div>Payment: <span className="font-semibold text-foreground capitalize">{project.paymentType}</span></div>
                                            <div>Posted: <span className="font-semibold text-foreground">{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</span></div>
                                            <div>Deadline: <span className="font-semibold text-foreground">{format(new Date(project.deadline), 'PP')}</span></div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <Card className="bg-secondary/20 border-border/50 shadow-lg">
                            <CardContent>
                                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/60 p-12 text-center">
                                    <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h3 className="mt-4 text-xl font-semibold">No Projects Yet</h3>
                                    <p className="mb-4 mt-2 text-sm text-muted-foreground">
                                        Ready to get started? Post your first project to attract top talent.
                                    </p>
                                    <Button asChild>
                                        <Link href="/post-project">Post a Project</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}
