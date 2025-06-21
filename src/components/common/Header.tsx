import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">Talent Flow</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/#categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" prefetch={false}>
            Find Talent
          </Link>
          <Link href="/post-project" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" prefetch={false}>
            Post a Project
          </Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" prefetch={false}>
            How It Works
          </Link>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <Zap className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg font-bold">Talent Flow</span>
              </Link>
              <nav className="grid gap-2">
                <Link href="/#categories" className="py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                  Find Talent
                </Link>
                <Link href="/post-project" className="py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                  Post a Project
                </Link>
                <Link href="/#how-it-works" className="py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                  How It Works
                </Link>
              </nav>
              <div className="grid gap-2">
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
