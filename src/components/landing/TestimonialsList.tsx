"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import type { Review } from '@/features/reviews/types';

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

const MotionCard = motion(Card);

interface TestimonialsListProps {
    reviews: Review[];
}

export function TestimonialsList({ reviews }: TestimonialsListProps) {

  const staticTestimonials = [
      {
        comment:
          "Talent Flow delivered a stunning website that exceeded our expectations. Their team is professional, creative, and incredibly efficient. We couldn't be happier with the result.",
        userName: 'Sarah Johnson',
        rating: 5,
      },
      {
        comment:
          'The marketing campaign they crafted for us was a game-changer. We saw a significant increase in engagement and leads. Highly recommend their services!',
        userName: 'Michael Chen',
        rating: 5,
      },
      {
        comment:
          'From concept to final product, the process was seamless. Their communication is top-notch, and they delivered on time and on budget. A truly reliable partner.',
        userName: 'Jessica Williams',
        rating: 5,
      },
    ];

    const displayTestimonials = reviews.length > 0 ? reviews : staticTestimonials;


    return (
        <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
        >
          {displayTestimonials.map((testimonial, index) => (
            <MotionCard key={index} variants={fadeInUp} className="flex h-full flex-col bg-secondary/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-foreground/90">"{testimonial.comment}"</p>
              </CardContent>
                <div className="p-6 pt-0 mt-4 flex items-center gap-4 border-t border-white/10">
                  <Avatar>
                    <AvatarImage src={`https://placehold.co/40x40.png`} alt={testimonial.userName} data-ai-hint="person portrait"/>
                    <AvatarFallback>{testimonial.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-semibold">{testimonial.userName}</p>
                  </div>
                </div>
            </MotionCard>
          ))}
        </motion.div>
    )
}
