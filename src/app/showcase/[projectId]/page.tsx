
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProjectById } from '@/features/landing/actions';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Link as LinkIcon, Apple, Play } from 'lucide-react';

type ShowcaseDetailProps = {
  params: { projectId: string };
};

export default async function ShowcaseDetailPage({ params }: ShowcaseDetailProps) {
  const project = await getFeaturedProjectById(params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/showcase">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Showcase
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <Badge variant="secondary" className="mb-4 capitalize">{project.projectType}</Badge>
              <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
              <p className="mt-6 text-lg text-muted-foreground">{project.description}</p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                {project.projectUrl && (
                  <Button asChild>
                    <Link href={project.projectUrl} target="_blank">
                      <LinkIcon className="mr-2 h-4 w-4" /> Visit Website
                    </Link>
                  </Button>
                )}
                {project.appStoreUrl && (
                  <Button asChild>
                    <Link href={project.appStoreUrl} target="_blank">
                      <Apple className="mr-2 h-4 w-4" /> App Store
                    </Link>
                  </Button>
                )}
                {project.playStoreUrl && (
                  <Button asChild>
                    <Link href={project.playStoreUrl} target="_blank">
                      <Play className="mr-2 h-4 w-4" /> Play Store
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-auto rounded-xl object-cover aspect-video shadow-2xl shadow-primary/10"
              />
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
