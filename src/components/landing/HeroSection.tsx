"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
      delayChildren: 0.3,
    },
  },
};

export function HeroSection() {
  const headlineWords = "Where Great Ideas Meet Great Talent".split(" ");

  return (
    <section className="relative overflow-hidden py-24 text-center md:py-32 lg:py-40">
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0 bg-grid-pattern"
          style={{
            maskImage:
              "linear-gradient(to bottom, white 0%, white 75%, transparent 100%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Badge
              variant="secondary"
              className="text-sm shadow-lg backdrop-blur-sm"
            >
              Your On-Demand Creative & Technical Team
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent"
          >
            {"Where Great Ideas Meet Great Talent"}
          </motion.h1>

          <motion.p
            className="max-w-2xl text-lg text-muted-foreground md:text-xl"
            variants={fadeInUp}
          >
            From stunning designs to robust code, we deliver excellence on
            demand. Post your project and let's build something amazing
            together.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button asChild size="lg">
              <Link href="/post-project">
                Post a Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
