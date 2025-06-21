
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Menu, Zap, LogOut, LayoutDashboard, PlusCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase/client';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };
  
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
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Signed In As</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/post-project')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Post a Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
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
              <SheetDescription className="sr-only">
                A mobile navigation menu with links to different sections of the website.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="grid gap-2">
                <SheetClose asChild>
                  <Link href="/#categories" className="block py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                    Services
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/#how-it-works" className="block py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                    How It Works
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/#about-us" className="block py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                    About Us
                  </Link>
                </SheetClose>
                {user && (
                   <>
                    <SheetClose asChild>
                      <Link href="/dashboard" className="block py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                        Dashboard
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/post-project" className="block py-2 text-base font-medium text-muted-foreground hover:text-primary" prefetch={false}>
                        Post a Project
                      </Link>
                    </SheetClose>
                   </>
                )}
              </nav>
            </div>
            <div className="mt-auto grid gap-2 border-t p-4">
              {user ? (
                <Button onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link href="/signin">Sign In</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="w-full" asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
