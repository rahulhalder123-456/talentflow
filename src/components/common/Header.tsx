import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Zap className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-bold">Talent Flow</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link href="/#categories" className="font-medium text-muted-foreground transition-colors hover:text-primary" prefetch={false}>
            Services
          </Link>
          <Link href="/#how-it-works" className="font-medium text-muted-foreground transition-colors hover:text-primary" prefetch={false}>
            How It Works
          </Link>
           <Link href="/#about-us" className="font-medium text-muted-foreground transition-colors hover:text-primary" prefetch={false}>
            About Us
          </Link>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/post-project">Post a Project</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col p-0 bg-background">
            <SheetHeader className="border-b p-4">
              <SheetTitle>
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                  <Zap className="h-6 w-6 text-primary" />
                  <span className="font-headline text-lg font-bold">Talent Flow</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="grid gap-2">
                <Link href="/#categories" className="block py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                  Services
                </Link>
                 <Link href="/#how-it-works" className="block py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                  How It Works
                </Link>
                <Link href="/#about-us" className="block py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                  About Us
                </Link>
                <Link href="/post-project" className="block py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                  Post a Project
                </Link>
              </nav>
            </div>
            <div className="mt-auto grid gap-2 border-t p-4">
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
