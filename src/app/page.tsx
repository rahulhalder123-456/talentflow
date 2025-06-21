import Link from 'next/link';
import { Header } from '@/components/common/Header';
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
  Users,
  Clock,
  ShieldCheck,
  DollarSign,
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

const whyUsBenefits = [
  {
    title: 'Expert Team',
    description: 'A dedicated team of vetted professionals for every project.',
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'On-Time Delivery',
    description: 'We respect your deadlines and guarantee timely completion.',
    icon: <Clock className="h-6 w-6" />,
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees. Get a clear, upfront quote for your project.',
    icon: <DollarSign className="h-6 w-6" />,
  },
    {
    title: 'Quality Guaranteed',
    description: "We stand by our work and ensure you're 100% satisfied.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-background py-20 md:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Your Expert Team for Any Project
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Partner with our dedicated team of professionals to bring your vision to life. We deliver quality, on time, every time.
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
              Explore Our Services
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
                Talent Flow makes it simple to partner with us and bring your ideas to life.
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
                    Create a project brief with our AI assistant. It's free, easy, and you'll get a detailed proposal from our expert team.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary">2</div>
                    <span className="font-headline text-2xl">Approve &amp; Kick-off</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Review our comprehensive proposal. Once you approve, our dedicated team gets to work immediately.
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


        <section id="why-us" className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
                <Badge variant="secondary">Why Choose Us?</Badge>
                <h2 className="font-headline mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                    The Talent Flow Advantage
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    We are a curated team of experts dedicated to your success.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyUsBenefits.map((benefit) => (
                 <Card key={benefit.title} className="text-center">
                    <CardHeader className="items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">{benefit.icon}</div>
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

        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Ready to bring your ideas to life?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Post a project today and get a proposal from our expert team.
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
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-headline text-lg font-bold">Talent Flow</h3>
              <p className="mt-2 text-sm text-muted-foreground">Your dedicated project partner.</p>
            </div>
            <div>
              <h4 className="font-semibold">For Clients</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/#how-it-works" className="text-muted-foreground hover:text-primary">How It Works</Link></li>
                <li><Link href="/#categories" className="text-muted-foreground hover:text-primary">Our Services</Link></li>
                <li><Link href="/post-project" className="text-muted-foreground hover:text-primary">Post a Project</Link></li>
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
