"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CodeXml,
  Palette,
  Type,
  Clapperboard,
  Megaphone,
  Music,
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

const categories = [
  { name: 'Web Development', icon: <CodeXml className="h-8 w-8 text-primary" /> },
  { name: 'Graphic Design', icon: <Palette className="h-8 w-8 text-primary" /> },
  { name: 'Writing', icon: <Type className="h-8 w-8 text-primary" /> },
  { name: 'Video & Animation', icon: <Clapperboard className="h-8 w-8 text-primary" /> },
  { name: 'Digital Marketing', icon: <Megaphone className="h-8 w-8 text-primary" /> },
  { name: 'Music & Audio', icon: <Music className="h-8 w-8 text-primary" /> },
];

export function CategoriesSection() {
  return (
    <motion.section
      id="categories"
      className="py-16 md:py-24"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div variants={fadeInUp} className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            A Full Suite of Professional Services
          </h2>
          <p className="max-w-2xl text-muted-foreground">Whatever your project needs, our versatile team has you covered.</p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-6">
          {categories.map((category) => (
            <motion.div key={category.name} variants={fadeInUp}>
              <Link
                href="#"
                className="group flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-primary/20 hover:shadow-2xl"
              >
                {category.icon}
                <h3 className="font-semibold text-foreground/90">{category.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
