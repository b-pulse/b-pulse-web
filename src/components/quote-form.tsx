'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { refineCustomRequest } from '@/app/actions/refine-request';
import { Loader2 } from 'lucide-react';

export function QuoteForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isRefining, setIsRefining] = useState(false);

  const formSchema = z.object({
    eventScale: z.string().min(1, { message: 'Este campo es requerido.' }),
    budget: z.string().min(1, { message: 'Este campo es requerido.' }),
    region: z.string().min(1, { message: 'Este campo es requerido.' }),
    additionalRequirements: z.string().optional(),
    refinedParameters: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventScale: '',
      budget: '',
      region: '',
      additionalRequirements: '',
      refinedParameters: '',
    },
  });

  const handleRefine = async () => {
    setIsRefining(true);
    const { eventScale, budget, region, additionalRequirements } = form.getValues();

    if (!eventScale || !budget || !region) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor, completa Escala, Presupuesto y Región para usar la IA.',
        variant: 'destructive',
      });
      setIsRefining(false);
      return;
    }

    try {
      const result = await refineCustomRequest({ eventScale, budget, region, additionalRequirements });
      form.setValue('refinedParameters', result.refinedParameters);
      toast({
        title: 'Recomendaciones generadas',
        description: 'La IA ha refinado tus requerimientos.',
      });
    } catch (error) {
      toast({
        title: 'Error de IA',
        description: t.quote.form.error,
        variant: 'destructive',
      });
    } finally {
      setIsRefining(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: t.quote.form.success,
      description: 'Nos pondremos en contacto contigo pronto.',
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="eventScale"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{t.quote.form.eventScale}</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: Local, Regional, Nacional" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{t.quote.form.budget}</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: $1000 - $2000 USD" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t.quote.form.region}</FormLabel>
                <FormControl>
                    <Input placeholder="Ej: Santa Cruz, Bolivia" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="additionalRequirements"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t.quote.form.additionalRequirements}</FormLabel>
                <FormControl>
                    <Textarea
                    placeholder={t.quote.form.additionalRequirementsPlaceholder}
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <div className="space-y-4">
            <Button type="button" variant="secondary" onClick={handleRefine} disabled={isRefining} className="w-full md:w-auto">
                {isRefining ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.quote.form.refining}</> : t.quote.form.refine}
            </Button>
            <FormField
                control={form.control}
                name="refinedParameters"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{t.quote.form.refinedParameters}</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder={t.quote.form.refinedParametersPlaceholder}
                        {...field}
                        className="bg-accent/10"
                        rows={5}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <Button type="submit" className="w-full md:w-auto font-bold" size="lg">
          {t.quote.form.submit}
        </Button>
      </form>
    </Form>
  );
}
