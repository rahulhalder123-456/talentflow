import { getRecentReviews } from '@/features/reviews/actions';
import { TestimonialsList } from './TestimonialsList';

export async function TestimonialsSection() {
  const reviews = await getRecentReviews();

  return (
    <section
      id="reviews"
      className="py-16 md:py-24 bg-secondary/20"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Loved by Teams Worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </div>
        <TestimonialsList reviews={reviews} />
      </div>
    </section>
  )
}
