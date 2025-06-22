
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FeaturedWorkForm } from "./FeaturedWorkForm";
import { FeaturedProjectsList } from "./FeaturedProjectsList";
import { db, collection, getDocs, query, orderBy } from "@/lib/firebase/client";
import type { FeaturedProject } from "@/features/landing/types";


// Server-side image URL sanitizer
const getSanitizedImageUrl = (url: string | undefined) => {
    const validStarts = ['https://placehold.co', 'https://storage.googleapis.com'];
    if (url && validStarts.some(start => url.startsWith(start))) {
        return url;
    }
    // Return a placeholder for any invalid or missing URL
    return 'https://placehold.co/600x400.png';
};


async function getFeaturedProjects(): Promise<FeaturedProject[]> {
    try {
        const projectsRef = collection(db, "featuredProjects");
        const q = query(projectsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                description: data.description,
                imageUrl: getSanitizedImageUrl(data.imageUrl),
                projectType: data.projectType,
                projectUrl: data.projectUrl,
                appStoreUrl: data.appStoreUrl,
                playStoreUrl: data.playStoreUrl,
                // Timestamps are not serializable, so convert to a string
                createdAt: data.createdAt.toDate().toISOString(),
            };
        }) as FeaturedProject[];

    } catch (error) {
        console.error("Error fetching featured projects:", error);
        // In a real app, you might want more robust error handling.
        // For now, we'll return an empty array on failure.
        return [];
    }
}

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
