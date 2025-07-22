
'use client';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  const { t } = useTranslation();

  const services = [
    {
      key: 'detailedMaps',
      image: 'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y3ljbGluZyUyMHJhY2V8ZW58MHx8fHwxNzUzMDY2MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'cycling race'
    },
    {
      key: 'elevationProfiles',
      image: 'https://images.unsplash.com/photo-1459661611338-d1a4dc1a6059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtb3VudGFpbiUyMHBhc3N8ZW58MHx8fHwxNzUzMDY2MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'mountain pass'
    },
    {
      key: 'portInfo',
      image: 'https://images.unsplash.com/photo-1541002696302-c407762707f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtb3VudGFpbiUyMHJvYWR8ZW58MHx8fHwxNzUzMDY2MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'mountain road'
    },
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            {t.services.title}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            {t.services.subtitle}
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <Card
              key={service.key}
              className="overflow-hidden shadow-lg border-none"
            >
              <div className="grid md:grid-cols-2 items-center">
                <div className={`p-8 md:p-12 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <h2 className={`text-3xl font-bold font-headline ${['detailedMaps', 'elevationProfiles', 'portInfo'].includes(service.key) ? 'text-primary' : 'text-secondary-foreground'}`}>
                    {t.services[service.key as keyof typeof t.services].title}
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    {t.services[service.key as keyof typeof t.services].description}
                  </p>
                  <div className="mt-6 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="font-semibold text-foreground">
                      {t.services[service.key as keyof typeof t.services].benefits}
                    </p>
                  </div>
                </div>
                <div className="h-64 md:h-full w-full">
                   <Image
                    src={service.image}
                    alt={t.services[service.key as keyof typeof t.services].title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    data-ai-hint={service.dataAiHint}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-20">
            <h2 className="text-3xl font-bold font-headline">{t.quote.title}</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{t.quote.subtitle}</p>
            <Button asChild size="lg" className="mt-8 font-bold">
                <Link href="/cotizacion">{t.home.hero.cta.quote}</Link>
            </Button>
        </div>

      </div>
    </div>
  );
}
