'use client';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { featuredEvents, translationsData } from '@/lib/data';
import { Calendar, MapPin, Users, Download, ExternalLink } from 'lucide-react';

export default function EventsPage() {
  const { t, language } = useTranslation();

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            {t.events.title}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            {t.events.subtitle}
          </p>
        </div>

        <div className="space-y-12">
          {featuredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden shadow-lg grid md:grid-cols-5">
              <div className="md:col-span-2">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                  data-ai-hint={event.dataAiHint}
                />
              </div>
              <div className="md:col-span-3 p-6 md:p-8">
                <h2 className="text-3xl font-bold font-headline">{event.title}</h2>
                <div className="mt-4 space-y-3 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span><strong>{t.events.date}:</strong> {translationsData[language][event.dateKey]}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span><strong>{t.events.location}:</strong> {event.location}</span>
                  </div>
                   <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span><strong>{t.events.organizer}:</strong> {event.organizer}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold font-headline">{t.events.techDocs}</h3>
                   <div className="mt-4 flex flex-col sm:flex-row gap-4">
                      <Button>
                          <Download className="w-4 h-4 mr-2"/>
                          {t.events.download} Roadbook
                      </Button>
                      <Button variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2"/>
                          {t.events.officialSite}
                      </Button>
                   </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
