
"use client";

import { motion } from 'framer-motion';

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

export function HowItWorksSection() {
  return (
    <motion.section
      id="how-it-works"
      className="py-16 md:py-24"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            From Idea to Impact in Three Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our streamlined process ensures a smooth and efficient collaboration.
          </p>
        </motion.div>
        <div className="relative mt-12 grid gap-12 md:grid-cols-3">
            <div className="absolute left-1/2 top-5 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent md:block hidden"></div>
            
          {['Post a Project', 'Fund & Kick-off', 'Review & Complete'].map((step, index) => (
              <motion.div key={step} variants={fadeInUp} className="relative flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background text-primary font-bold shadow-[0_0_20px_hsl(var(--primary)/0.5)] z-10">{index + 1}</div>
                <h3 className="font-headline mt-6 text-2xl">{step}</h3>
                <p className="mt-2 text-muted-foreground">
                  {index === 0 && 'Submit your project details through our easy-to-use form. Our AI assistant helps you create a perfect brief.'}
                  {index === 1 && 'Secure your project by funding a 20% deposit. Once funded, our team starts work immediately.'}
                  {index === 2 && 'Pay the remaining 80% balance upon completion. We guarantee you\'ll be 100% satisfied with the final result.'}
                </p>
                {index < 2 && <div className="absolute left-1/2 top-6 h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:hidden"></div>}
              </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
