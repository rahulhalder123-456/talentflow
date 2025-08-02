
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProjectById } from '@/features/landing/actions';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Link as LinkIcon, Apple, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-12">
            <Button variant="ghost" asChild>
              <Link href="/showcase">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Showcase
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <Badge variant="secondary" className="mb-2 capitalize">{project.projectType}</Badge>
              <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </div>

            <div className="sticky top-24 space-y-8">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl object-cover aspect-video shadow-2xl shadow-primary/10"
              />
              <Card className="bg-secondary/40 border border-white/10 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-lg">Project Links</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                    {project.projectUrl && (
                      <Button asChild className="flex-1 min-w-[150px]">
                        <Link href={project.projectUrl} target="_blank">
                          <LinkIcon className="mr-2 h-4 w-4" /> Visit Website
                        </Link>
                      </Button>
                    )}
                    {project.appStoreUrl && (
                      <Button asChild className="flex-1 min-w-[150px]">
                        <Link href={project.appStoreUrl} target="_blank">
                          <Apple className="mr-2 h-4 w-4" /> App Store
                        </Link>
                      </Button>
                    )}
                    {project.playStoreUrl && (
                      <Button asChild className="flex-1 min-w-[150px]">
                        <Link href={project.playStoreUrl} target="_blank">
                          <Play className="mr-2 h-4 w-4" /> Play Store
                        </Link>
                      </Button>
                    )}
                    {!project.projectUrl && !project.appStoreUrl && !project.playStoreUrl && (
                        <p className="text-sm text-muted-foreground">No external links have been provided for this project.</p>
                    )}
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
