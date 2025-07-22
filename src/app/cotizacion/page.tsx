'use client';
import { useTranslation } from '@/hooks/use-translation';
import { QuoteForm } from '@/components/quote-form';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function QuotePage() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRequestPackage = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const packages = [
    {
        key: 'basic',
        features: t.quote.packages.basicFeatures,
    },
    {
        key: 'standard',
        features: t.quote.packages.standardFeatures,
        popular: true,
    },
    {
        key: 'premium',
        features: t.quote.packages.premiumFeatures,
    }
  ];

  if (!isClient) {
    return null;
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        
        {/* Packages Section */}
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
                {t.quote.packages.title}
            </h1>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map(pkg => (
                <Card key={pkg.key} className={`flex flex-col ${pkg.popular ? 'border-primary border-2 shadow-primary/20' : ''}`}>
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-headline">{t.quote.packages[pkg.key as keyof typeof t.quote.packages]}</CardTitle>
                        {pkg.popular && <p className="text-sm font-semibold text-primary">MÁS POPULAR</p>}
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="space-y-3">
                            {pkg.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full font-bold" variant={pkg.popular ? 'default' : 'outline'} onClick={handleRequestPackage}>
                            Solicitar {t.quote.packages[pkg.key as keyof typeof t.quote.packages]}
                         </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <Card className="mt-12 max-w-5xl mx-auto text-center">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">{t.quote.packages.custom.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{t.quote.packages.custom.description}</p>
            </CardContent>
        </Card>


        {/* Form Section */}
        <div ref={formRef} className="mt-16 md:mt-24 pt-16 border-t">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">
                    {t.quote.title}
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    {t.quote.subtitle}
                </p>
            </div>
            <div className="max-w-4xl mx-auto">
                <Card className="p-4 md:p-8">
                    <CardContent className="p-0">
                        <QuoteForm />
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
