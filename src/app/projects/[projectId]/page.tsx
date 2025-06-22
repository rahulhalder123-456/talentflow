
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Header } from '@/components/common/Header';
import { Loader } from '@/components/common/Loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, IndianRupee, Clock, User, Calendar, Briefcase, CreditCard, LoaderCircle } from 'lucide-react';
import { format } from 'date-fns';
import { isAdmin } from '@/lib/admin';
import type { Project } from '@/features/projects/types';
import { useToast } from '@/hooks/use-toast';

export default function ProjectDetailsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const projectId = params.projectId as string;
    const { toast } = useToast();

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPaying, setIsPaying] = useState(false);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push('/signin');
            return;
        }

        setIsUserAdmin(isAdmin(user.uid));

        const fetchProject = async () => {
            if (!projectId) {
                 setError("Project ID is missing.");
                 setLoading(false);
                 return;
            }
            setLoading(true);
            try {
                const projectRef = doc(db, 'projects', projectId);
                const docSnap = await getDoc(projectRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const projectData: Project = {
                        id: docSnap.id,
                        projectTitle: data.projectTitle,
                        projectDescription: data.projectDescription,
                        projectBrief: data.projectBrief,
                        budget: data.budget,
                        status: data.status,
                        createdAt: data.createdAt?.toDate(),
                        deadline: data.deadline?.toDate(),
                        paymentType: data.paymentType,
                        desiredSkills: data.desiredSkills,
                        userId: data.userId,
                    };
                    setProject(projectData);
                } else {
                    setError('Project not found.');
                }
            } catch (err) {
                console.error("Error fetching project:", err);
                setError("Failed to fetch project data. This might be a network or permissions issue.");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId, user, authLoading, router]);

    const handleRazorpayPayment = async () => {
        if (!project) return;
        setIsPaying(true);

        try {
            const response = await fetch('/api/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: project.budget })
            });

            if (!response.ok) {
                throw new Error('Failed to create Razorpay order');
            }

            const order = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Talent Flow",
                description: `Funding for project: ${project.projectTitle}`,
                order_id: order.id,
                handler: async function (response: any) {
                    const verifyRes = await fetch('/api/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            projectId: project.id,
                        })
                    });

                    const result = await verifyRes.json();

                    if (result.success) {
                        toast({
                            title: "Payment Successful!",
                            description: "The project is now 'In Progress'.",
                        });
                        setProject(prev => prev ? { ...prev, status: 'In Progress' } : null);
                    } else {
                        toast({
                            variant: 'destructive',
                            title: "Payment Verification Failed",
                            description: result.error || 'Invalid payment signature.',
                        });
                    }
                },
                prefill: {
                    name: user?.displayName || '',
                    email: user?.email || '',
                },
                theme: {
                    color: "#6666FF"
                }
            };
            
            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any){
                toast({
                    variant: 'destructive',
                    title: 'Payment Failed',
                    description: response.error.description,
                });
            });
            rzp.open();

        } catch (err) {
            console.error("Payment initiation failed:", err);
            toast({
                variant: 'destructive',
                title: "Payment Failed",
                description: 'Could not initiate payment. Please try again.'
            });
        } finally {
            setIsPaying(false);
        }
    };

    if (loading || authLoading) {
        return <Loader />;
    }
    
    // Security check: only project owner or admin can view
    if (project && project.userId !== user?.uid && !isUserAdmin) {
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
    
    if (error || !project) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1 py-12">
                    <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
                        <h1 className="font-headline text-4xl font-bold">Project Not Found</h1>
                        <p className="mt-4 text-muted-foreground">{error || "The project you are looking for does not exist or has been removed."}</p>
                        <Button asChild className="mt-8">
                            <Link href={isUserAdmin ? "/admin/projects" : "/dashboard"}>Back to Dashboard</Link>
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
                        <CardHeader className="border-b border-border/50 p-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                <div>
                                    <CardTitle className="font-headline text-3xl">{project.projectTitle}</CardTitle>
                                    <CardDescription className="pt-2">
                                        Posted on {project.createdAt ? format(project.createdAt, 'PPP') : ''}
                                    </CardDescription>
                                </div>
                                <Badge variant={project.status === 'Open' ? 'secondary' : 'default'} className="text-sm h-fit">{project.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Project Description</h3>
                                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{project.projectDescription || "No detailed description provided."}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Desired Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.desiredSkills.split(',').map(skill => (
                                            <Badge key={skill.trim()} variant="outline">{skill.trim()}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg mb-2 border-b pb-2">Project Details</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3"><IndianRupee className="h-5 w-5 text-primary" /> <span>Budget: <span className="font-bold text-foreground">Rs. {project.budget}</span></span></div>
                                    <div className="flex items-center gap-3 capitalize"><Briefcase className="h-5 w-5 text-primary" /><span>Payment: <span className="font-bold text-foreground">{project.paymentType}</span></span></div>
                                    <div className="flex items-center gap-3"><Calendar className="h-5 w-5 text-primary" /><span>Deadline: <span className="font-bold text-foreground">{project.deadline ? format(project.deadline, 'PPP') : ''}</span></span></div>
                                </div>
                                {isUserAdmin && (
                                    <>
                                        <h3 className="font-semibold text-lg mb-2 border-b pb-2 pt-4">Admin Info</h3>
                                        <div className="flex items-center gap-3 text-sm"><User className="h-5 w-5 text-primary" /> <span>Client ID: <span className="font-mono text-xs text-foreground">{project.userId}</span></span></div>
                                    </>
                                )}
                            </div>
                        </CardContent>
                        
                        {project.userId === user?.uid && (
                            <CardFooter className="p-6 border-t border-border/50 bg-background/30 flex items-center justify-between">
                                {project.status === 'Open' ? (
                                    <>
                                        <p className="text-sm text-muted-foreground">Ready to start?</p>
                                        <Button onClick={handleRazorpayPayment} disabled={isPaying} size="lg">
                                            {isPaying ? (
                                                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                            ) : (
                                                <CreditCard className="mr-2 h-5 w-5" />
                                            )}
                                            {isPaying ? 'Processing...' : 'Fund & Start Project'}
                                        </Button>
                                    </>
                                ) : (
                                    <p className="text-sm text-muted-foreground">This project is currently {project.status}.</p>
                                )}
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </main>
        </div>
    );
}
