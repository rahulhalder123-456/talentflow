
'use server';

import { db, collection, getDocs, doc, getDoc, query, orderBy } from "@/lib/firebase/client";
import type { FeaturedProject } from '@/features/landing/types';

// Helper function to sanitize image URLs on the server
function getSanitizedImageUrl(url: string | undefined | null): string {
    const placeholder = 'https://placehold.co/600x400.png';
    if (!url) return placeholder;

    try {
        const validHostnames = ['storage.googleapis.com', 'placehold.co', 'imgs.search.brave.com'];
        const parsedUrl = new URL(url);
        if (validHostnames.includes(parsedUrl.hostname)) {
            return url;
        }
        return placeholder;
    } catch (error) {
        // Invalid URL format
        return placeholder;
    }
}


export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
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
                createdAt: data.createdAt?.toDate().toISOString(), // Ensure serialization
            } as FeaturedProject;
        });
    } catch (error) {
        console.error("Error fetching featured projects:", error);
        return [];
    }
}

export async function getFeaturedProjectById(projectId: string): Promise<FeaturedProject | null> {
    try {
        const projectRef = doc(db, 'featuredProjects', projectId);
        const docSnap = await getDoc(projectRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                title: data.title,
                description: data.description,
                imageUrl: getSanitizedImageUrl(data.imageUrl),
                projectType: data.projectType,
                projectUrl: data.projectUrl,
                appStoreUrl: data.appStoreUrl,
                playStoreUrl: data.playStoreUrl,
                createdAt: data.createdAt?.toDate().toISOString(),
            } as FeaturedProject;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching featured project with ID ${projectId}:`, error);
        return null;
    }
}
