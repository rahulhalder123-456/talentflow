
"use client";

import { motion } from 'framer-motion';

const logos = [
  { name: 'Quantum', src: '/images/logos/quantum.svg' },
  { name: 'Echo', src: '/images/logos/echo.svg' },
  { name: 'Celestial', src: '/images/logos/celestial.svg' },
  { name: 'Pulse', src: '/images/logos/pulse.svg' },
  { name: 'Apex', src: '/images/logos/apex.svg' },
];

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
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
            Trusted by the world's most innovative companies
          </motion.p>
          <motion.div 
            variants={fadeIn}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
          >
            {logos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={`${logo.name} logo`}
                className="h-8 w-auto text-muted-foreground fill-current"
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
