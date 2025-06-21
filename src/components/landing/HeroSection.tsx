"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const headlineStagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const headlineWord = {
  initial: { y: "100%" },
  animate: {
    y: "0%",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0 bg-grid-pattern"
          style={{
            maskImage:
              "linear-gradient(to bottom, white 0%, white 75%, transparent 100%)",
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            className="flex flex-col items-center gap-6 text-center md:items-start md:text-left"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <Badge
                variant="secondary"
                className="text-sm shadow-lg backdrop-blur-sm"
              >
                Your On-Demand Creative & Technical Team
              </Badge>
            </motion.div>

            <motion.h1
              className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent"
              variants={headlineStagger}
            >
              {"Where Great Ideas Meet Great Talent".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden py-1">
                  <motion.span className="inline-block" variants={headlineWord}>
                    {word}&nbsp;
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="max-w-3xl text-lg text-muted-foreground/80 md:text-xl tracking-normal leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.6,
                },
              }}
            >
              We are your dedicated team of creative and technical experts, ready to bring your vision to life
              with precision and passion. From stunning designs to robust code, we deliver excellence on
              demand.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-4 flex flex-col sm:flex-row items-center gap-4"
              variants={fadeInUp}
            >
              <Button asChild size="lg" className="group text-base shadow-lg shadow-primary/20">
                <Link href="/post-project">
                  Post a Project <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base bg-background/50 border-primary/50 hover:bg-primary/10 hover:text-primary-foreground backdrop-blur-sm"
              >
                <Link href="#categories">Explore Services</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative order-first md:order-last"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.video
              src="/videos/1anime.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-lg shadow-2xl shadow-primary/20 w-full h-auto brightness-[0.7]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />


          </motion.div>
        </div>
      </div>
    </section>
  );
}
