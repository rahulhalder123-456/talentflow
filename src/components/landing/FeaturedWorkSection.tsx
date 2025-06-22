
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon, Apple, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { FeaturedProject } from '@/features/landing/types';

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

interface FeaturedWorkSectionProps {
  projects: FeaturedProject[];
}

const MotionCard = motion(Card);


// A smaller card component for the grid
const ProjectCard = ({ project }: { project: FeaturedProject }) => (
    <MotionCard
        variants={fadeInUp}
        className="flex h-full flex-col overflow-hidden rounded-xl bg-secondary/50 border-white/10 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1 group"
    >
        <div className="relative overflow-hidden">
            <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover aspect-[16/10] transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="SaaS dashboard app"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <Badge variant="secondary" className="absolute top-4 left-4 capitalize">{project.projectType}</Badge>
        </div>
        
        <div className="flex flex-col flex-1 p-6">
            <CardTitle>{project.title}</CardTitle>
            <CardContent className="p-0 pt-2 flex-1">
                <p className="text-muted-foreground line-clamp-2 text-sm">{project.description}</p>
            </CardContent>
            <CardFooter className="p-0 pt-4 mt-auto">
                <div className="flex flex-wrap gap-2 w-full">
                    {project.projectUrl && (
                       <Button asChild variant="outline" size="sm">
                         <Link href={project.projectUrl} target="_blank">
                           <LinkIcon className="mr-2 h-4 w-4" /> Website
                         </Link>
                       </Button>
                    )}
                    {project.appStoreUrl && (
                       <Button asChild variant="outline" size="sm">
                         <Link href={project.appStoreUrl} target="_blank">
                           <Apple className="mr-2 h-4 w-4" /> App Store
                         </Link>
                       </Button>
                    )}
                    {project.playStoreUrl && (
                       <Button asChild variant="outline" size="sm">
                         <Link href={project.playStoreUrl} target="_blank">
                           <Play className="mr-2 h-4 w-4" /> Play Store
                         </Link>
                       </Button>
                    )}
                </div>
            </CardFooter>
        </div>
    </MotionCard>
);

export function FeaturedWorkSection({ projects }: FeaturedWorkSectionProps) {
  // Determine which layout to use. Switch to hero layout if there are 4 or more projects.
  const useHeroLayout = projects.length >= 4;

  const heroProject = useHeroLayout ? projects[0] : null;
  // If using hero layout, show the rest. Otherwise, show all projects in the grid.
  const gridProjects = useHeroLayout ? projects.slice(1, 4) : projects;

  return (
    <motion.section
      id="featured-work"
      className="py-16 md:py-24 bg-secondary/20"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center mb-12">
          <Badge variant="default" className="mb-4 shadow-lg shadow-primary/20">Our Work</Badge>
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Proudly Built by Talent Flow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Here's a glimpse into some of the innovative apps and websites we've crafted for our clients.
          </p>
        </motion.div>
        
        {projects.length > 0 ? (
          <div className="space-y-16">
            {/* Hero Project (only if there are enough projects) */}
            {heroProject && (
              <motion.div variants={fadeInUp} className="group">
                  <Card className="grid md:grid-cols-2 overflow-hidden rounded-xl bg-secondary/50 border-white/10 shadow-xl transition-all duration-300 hover:shadow-primary/20">
                      <div className="relative overflow-hidden">
                          <Image
                              src={heroProject.imageUrl}
                              alt={heroProject.title}
                              width={800}
                              height={600}
                              className="w-full h-full object-cover aspect-video md:aspect-auto transition-transform duration-500 group-hover:scale-105"
                              data-ai-hint="SaaS dashboard"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                      </div>
                      <div className="flex flex-col p-8 md:p-12">
                          <Badge variant="secondary" className="capitalize w-fit mb-4">{heroProject.projectType}</Badge>
                          <h3 className="font-headline text-3xl font-bold">{heroProject.title}</h3>
                          <p className="mt-4 text-muted-foreground flex-grow line-clamp-4">{heroProject.description}</p>
                          <div className="flex flex-wrap gap-3 mt-6">
                              {heroProject.projectUrl && (
                                 <Button asChild variant="outline">
                                   <Link href={heroProject.projectUrl} target="_blank">
                                     <LinkIcon className="mr-2 h-4 w-4" /> View Website
                                   </Link>
                                 </Button>
                              )}
                              {heroProject.appStoreUrl && (
                                 <Button asChild variant="outline">
                                   <Link href={heroProject.appStoreUrl} target="_blank">
                                     <Apple className="mr-2 h-4 w-4" /> App Store
                                   </Link>
                                 </Button>
                              )}
                              {heroProject.playStoreUrl && (
                                 <Button asChild variant="outline">
                                   <Link href={heroProject.playStoreUrl} target="_blank">
                                     <Play className="mr-2 h-4 w-4" /> Play Store
                                   </Link>
                                 </Button>
                              )}
                          </div>
                      </div>
                  </Card>
              </motion.div>
            )}

            {/* Other Projects Grid */}
            {gridProjects.length > 0 && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {gridProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
          </div>
        ) : (
          <motion.div variants={fadeInUp} className="text-center py-12 text-muted-foreground border-2 border-dashed border-border/50 rounded-lg">
            <h3 className="text-xl font-semibold">Showcase Coming Soon</h3>
            <p className="mt-2">An admin can add featured projects from the dashboard.</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
