"use client";

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export function Footer() {
  const { user } = useAuth();
  const router = useRouter();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (user) {
      router.push('/dashboard/messages');
    } else {
      router.push('/signin');
    }
  };

  return (
    <footer className="border-t border-white/10">
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
              <li>
                <a
                  href="/dashboard/messages"
                  onClick={handleContactClick}
                  className="text-muted-foreground hover:text-primary cursor-pointer"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Talent Flow, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
