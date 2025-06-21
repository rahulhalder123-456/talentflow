
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Header } from "@/components/common/Header";
import { Loader } from '@/components/common/Loader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MessageSquare, User, PlusCircle, Shield } from 'lucide-react';
import { isAdmin } from '@/lib/admin';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
    if (user) {
      setIsUserAdmin(isAdmin(user.uid));
    }
  }, [user, loading, router]);

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
                <Card className="bg-secondary/30 border-border/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Projects</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3 Active</div>
                        <p className="text-xs text-muted-foreground">
                            View and manage your ongoing and completed projects.
                        </p>
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/dashboard/projects">View Projects</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/30 border-border/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Messages</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2 Unread</div>
                         <p className="text-xs text-muted-foreground">
                            Communicate with freelancers and our support team.
                        </p>
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/dashboard/messages">View Messages</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="bg-secondary/30 border-border/50 shadow-lg">
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
            </div>

            {isUserAdmin && (
              <div className="mt-12">
                <h2 className="font-headline text-2xl font-bold tracking-tight mb-4">Admin Area</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-secondary/30 border-accent/30 shadow-lg">
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
