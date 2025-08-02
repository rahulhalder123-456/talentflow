
"use client";

import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

const socials = [
  { name: 'Twitter', icon: <Twitter className="h-6 w-6" />, href: '#' },
  { name: 'LinkedIn', icon: <Linkedin className="h-6 w-6" />, href: '#' },
  { name: 'Instagram', icon: <Instagram className="h-6 w-6" />, href: '#' },
  { name: 'GitHub', icon: <Github className="h-6 w-6" />, href: '#' },
];

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SocialProofSection() {
  return (
    <section className="py-12 bg-background relative -mt-20 z-10">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.p variants={fadeIn} className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Follow us on social media
          </motion.p>
          <motion.div 
            variants={fadeIn}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
          >
            {socials.map((social) => (
              <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
