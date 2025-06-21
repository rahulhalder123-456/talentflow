"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

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

const testimonials = [
  {
    quote:
      "Talent Flow delivered a stunning website that exceeded our expectations. Their team is professional, creative, and incredibly efficient. We couldn't be happier with the result.",
    name: 'Sarah Johnson',
    title: 'CEO, Innovate Inc.',
    avatar: 'SJ',
    rating: 5,
  },
  {
    quote:
      'The marketing campaign they crafted for us was a game-changer. We saw a significant increase in engagement and leads. Highly recommend their services!',
    name: 'Michael Chen',
    title: 'Marketing Director, Tech Solutions',
    avatar: 'MC',
    rating: 5,
  },
  {
    quote:
      'From concept to final product, the process was seamless. Their communication is top-notch, and they delivered on time and on budget. A truly reliable partner.',
    name: 'Jessica Williams',
    title: 'Founder, Creative Co.',
    avatar: 'JW',
    rating: 5,
  },
];

const MotionCard = motion(Card);

export function TestimonialsSection() {
  return (
    <motion.section
      id="reviews"
      className="py-16 md:py-24 bg-secondary/20"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Loved by Teams Worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <MotionCard key={testimonial.name} variants={fadeInUp} className="flex h-full flex-col bg-secondary/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-foreground/90">"{testimonial.quote}"</p>
              </CardContent>
                <div className="p-6 pt-0 mt-4 flex items-center gap-4 border-t border-white/10">
                  <Avatar>
                    <AvatarImage src={`https://placehold.co/40x40.png`} alt={testimonial.name} data-ai-hint="person portrait"/>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
            </MotionCard>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
