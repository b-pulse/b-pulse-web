'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu, Bike, Languages } from 'lucide-react';
import React from 'react';

export function Header() {
  const { t, language, toggleLanguage } = useTranslation();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/servicios', label: t.nav.services },
    { href: '/proyectos', label: t.nav.portfolio },
    { href: '/eventos', label: t.nav.events },
    { href: '/quienes-somos', label: t.nav.about },
    { href: '/contacto', label: t.nav.contact },
  ];

  const NavLinkItems = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          className={cn(
            'font-medium transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Bike className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">B-Pulse Pro</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm flex-grow">
          <NavLinkItems />
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button asChild className="hidden md:inline-flex font-bold">
            <Link href="/cotizacion">{t.nav.packages}</Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Toggle language">
            <Languages className="h-5 w-5" />
            <span className="sr-only">
              {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            </span>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="mr-6 flex items-center gap-2 mb-8">
                <Bike className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">B-Pulse Pro</span>
              </Link>
              <div className="flex flex-col gap-4">
                <NavLinkItems />
                <Button asChild className="w-full mt-4 font-bold" onClick={() => setOpen(false)}>
                  <Link href="/cotizacion">{t.nav.packages}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
