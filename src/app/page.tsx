import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CodeXml,
  Palette,
  Type,
  Clapperboard,
  Megaphone,
  Music,
  Users,
  Clock,
  ShieldCheck,
  DollarSign,
  Star,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const categories = [
  { name: 'Web Development', icon: <CodeXml className="h-8 w-8 text-primary" /> },
  { name: 'Graphic Design', icon: <Palette className="h-8 w-8 text-primary" /> },
  { name: 'Writing', icon: <Type className="h-8 w-8 text-primary" /> },
  { name: 'Video & Animation', icon: <Clapperboard className="h-8 w-8 text-primary" /> },
  { name: 'Digital Marketing', icon: <Megaphone className="h-8 w-8 text-primary" /> },
  { name: 'Music & Audio', icon: <Music className="h-8 w-8 text-primary" /> },
];

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
    icon: <DollarSign className="h-7 w-7" />,
  },
    {
    title: 'Unmatched Quality',
    description: "We are committed to excellence and stand by the quality of our work, ensuring your satisfaction.",
    icon: <ShieldCheck className="h-7 w-7" />,
  },
]

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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative py-24 md:py-32 lg:py-40">
          <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
            <div className="flex flex-col items-center gap-6 opacity-0 animate-fade-in-up">
              <Badge variant="secondary" className="text-sm">Your On-Demand Creative & Technical Team</Badge>
              <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Exceptional Talent, One Team
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
                Stop searching. Start building. Partner with our dedicated team of vetted professionals to bring your vision to life, delivering quality on time, every time.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
                <Button asChild size="lg" className="text-base">
                  <Link href="/post-project">
                    Post a Project <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base border-primary/50 hover:bg-primary/10 hover:text-primary-foreground">
                  <Link href="#categories">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center text-center gap-4 mb-12 opacity-0 animate-fade-in-up" style={{animationDelay: '200ms'}}>
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                A Full Suite of Professional Services
              </h2>
              <p className="max-w-2xl text-muted-foreground">Whatever your project needs, our versatile team has you covered.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-6 opacity-0 animate-fade-in-up" style={{animationDelay: '400ms'}}>
              {categories.map((category) => (
                <Link
                  href="#"
                  key={category.name}
                  className="group flex flex-col items-center gap-4 rounded-lg border bg-secondary/30 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-secondary/70 hover:shadow-primary/20 hover:shadow-lg"
                >
                  {category.icon}
                  <h3 className="font-semibold text-foreground/90">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12 opacity-0 animate-fade-in-up" style={{animationDelay: '200ms'}}>
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                From Idea to Impact in Three Steps
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our streamlined process ensures a smooth and efficient collaboration.
              </p>
            </div>
            <div className="relative mt-12 grid gap-8 md:grid-cols-3 opacity-0 animate-fade-in-up" style={{animationDelay: '400ms'}}>
               <div className="absolute left-1/2 top-5 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
               <div className="absolute left-1/2 top-5 h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/50 via-primary/50 to-transparent md:hidden"></div>
              {['Post a Project', 'Approve & Kick-off', 'Review & Complete'].map((step, index) => (
                 <div key={step} className="relative flex flex-col items-center text-center">
                   <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-primary font-bold shadow-[0_0_15px_hsl(var(--primary)/0.5)]">{index + 1}</div>
                   <h3 className="font-headline mt-6 text-2xl">{step}</h3>
                   <p className="mt-2 text-muted-foreground">
                     {index === 0 && 'Submit your project details through our easy-to-use form. Our AI assistant helps you create a perfect brief.'}
                     {index === 1 && 'We\'ll provide a detailed proposal. Once you give the green light, our team starts work immediately.'}
                     {index === 2 && 'Pay securely upon milestone completion. We guarantee you\'ll be 100% satisfied with the final result.'}
                   </p>
                 </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-us" className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12 opacity-0 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                    The Talent Flow Advantage
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    We are a curated team of experts dedicated to your success.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 opacity-0 animate-fade-in-up" style={{animationDelay: '400ms'}}>
              {whyUsBenefits.map((benefit) => (
                 <Card key={benefit.title} className="bg-background/50 border-border/50 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    <CardHeader className="items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">{benefit.icon}</div>
                        <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           {benefit.description}
                        </p>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about-us" className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 opacity-0 animate-fade-in-up">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1 space-y-6">
                <Badge variant="secondary">Our Mission</Badge>
                <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">A Passionate Team of Creators</h2>
                <p className="text-lg text-muted-foreground">
                  We are Talent Flow, a close-knit collective of designers, developers, and strategists who are passionate about building exceptional digital experiences. We believe in the power of collaboration and bring a wealth of expertise to every project, ensuring we not only meet but exceed your expectations.
                </p>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-5 w-5 text-primary"/> Client-Centric Approach</li>
                    <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-5 w-5 text-primary"/> Innovative Solutions</li>
                    <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-5 w-5 text-primary"/> Commitment to Excellence</li>
                </ul>
                <Button asChild size="lg">
                  <Link href="/post-project">Start Your Project</Link>
                </Button>
              </div>
              <div className="order-1 md:order-2">
                <Image
                  src="https://placehold.co/600x600.png"
                  alt="Talent Flow Team"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-2xl shadow-primary/10"
                  data-ai-hint="team collaboration"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12 opacity-0 animate-fade-in-up" style={{animationDelay: '200ms'}}>
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Loved by Teams Worldwide
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Don't just take our word for it. Here's what our clients have to say.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-0 animate-fade-in-up" style={{animationDelay: '400ms'}}>
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="flex flex-col bg-background/50 border-border/50">
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
                   <div className="p-6 pt-0 mt-4 flex items-center gap-4 border-t border-border/50">
                      <Avatar>
                        <AvatarImage src={`https://placehold.co/40x40.png`} alt={testimonial.name} data-ai-hint="person portrait"/>
                        <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-base font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center md:px-6 opacity-0 animate-fade-in-up">
            <div className="rounded-lg bg-gradient-to-br from-primary/80 to-accent/80 p-8 md:p-12 shadow-2xl">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
                Ready to bring your ideas to life?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
                Let's build something amazing together. Post your project today and receive a detailed proposal from our expert team.
              </p>
              <div className="mt-8">
                <Link href="/post-project">
                  <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                    Post a Project <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="sm:col-span-2">
              <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <Zap className="h-6 w-6 text-primary" />
                <span className="font-headline text-xl font-bold">Talent Flow</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">Your on-demand team for exceptional digital services.</p>
            </div>
            <div>
              <h4 className="font-headline font-semibold">For Clients</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/#how-it-works" className="text-muted-foreground hover:text-primary">How It Works</Link></li>
                <li><Link href="/#categories" className="text-muted-foreground hover:text-primary">Our Services</Link></li>
                <li><Link href="/post-project" className="text-muted-foreground hover:text-primary">Post a Project</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-semibold">Company</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/#about-us" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Talent Flow, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
