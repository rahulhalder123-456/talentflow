"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video } from "lucide-react";
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
    <section className="py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          className="grid items-center gap-12 md:grid-cols-2"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col items-center text-center md:items-start md:text-left gap-6"
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
              <Button asChild size="lg" variant="outline">
                <Link href="#">
                  <Video className="mr-2 h-5 w-5" /> Watch Demo
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="relative h-[300px] w-full max-w-lg mx-auto md:h-[400px] rounded-xl overflow-hidden shadow-2xl shadow-primary/20"
            variants={fadeInUp}
          >
             <video 
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://cdn.dribbble.com/uploads/48227/original/b9f84b1227315a60064f7833077a0641.mp4?1699632832" 
                autoPlay 
                loop 
                muted 
                playsInline
            >
            </video>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
