"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export function AboutUsSection() {
  return (
    <section id="about-us" className="py-16 md:py-24 overflow-hidden">
      <motion.div
        className="container mx-auto max-w-7xl px-4 md:px-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            variants={{
              initial: { opacity: 0, x: -100 },
              animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="space-y-6 text-center md:text-left"
          >
            <Badge variant="secondary">Our Mission</Badge>
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">A Passionate Team of Creators</h2>
            <p className="text-lg text-muted-foreground">
              We are Talent Flow, a close-knit collective of designers, developers, and strategists who are passionate about building exceptional digital experiences. We believe in the power of collaboration and bring a wealth of expertise to every project, ensuring we not only meet but exceed your expectations.
            </p>
              <ul className="space-y-3 inline-block text-left">
                <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-5 w-5 text-primary"/> Client-Centric Approach</li>
                <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-5 w-5 text-primary"/> Innovative Solutions</li>
                <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-5 w-5 text-primary"/> Commitment to Excellence</li>
            </ul>
            <div>
                <Button asChild size="lg">
                  <Link href="/post-project">Start Your Project</Link>
                </Button>
            </div>
          </motion.div>
          <motion.div
            variants={{
              initial: { opacity: 0, x: 100 },
              animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            <Image
              src="/images/team.png"
              alt="Talent Flow Team"
              width={600}
              height={600}
              className="rounded-lg shadow-2xl shadow-primary/10 mx-auto md:mx-0"
              data-ai-hint="team photo"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}