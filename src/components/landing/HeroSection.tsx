"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
    <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden text-center">
      <CodeAnimation />
      <div className="relative z-10 container mx-auto max-w-4xl px-4 md:px-6">
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

          <motion.h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance bg-gradient-to-br from-white via-gray-200 to-zinc-300 bg-clip-text text-transparent leading-tight">
            {headlineWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden px-[2px] py-1">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.25, 1, 0.5, 1],
                      delay: i * 0.1,
                    },
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="max-w-2xl text-lg text-muted-foreground/80 md:text-xl tracking-normal leading-relaxed"
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
            We are your dedicated team of creative and technical experts,
            ready to bring your vision to life with precision and passion.
            From stunning designs to robust code, we deliver excellence on
            demand.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col sm:flex-row items-center gap-4"
            variants={fadeInUp}
          >
            <Link href="/post-project" className="group relative inline-block w-full sm:w-auto">
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-primary via-primary/70 to-accent transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-rotate-1 shadow-[0_10px_30px_hsl(var(--primary)/0.3)]">
                <span className="absolute -top-3 -right-3 text-2xl animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  ✨
                </span>
                <div className="flex items-center gap-3 px-8 py-4 bg-background/80 backdrop-blur-xl rounded-2xl text-base font-semibold text-white transition-all duration-300 shadow-inner hover:bg-background/60">
                  <span className="whitespace-nowrap tracking-wide">
                    Start Your Project
                  </span>
                  <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
