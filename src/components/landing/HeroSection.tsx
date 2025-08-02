
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
    <section className="relative py-20 md:py-32 overflow-hidden min-h-[700px] flex items-center justify-center">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-grid-pattern opacity-30" />
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
         {/* Light-colored 3D-style blobs */}
         <motion.div
            className="absolute -top-1/4 left-1/4 h-[500px] w-[500px] lg:h-[700px] lg:w-[700px] rounded-full bg-pink-500/10 blur-[120px]"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
         />
         <motion.div
             className="absolute -bottom-1/4 right-1/4 h-[400px] w-[600px] lg:h-[600px] lg:w-[800px] rounded-full bg-blue-500/10 blur-[120px]"
             animate={{ 
               y: [0, 20, 0],
               x: [0, -10, 0],
               rotate: [0, -5, 0],
             }}
             transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
         />
          <motion.div
             className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[100px]"
             animate={{ 
               scale: [1, 1.1, 1]
             }}
             transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
         />
      </div>
      

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="secondary"
                className="text-sm shadow-lg py-1 px-4"
              >
                Your On-Demand Creative & Technical Team
              </Badge>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="font-headline text-5xl font-extrabold tracking-tight text-balance md:text-6xl lg:text-7xl"
            >
              Where Great Ideas Meet Great Talent
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="max-w-3xl text-lg text-muted-foreground md:text-xl"
            >
              Stop searching. Start building. We are your dedicated team of creative and technical experts, ready to bring your vision to life with precision and passion.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg" className="text-base lg:text-lg px-8 py-6 lg:px-10 lg:py-8">
                <Link href="/post-project">
                  Launch Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
