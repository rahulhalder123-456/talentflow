
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Header } from "@/components/common/Header";
import { Loader } from '@/components/common/Loader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MessageSquare, User, PlusCircle, Shield, Sparkles, Star } from 'lucide-react';
import { isAdmin } from '@/lib/admin';
import { db, collection, query, where, onSnapshot } from '@/lib/firebase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [projectCount, setProjectCount] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
      return;
    }

    if (user) {
      isAdmin(user.uid).then(setIsUserAdmin);

      const q = query(collection(db, "projects"), where("userId", "==", user.uid));
      
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          setProjectCount(querySnapshot.size);
        }, 
        (error) => {
          console.error("Error fetching project count in real-time:", error);
          toast({
            variant: "destructive",
            title: "Could Not Load Projects",
            description: "A permissions error occurred. Please ensure your Firestore security rules are up-to-date in the Firebase Console.",
          });
          setProjectCount(0);
        }
      );

      // Unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [user, loading, router, toast]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border/40 bg-secondary/20 py-8 shadow-sm">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                        Client Dashboard
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Welcome back! Manage your projects and account here.
                    </p>
                </div>
                <Button asChild size="lg">
                    <Link href="/post-project">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Post a New Project
                    </Link>
                </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl py-12 px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-secondary/30 border-border/50 shadow-lg transition-all hover:shadow-primary/20 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Projects</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {projectCount === null ? (
                            <Skeleton className="h-8 w-24 mb-2" />
                        ) : (
                            <div className="text-2xl font-bold">{projectCount} Active</div>
                        )}
                        <p className="text-xs text-muted-foreground">
                            View and manage your ongoing and completed projects.
                        </p>
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/dashboard/projects">View Projects</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/30 border-border/50 shadow-lg transition-all hover:shadow-primary/20 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Messages</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Inbox</div>
                         <p className="text-xs text-muted-foreground">
                            Chat with our team about your projects.
                        </p>
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/dashboard/messages">View Messages</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="bg-secondary/30 border-border/50 shadow-lg transition-all hover:shadow-primary/20 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Account Settings</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Profile</div>
                         <p className="text-xs text-muted-foreground">
                            Update your personal information and payment methods.
                        </p>
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                           <Link href="/dashboard/account">Manage Account</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/30 border-border/50 shadow-lg transition-all hover:shadow-primary/20 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI Assistant</CardTitle>
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Chatbot</div>
                        <p className="text-xs text-muted-foreground">
                            Get help and answers from our AI assistant.
                        </p>
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/chatbot">Start Chat</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/30 border-border/50 shadow-lg transition-all hover:shadow-primary/20 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Reviews</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Feedback</div>
                        <p className="text-xs text-muted-foreground">
                            Leave feedback on your completed projects.
                        </p>
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/dashboard/reviews">Leave a Review</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {isUserAdmin && (
              <div className="mt-12">
                <h2 className="font-headline text-2xl font-bold tracking-tight mb-4">Admin Area</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-secondary/30 border-accent/30 shadow-lg transition-all hover:shadow-primary/20 hover:-translate-y-1">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Admin Panel</CardTitle>
                          <Shield className="h-4 w-4 text-accent" />
                      </CardHeader>
                      <CardContent>
                           <div className="text-2xl font-bold">Manage</div>
                           <p className="text-xs text-muted-foreground">
                              Access the admin dashboard to manage all projects.
                          </p>
                          <Button variant="outline" size="sm" className="mt-4" asChild>
                             <Link href="/admin/dashboard">Go to Admin</Link>
                          </Button>
                      </CardContent>
                  </Card>
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}
