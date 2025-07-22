'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { Map, ClipboardList, BookOpen, ChevronRight, Download } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    icon: Map,
    key: 'detailedMaps',
  },
  {
    icon: ClipboardList,
    key: 'elevationProfiles',
  },
  {
    icon: BookOpen,
    key: 'roadbooks',
  },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-secondary text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
            {t.home.hero.title}
          </h1>
          <div className="mt-4 max-w-3xl text-secondary-foreground/80">
            <p className="text-xl md:text-2xl font-bold">{t.home.hero.subtitle_bold}</p>
            <p className="mt-2 text-md md:text-lg">{t.home.hero.subtitle_regular}</p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="font-bold">
              <Link href="/servicios">{t.home.hero.cta.services}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold border-primary border-2 text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/cotizacion">{t.home.hero.cta.quote}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                {t.home.valueProp.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.home.valueProp.text}
              </p>
            </div>
            <div className="aspect-video relative">
                <Image
                    src="https://images.unsplash.com/photo-1600403477955-2b8c2cfab221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8Y2ljbGlzbW98ZW58MHx8fHwxNzUzMTUzNDY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt={t.home.valueProp.title}
                    fill
                    className="rounded-lg object-cover shadow-lg"
                    data-ai-hint="cycling route map"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              {t.home.services.title}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {t.home.services.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.key} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit">
                      <Icon className="w-10 h-10" />
                    </div>
                    <CardTitle className="font-headline pt-4">
                      {t.home.services[service.key as keyof typeof t.home.services].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t.home.services[service.key as keyof typeof t.home.services].description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button asChild>
                <a href="https://storage.googleapis.com/source-code-lab-project-resources/brochure-b-pulse.jpg" target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Brochure Servicos B-PULSE
                </a>
            </Button>
            <Button asChild variant="link" className="text-lg text-accent font-bold">
              <Link href="/servicios">
                {t.home.services.cta}
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects/Portfolio CTA */}
      <section className="py-20 md:py-32 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            {t.home.portfolio.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary-foreground/80">
            {t.home.portfolio.subtitle}
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="outline" className="font-bold border-primary border-2 text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/proyectos">{t.home.portfolio.cta}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
