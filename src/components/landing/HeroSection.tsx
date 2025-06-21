"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
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

const headlineStagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const headlineWord = {
  initial: { y: '120%' },
  animate: { y: '0%', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroSection() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0 bg-grid-pattern"
          style={{ maskImage: 'linear-gradient(to bottom, white 0%, white 75%, transparent 100%)' }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Content */}
          <motion.div
            className="flex flex-col items-center gap-6 text-center md:items-start md:text-left"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="text-sm shadow-lg backdrop-blur-sm">
                Your On-Demand Creative & Technical Team
              </Badge>
            </motion.div>

            {/* Heading */}
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

            {/* Subheading */}
            <motion.p
              className="max-w-3xl text-lg text-muted-foreground md:text-xl"
              variants={fadeInUp}
            >
              We are your dedicated team of creative and technical experts, ready to bring your
              vision to life with precision and passion. From stunning designs to robust code,
              we deliver excellence on demand.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-4 flex flex-col sm:flex-row items-center gap-4"
              variants={fadeInUp}
            >
              {/* Sexy & Classy CTA */}
              <Link href="/post-project" className="group relative inline-block w-full sm:w-auto">
                <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-[#8e2de2] via-[#4a00e0] to-[#8e2de2] transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-rotate-1 shadow-[0_10px_30px_rgba(138,43,226,0.3)]">
                  {/* ✨ Sparkle */}
                  <span className="absolute -top-3 -right-3 text-2xl animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    ✨
                  </span>
                  {/* Inner CTA Card */}
                  <div className="flex items-center gap-3 px-7 py-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-xl rounded-2xl text-base font-semibold text-white transition-all duration-300 shadow-inner hover:bg-[rgba(255,255,255,0.05)]">
                    <span className="text-xl">🎉</span>
                    <span className="whitespace-nowrap tracking-wide">Ready to build magic?</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

              {/* Explore Services Button */}
              <Link href="#categories">
                <button
                  className="text-base bg-background/50 border border-primary/50 hover:bg-primary/10 hover:text-primary-foreground backdrop-blur-sm text-white font-medium rounded-xl px-6 py-3 transition-all duration-300"
                >
                  Explore Services
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Video Section */}
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
            {/* Optional: dark overlay (if needed more contrast)
            <div className="absolute inset-0 bg-black/20 rounded-lg pointer-events-none" /> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
