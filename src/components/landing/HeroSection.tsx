"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
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
                    initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                    animate={{
                      y: "0%",
                      opacity: 1,
                      filter: "blur(0px)",
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
              We are your dedicated team of creative and technical experts,
              ready to bring your vision to life with precision and passion.
              From stunning designs to robust code, we deliver excellence on
              demand.
            </motion.p>

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
              <Button asChild variant="outline" size="lg">
                <Link href="#categories">
                  Explore Services
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}