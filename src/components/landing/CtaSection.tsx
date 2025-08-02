
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <motion.section
      className="py-16 md:py-24"
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      viewport={{ once: true, amount: 0.3 }}
      transition={{duration: 0.8}}
    >
      <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
        <div className="rounded-xl bg-gradient-to-br from-primary/80 to-accent/80 p-8 md:p-12 shadow-2xl shadow-primary/20">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Ready to bring your ideas to life?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Let's build something amazing together. Post your project today and receive a detailed proposal from our expert team.
          </p>
          <div className="mt-8">
            <Link href="/post-project">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90 text-lg">
                Post a Project <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
