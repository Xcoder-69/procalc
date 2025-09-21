import { categories, calculators } from '@/lib/calculators-data';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Calculator Categories | ProCalc',
    description: 'Browse all calculator categories available on ProCalc, including finance, health, mathematics, and conversion tools.',
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 text-primary">
        Calculator Categories
      </h1>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        Explore our comprehensive suite of calculators, organized into categories to help you find the right tool for your needs.
      </p>

      <div className="space-y-12">
        {categories.map(category => (
          <section key={category.slug} id={category.slug} className="scroll-mt-24">
            <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                    <CardTitle className="text-2xl text-primary font-headline">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {calculators
                            .filter(calc => calc.category === category.slug)
                            .map(calc => (
                            <Link
                                key={calc.slug}
                                href={`/calculator/${calc.slug}`}
                                className="block p-4 rounded-md border bg-background hover:bg-muted/50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                <Calculator className="h-5 w-5 text-accent-foreground/60 group-hover:text-primary transition-colors" />
                                <div className="flex flex-col">
                                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{calc.title}</p>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{calc.shortDescription}</p>
                                </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
}
