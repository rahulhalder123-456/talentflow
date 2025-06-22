
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, AppWindow, Apple, Play } from 'lucide-react';
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

export function FeaturedWorkSection({ projects }: FeaturedWorkSectionProps) {
  return (
    <motion.section
      id="featured-work"
      className="py-16 md:py-24"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center mb-12">
          <Badge variant="secondary" className="mb-4">Our Work</Badge>
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Proudly Built by Talent Flow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Here's a glimpse into some of the innovative apps and websites we've crafted for our clients.
          </p>
        </motion.div>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <MotionCard
                key={project.id}
                variants={fadeInUp}
                className="flex h-full flex-col overflow-hidden bg-secondary/30 border-white/10 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2"
              >
                <Image
                  src={project.imageUrl || 'https://placehold.co/600x400.png'}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover aspect-[16/10]"
                  data-ai-hint="SaaS dashboard"
                />
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-wrap gap-2 w-full">
                        {project.projectUrl && (
                           <Button asChild variant="outline" className="flex-1">
                             <Link href={project.projectUrl} target="_blank">
                               <AppWindow className="mr-2 h-4 w-4" /> Visit Website
                             </Link>
                           </Button>
                        )}
                        {project.appStoreUrl && (
                           <Button asChild variant="outline" className="flex-1">
                             <Link href={project.appStoreUrl} target="_blank">
                               <Apple className="mr-2 h-4 w-4" /> App Store
                             </Link>
                           </Button>
                        )}
                        {project.playStoreUrl && (
                           <Button asChild variant="outline" className="flex-1">
                             <Link href={project.playStoreUrl} target="_blank">
                               <Play className="mr-2 h-4 w-4" /> Play Store
                             </Link>
                           </Button>
                        )}
                    </div>
                </CardFooter>
              </MotionCard>
            ))}
          </div>
        ) : (
          <motion.div variants={fadeInUp} className="text-center py-12 text-muted-foreground">
            <p>Our featured work will be displayed here soon. Check back later!</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
