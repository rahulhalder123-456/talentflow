
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Header } from '@/components/common/Header';
import { Loader } from '@/components/common/Loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, Clock, Tag, User } from 'lucide-react';
import { format } from 'date-fns';
import { isAdmin } from '@/lib/admin';

type Project = {
    id: string;
    projectTitle: string;
    projectDescription: string;
    budget: string;
    status: 'Open' | 'In Progress' | 'Closed';
    createdAt: Date;
    deadline: Date;
    paymentType: string;
    desiredSkills: string;
    userId: string;
};

export default function ProjectDetailsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const projectId = params.projectId as string;

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [isUserAdmin, setIsUserAdmin] = useState(false);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push('/signin');
            return;
        }

        setIsUserAdmin(isAdmin(user.uid));

        const fetchProject = async () => {
            if (!projectId) return;
            setLoading(true);
            try {
                const projectRef = doc(db, 'projects', projectId);
                const docSnap = await getDoc(projectRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProject({
                        id: docSnap.id,
                        ...data,
                        createdAt: data.createdAt?.toDate(),
                        deadline: data.deadline?.toDate(),
                    } as Project);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId, user, authLoading, router]);

    if (loading || authLoading) {
        return <Loader />;
    }

    if (!project) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1 py-12">
                    <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
                        <h1 className="font-headline text-4xl font-bold">Project Not Found</h1>
                        <p className="mt-4 text-muted-foreground">The project you are looking for does not exist or has been removed.</p>
                        <Button asChild className="mt-8">
                            <Link href="/dashboard">Back to Dashboard</Link>
                        </Button>
                    </div>
                </main>
            </div>
        );
    }
    
    // Security check: only project owner or admin can view
    if (project.userId !== user?.uid && !isUserAdmin) {
         return (
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1 py-12">
                    <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
                        <h1 className="font-headline text-4xl font-bold">Access Denied</h1>
                        <p className="mt-4 text-muted-foreground">You do not have permission to view this project.</p>
                        <Button asChild className="mt-8">
                            <Link href="/dashboard">Back to Dashboard</Link>
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto max-w-4xl px-4 md:px-6">
                    <div className="mb-8">
                        <Button variant="ghost" asChild>
                            <Link href={isUserAdmin ? "/admin/projects" : "/dashboard/projects"}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {isUserAdmin ? "Back to All Projects" : "Back to My Projects"}
                            </Link>
                        </Button>
                    </div>

                    <Card className="bg-secondary/20 border-border/50 shadow-lg">
                        <CardHeader className="border-b border-border/50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="font-headline text-3xl">{project.projectTitle}</CardTitle>
                                    <CardDescription className="pt-2">
                                        Posted {format(project.createdAt, 'PPP')}
                                    </CardDescription>
                                </div>
                                <Badge variant={project.status === 'Open' ? 'secondary' : 'default'} className="text-sm">{project.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-2">Project Description</h3>
                                    <p className="text-muted-foreground whitespace-pre-wrap">{project.projectDescription || "No detailed description provided."}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-4">Project Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-3"><DollarSign className="h-5 w-5 text-primary" /> Budget: <span className="font-bold text-foreground">${project.budget} ({project.paymentType})</span></div>
                                        <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /> Deadline: <span className="font-bold text-foreground">{format(project.deadline, 'PPP')}</span></div>
                                        <div className="flex items-center gap-3 col-span-full"><Tag className="h-5 w-5 text-primary" /> Desired Skills: <span className="font-bold text-foreground">{project.desiredSkills}</span></div>
                                        {isUserAdmin && (
                                            <div className="flex items-center gap-3 col-span-full"><User className="h-5 w-5 text-primary" /> Client ID: <span className="font-mono text-xs text-foreground">{project.userId}</span></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
