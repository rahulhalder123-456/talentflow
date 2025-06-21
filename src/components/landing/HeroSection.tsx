
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeAnimation } from "@/components/common/CodeAnimation";

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
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Subtle grid background */}
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
          {/* Left content */}
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

            {/* Animated Heading */}
            <motion.h1
              variants={fadeInUp}
              className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance bg-gradient-to-br from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent leading-tight"
            >
              Where Great Ideas Meet Great Talent
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="max-w-xl text-lg text-muted-foreground md:text-xl"
            >
              From stunning designs to robust code, we deliver excellence on
              demand. Post your project and let's build something amazing
              together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-4 flex flex-col sm:flex-row items-center gap-4"
              variants={fadeInUp}
            >
              <Button asChild size="lg">
                <Link href="/post-project">
                  Post a Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
               <Button asChild size="lg" variant="outline">
                <Link href="#categories">Explore Services</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Code Animation */}
          <motion.div
            className="relative h-[400px] order-first md:order-last"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
           <CodeAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
