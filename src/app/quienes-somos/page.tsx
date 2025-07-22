'use client';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Gem, User } from 'lucide-react';

export default function AboutUsPage() {
  const { t } = useTranslation();

  const sections = [
    {
      key: 'history',
      icon: Rocket,
      image: 'https://images.unsplash.com/photo-1691866406226-708093ced20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8cmV2aXN0YSUyMGRlJTIwY2ljbGlzbW98ZW58MHx8fHwxNzUzMDY2NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'cycling history archives'
    },
    {
      key: 'philosophy',
      icon: Gem,
      image: 'https://images.unsplash.com/photo-1662819414941-27752fec74dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjYXJyZXRlcmElMjBkZSUyMG1vbnRhJUMzJUIxYXxlbnwwfHx8fDE3NTMwNjY3MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'cycling innovation concept'
    },
    {
      key: 'specialist',
      icon: User,
      image: 'https://images.unsplash.com/photo-1635881032011-48299f137a56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8bWFwYWFzfGVufDB8fHx8MTc1MzA2Njg2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'data analysis expert'
    },
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            {t.about.title}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            {t.about.subtitle}
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={section.key} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="aspect-square">
                    <Image
                      src={section.image}
                      alt={t.about[section.key].title}
                      width={500}
                      height={500}
                      className="rounded-lg shadow-xl object-cover w-full h-full"
                      data-ai-hint={section.dataAiHint}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold font-headline">
                      {t.about[section.key].title}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.about[section.key].text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
