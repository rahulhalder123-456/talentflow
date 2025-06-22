
"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Clock,
  ShieldCheck,
  IndianRupee,
} from 'lucide-react';

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

const whyUsBenefits = [
  {
    title: 'Vetted Professionals',
    description: 'Our team consists of industry experts who have been rigorously vetted for skill and professionalism.',
    icon: <Users className="h-7 w-7" />,
  },
  {
    title: 'Guaranteed Deadlines',
    description: 'We respect your time. Your project will be delivered on schedule, without compromising on quality.',
    icon: <Clock className="h-7 w-7" />,
  },
  {
    title: 'Transparent Pricing',
    description: 'No surprises. We provide clear, upfront pricing to ensure you know exactly what to expect.',
    icon: <IndianRupee className="h-7 w-7" />,
  },
    {
    title: 'Unmatched Quality',
    description: "We are committed to excellence and stand by the quality of our work, ensuring your satisfaction.",
    icon: <ShieldCheck className="h-7 w-7" />,
  },
];

const MotionCard = motion(Card);

export function WhyUsSection() {
  return (
    <motion.section
      id="why-us"
      className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                The Talent Flow Advantage
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                We are a curated team of experts dedicated to your success.
            </p>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUsBenefits.map((benefit) => (
              <MotionCard key={benefit.title} variants={fadeInUp} className="bg-secondary/30 border-white/10 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 h-full backdrop-blur-sm">
                <CardHeader className="items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">{benefit.icon}</div>
                    <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        {benefit.description}
                    </p>
                </CardContent>
            </MotionCard>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
