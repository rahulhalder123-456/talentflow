
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
    <section className="relative py-20 md:py-32 overflow-hidden min-h-[600px] flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-20"
          src="https://cdn.dribbble.com/users/1068771/screenshots/5416733/media/4d35b99118534f479133a85473769963.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
      </div>
      

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-20">
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
