
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { CategoriesSection } from '@/components/landing/CategoriesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { WhyUsSection } from '@/components/landing/WhyUsSection';
import { FeaturedWorkSection } from '@/components/landing/FeaturedWorkSection';
import { AboutUsSection } from '@/components/landing/AboutUsSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { getFeaturedProjects } from '@/features/landing/actions';
import type { FeaturedProject } from '@/features/landing/types';


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
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
