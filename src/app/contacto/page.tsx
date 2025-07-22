'use client';
import { useTranslation } from '@/hooks/use-translation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Linkedin, Facebook, Instagram } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ContactPage() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(1, 'Este campo es requerido.'),
    email: z.string().email('Correo electrónico inválido.'),
    message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres.'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Mensaje enviado',
      description: 'Gracias por contactarnos. Te responderemos pronto.',
    });
    form.reset();
  }
  
  const faqs = [
    { q: 'q1', a: 'a1' },
    { q: 'q2', a: 'a2' },
    { q: 'q3', a: 'a3' },
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            {t.contact.title}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.name}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.email}</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.message}</FormLabel>
                          <FormControl>
                            <Textarea rows={6} placeholder={t.contact.form.messagePlaceholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full font-bold">
                      {t.contact.form.send}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-8">
             <Card>
                <CardHeader><CardTitle>{t.contact.info.title}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <a href="mailto:info@bpulse.pro" className="hover:text-primary">info@bpulse.pro</a>
                    </div>
                     <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <a href="tel:+59177791960" className="hover:text-primary">+591 77791960</a>
                    </div>
                     <div className="flex items-center gap-3 pt-4">
                        <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin /></a>
                        <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook /></a>
                        <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram /></a>
                    </div>
                </CardContent>
             </Card>
              <Card>
                <CardHeader><CardTitle>{t.contact.faq.title}</CardTitle></CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-left">{t.contact.faq[faq.q]}</AccordionTrigger>
                                <AccordionContent>
                                {t.contact.faq[faq.a]}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
