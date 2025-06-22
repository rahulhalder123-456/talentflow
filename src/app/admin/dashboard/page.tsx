
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, ArrowLeft, MessageSquare, TrendingUp, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-8">
                <Button variant="ghost" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Client Dashboard
                    </Link>
                </Button>
            </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage all projects and users on the platform.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-secondary/30 border-border/50 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">All Projects</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground pt-4">
                  View and manage all projects posted by users.
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link href="/admin/projects">View All Projects</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30 border-border/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Manage Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground pt-4">
                        View and manage all registered users on the platform.
                    </p>
                    <Button variant="outline" size="sm" className="mt-4" asChild>
                        <Link href="/admin/users">View Users</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card className="bg-secondary/30 border-border/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Manage Featured Work</CardTitle>
                    <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground pt-4">
                        Add or remove projects from the homepage showcase.
                    </p>
                    <Button variant="outline" size="sm" className="mt-4" asChild>
                        <Link href="/admin/featured-work">Manage Showcase</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card className="bg-secondary/30 border-border/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Client Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground pt-4">
                        View and respond to all client support chats.
                    </p>
                    <Button variant="outline" size="sm" className="mt-4" asChild>
                        <Link href="/admin/messages">View Messages</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card className="bg-secondary/30 border-accent/30 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Profit Optimizer</CardTitle>
                    <TrendingUp className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground pt-4">
                        Use AI to analyze projects and identify high-value opportunities.
                    </p>
                    <Button variant="outline" size="sm" className="mt-4" asChild>
                        <Link href="/admin/profit-optimizer">Launch Tool</Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
  );
}
