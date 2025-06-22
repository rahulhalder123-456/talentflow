
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { getFeaturedProjects } from '@/features/landing/actions';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export default async function ShowcasePage() {
  const projects = await getFeaturedProjects();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Our Showcase
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore a collection of innovative apps and websites we've crafted for our clients.
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link href={`/showcase/${project.id}`} key={project.id}>
                  <Card className="group flex h-full flex-col overflow-hidden rounded-xl bg-secondary/50 border-white/10 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover aspect-[16/10] transition-transform duration-500 group-hover:scale-105"
                      />
                       <Badge variant="secondary" className="absolute top-4 left-4 capitalize">{project.projectType}</Badge>
                    </div>
                    <CardContent className="flex flex-col flex-1 p-6">
                      <CardTitle className="flex-grow">{project.title}</CardTitle>
                      <p className="mt-4 text-sm text-primary group-hover:underline flex items-center">
                        View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border/50 rounded-lg">
              <h3 className="text-xl font-semibold">Showcase Coming Soon</h3>
              <p className="mt-2">An admin can add featured projects from the dashboard.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
