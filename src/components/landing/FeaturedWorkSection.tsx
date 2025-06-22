"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

const featuredProjects = [
  {
    title: 'QuantumLeap CRM',
    description: 'A next-generation CRM platform designed for startups, focusing on simplicity and powerful analytics.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'SaaS dashboard',
    link: '#',
  },
  {
    title: 'Stellar E-commerce',
    description: 'A headless e-commerce solution built for performance and scalability, providing a seamless shopping experience.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'ecommerce website',
    link: '#',
  },
  {
    title: 'Nova Analytics',
    description: 'A real-time data analytics dashboard that helps businesses make smarter decisions with interactive visualizations.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'analytics dashboard',
    link: '#',
  },
];

const MotionCard = motion(Card);

export function FeaturedWorkSection() {
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <MotionCard
              key={project.title}
              variants={fadeInUp}
              className="flex h-full flex-col overflow-hidden bg-secondary/30 border-white/10 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint={project.aiHint}
              />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={project.link}>
                    View Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </MotionCard>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
