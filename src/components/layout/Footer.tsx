'use client';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { Bike, Linkedin, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Facebook, label: 'Facebook' },
    { href: '#', icon: Instagram, label: 'Instagram' },
  ];

  const navLinks = [
    { href: '/servicios', label: t.nav.services },
    { href: '/proyectos', label: t.nav.portfolio },
    { href: '/quienes-somos', label: t.nav.about },
    { href: '/contacto', label: t.nav.contact },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Bike className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">B-Pulse Pro</span>
            </Link>
            <p className="text-sm text-secondary-foreground/70">{t.footer.slogan}</p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
             <div>
              <h3 className="font-headline font-semibold mb-4">{t.nav.home}</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                            {link.label}
                        </Link>
                    </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold mb-4">{t.contact.info.social}</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.label} href={link.href} aria-label={link.label} className="text-secondary-foreground/70 hover:text-primary transition-colors">
                      <Icon className="h-6 w-6" />
                    </Link>
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="font-headline font-semibold mb-4">{t.nav.contact}</h3>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li><a href="mailto:info@bpulse.pro" className="hover:text-primary transition-colors">info@bpulse.pro</a></li>
                <li><a href="tel:+59177791960" className="hover:text-primary transition-colors">+591 77791960</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/70">
          <p>&copy; {new Date().getFullYear()} {t.footer.copy}</p>
        </div>
      </div>
    </footer>
  );
}
