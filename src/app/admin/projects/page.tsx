
import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AllProjectsList } from "./AllProjectsList";

export default function AdminProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Admin Dashboard
              </Link>
            </Button>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-headline text-4xl font-bold tracking-tight">All Projects</h1>
              <p className="mt-2 text-muted-foreground">A complete list of all projects on the platform.</p>
            </div>
          </div>
          
          <AllProjectsList />
        </div>
      </main>
    </div>
  );
}
