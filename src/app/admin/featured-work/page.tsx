
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FeaturedWorkForm } from "./FeaturedWorkForm";
import { FeaturedProjectsList } from "./FeaturedProjectsList";
import { getFeaturedProjects } from "@/features/landing/actions";

export default async function AdminFeaturedWorkPage() {
    const projects = await getFeaturedProjects();

    return (
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
                        <h1 className="font-headline text-4xl font-bold tracking-tight">Manage Featured Work</h1>
                        <p className="mt-2 text-muted-foreground">Add, view, or remove projects from the homepage showcase.</p>
                    </div>
                </div>

                <div className="space-y-12">
                   <FeaturedWorkForm />
                   <FeaturedProjectsList projects={projects} />
                </div>
            </div>
        </main>
    );
}
