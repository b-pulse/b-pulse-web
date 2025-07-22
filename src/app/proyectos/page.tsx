'use client';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { portfolioProjects, translationsData } from '@/lib/data';

export default function PortfolioPage() {
  const { t, language } = useTranslation();

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            {t.portfolio.title}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            {t.portfolio.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <Image
                  src={project.image}
                  alt={translationsData[language][project.titleKey]}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={project.dataAiHint}
                />
              </CardContent>
              <CardFooter className="p-6 flex-col items-start">
                <h3 className="text-2xl font-bold font-headline">
                  {translationsData[language][project.titleKey]}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {translationsData[language][project.descriptionKey]}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
