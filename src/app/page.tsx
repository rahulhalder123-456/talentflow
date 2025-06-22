
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { CategoriesSection } from '@/components/landing/CategoriesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { WhyUsSection } from '@/components/landing/WhyUsSection';
import { FeaturedWorkSection } from '@/components/landing/FeaturedWorkSection';
import { AboutUsSection } from '@/components/landing/AboutUsSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CtaSection } from '@/components/landing/CtaSection';
import { db, collection, getDocs, query, orderBy } from "@/lib/firebase/client";
import type { FeaturedProject } from '@/features/landing/types';

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
                imageUrl: data.imageUrl,
                projectType: data.projectType,
                projectUrl: data.projectUrl,
                appStoreUrl: data.appStoreUrl,
                playStoreUrl: data.playStoreUrl,
                // Timestamps are not serializable, so convert to a string
                createdAt: data.createdAt.toDate().toISOString(),
            };
        }) as FeaturedProject[];
    } catch (error) {
        console.error("Error fetching featured projects for homepage:", error);
        // Return an empty array if there's an error (e.g., Firestore not set up yet)
        return [];
    }
}


export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="flex min-h-screen flex-col bg-background overflow-hidden">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <HowItWorksSection />
        <WhyUsSection />
        <FeaturedWorkSection projects={featuredProjects} />
        <AboutUsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
