import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { categories, calculators } from '@/lib/calculators-data';
import { ArrowRight, Calculator } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ScientificCalculator from '@/components/ScientificCalculator';
import SimpleCalculator from '@/components/SimpleCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-background border-b relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-full max-w-4xl h-auto aspect-square bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tighter text-primary mb-4">
              ProCalc
            </h1>
            <p className="max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-muted-foreground mb-8">
              Your all-in-one suite of professional-grade calculators for finance, health, and mathematics. Accurate, fast, and easy to use.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/categories">
                Explore Calculators <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className='max-w-xs mx-auto w-full'>
            <Tabs defaultValue="simple" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="simple">Simple</TabsTrigger>
                <TabsTrigger value="scientific">Scientific</TabsTrigger>
              </TabsList>
              <TabsContent value="simple">
                <SimpleCalculator />
              </TabsContent>
              <TabsContent value="scientific">
                <ScientificCalculator />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="all-categories" className="py-16 md:py-24 bg-card border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">All Categories</h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
            Browse our comprehensive library of calculators organized by category.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map(category => (
              <div key={category.slug} className="p-6 rounded-lg border bg-background hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold font-headline text-primary mb-3">{category.name}</h3>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <ul className="space-y-2">
                  {calculators.filter(c => c.category === category.slug).slice(0, 5).map(calc => (
                    <li key={calc.slug}>
                      <Link href={`/calculator/${calc.slug}`} className="flex items-center text-foreground hover:text-primary transition-colors group">
                        <Calculator className="mr-2 h-4 w-4 text-accent-foreground/50 group-hover:text-primary transition-colors" />
                        <span>{calc.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/categories">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
