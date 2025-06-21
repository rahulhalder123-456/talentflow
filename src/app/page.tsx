import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { ServiceCard } from '@/components/freelancer/ServiceCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  CodeXml,
  Palette,
  Type,
  Clapperboard,
  Megaphone,
  Music,
  CheckCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const categories = [
  { name: 'Web Development', icon: <CodeXml className="h-8 w-8 text-primary" /> },
  { name: 'Graphic Design', icon: <Palette className="h-8 w-8 text-primary" /> },
  { name: 'Writing', icon: <Type className="h-8 w-8 text-primary" /> },
  { name: 'Video & Animation', icon: <Clapperboard className="h-8 w-8 text-primary" /> },
  { name: 'Digital Marketing', icon: <Megaphone className="h-8 w-8 text-primary" /> },
  { name: 'Music & Audio', icon: <Music className="h-8 w-8 text-primary" /> },
];

const freelancers = [
  {
    name: 'Elena Rodriguez',
    avatarUrl: 'https://placehold.co/100x100.png',
    service: 'Full-Stack Web Developer',
    rating: 4.9,
    reviews: 124,
    price: 75,
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'developer code',
  },
  {
    name: 'Marcus Chen',
    avatarUrl: 'https://placehold.co/100x100.png',
    service: 'UI/UX & Brand Designer',
    rating: 5.0,
    reviews: 98,
    price: 90,
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'designer abstract',
  },
  {
    name: 'Aisha Khan',
    avatarUrl: 'https://placehold.co/100x100.png',
    service: 'SEO & Content Strategist',
    rating: 4.8,
    reviews: 210,
    price: 60,
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'writer desk',
  },
  {
    name: 'Leo Petrov',
    avatarUrl: 'https://placehold.co/100x100.png',
    service: 'Motion Graphics Artist',
    rating: 4.9,
    reviews: 76,
    price: 85,
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'animation vibrant',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-background py-20 md:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Find the Perfect Freelance Services for Your Business
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Connect with top-tier independent professionals on Talent Flow. The future of work is here.
            </p>
            <div className="mx-auto mt-8 flex max-w-2xl items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for any service..."
                  className="h-12 rounded-full pl-12 text-base"
                />
              </div>
              <Button type="submit" size="lg" className="rounded-full">
                Search
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section id="categories" className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="font-headline text-center text-3xl font-bold tracking-tight md:text-4xl">
              Browse by Category
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-6">
              {categories.map((category) => (
                <Link
                  href="#"
                  key={category.name}
                  className="group flex flex-col items-center gap-4 rounded-lg border bg-card p-6 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  {category.icon}
                  <h3 className="font-semibold">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-muted py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary">How It Works</Badge>
              <h2 className="font-headline mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Get Your Project Done in 3 Easy Steps
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Talent Flow makes it simple to find skilled professionals and bring your ideas to life.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary">1</div>
                    <span className="font-headline text-2xl">Post a Project</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create a project brief with our AI assistant. It's free, easy, and you'll get proposals from talented freelancers in minutes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary">2</div>
                    <span className="font-headline text-2xl">Hire Your Pro</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Evaluate bids, review portfolios, and interview your favorite candidates. Hire the best fit and get to work.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary">3</div>
                    <span className="font-headline text-2xl">Pay Securely</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pay through our secure system. Release payments when milestones are met and you're 100% satisfied.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Featured Freelancers
              </h2>
              <Link href="#" className="group flex items-center gap-2 text-primary">
                <span>View All</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {freelancers.map((freelancer) => (
                <ServiceCard key={freelancer.name} {...freelancer} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Ready to bring your ideas to life?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Post a project today and get proposals from the best freelancers in the world.
            </p>
            <div className="mt-8">
              <Link href="/post-project">
                <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Post a Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-headline text-lg font-bold">Talent Flow</h3>
              <p className="mt-2 text-sm text-muted-foreground">The future of work.</p>
            </div>
            <div>
              <h4 className="font-semibold">For Clients</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">How to Hire</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Talent Marketplace</Link></li>
                <li><Link href="/post-project" className="text-muted-foreground hover:text-primary">Post a Project</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">For Talent</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">How to Find Work</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Direct Contracts</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Find Freelance Jobs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Talent Flow, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
