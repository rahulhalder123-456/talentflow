
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
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

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
       {/* Animated background */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"
        />
        <motion.div
          className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/10 blur-[100px]"
          animate={{
            x: [100, -100, 100],
            y: [50, -50, 50],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            variants={fadeInUp}
          >
            <Badge
              variant="secondary"
              className="text-sm shadow-lg"
            >
              Your On-Demand Creative & Technical Team
            </Badge>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-balance md:text-5xl lg:text-6xl">
              Where Great Ideas Meet Great Talent
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
              We are your dedicated team of creative and technical experts,
              ready to bring your vision to life with precision and passion.
              From stunning designs to robust code, we deliver excellence on
              demand.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg">
                <Link href="/post-project">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
