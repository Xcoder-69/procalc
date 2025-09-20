'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, Calculator, Sun, Moon, Monitor, History } from 'lucide-react';
import { Logo } from '../icons/Logo';
import { categories } from '@/lib/calculators-data';
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/components/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from './SearchBar';

function AuthArea() {
  const { user, signOut } = useAuth();
  
  if (user) {
    return (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
             <Avatar className="h-8 w-8">
              <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.email ?? ''} />
              <AvatarFallback>
                {user.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled>
            <div className='flex flex-col'>
              <p className='text-sm font-medium'>{user.email}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/history">
              <History className="mr-2 h-4 w-4" />
              Calculation History
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      <Button variant="ghost" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  )
}

function ThemeSwitcher() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export default function Header() {
  const { user } = useAuth();

  const navLinks = [
    { href: '/#featured-calculators', label: 'Featured' },
    { href: '/#all-categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              ProCalc
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">ProCalc</span>
            </Link>
            <div className="my-4 h-px w-full bg-border" />
            <div className="flex flex-col space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2 py-1 text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="my-4 h-px w-full bg-border" />
            <div className="flex flex-col space-y-2">
                <p className="font-semibold px-2">Categories</p>
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/calculator/${category.slug}`}
                        className="flex items-center px-2 py-1 text-muted-foreground"
                    >
                        <Calculator className="mr-2 h-4 w-4" />
                        {category.name}
                    </Link>
                ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchBar />
          </div>
          <nav className="flex items-center">
            {user && (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/history" aria-label="Calculation History">
                  <History className="h-5 w-5" />
                </Link>
              </Button>
            )}
            <ThemeSwitcher />
            <AuthArea />
          </nav>
        </div>
      </div>
    </header>
  );
}
