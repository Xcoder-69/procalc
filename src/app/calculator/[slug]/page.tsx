import { notFound } from 'next/navigation';
import Image from 'next/image';
import { calculators, getCalculatorBySlug } from '@/lib/calculators-data';
import CalculatorWrapper from '@/components/CalculatorWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return calculators.map(calculator => ({
    slug: calculator.slug,
  }));
}

export async function generateMetadata({ params }: CalculatorPageProps) {
  const calculator = getCalculatorBySlug(params.slug);

  if (!calculator) {
    return {
      title: 'Calculator Not Found',
    };
  }

  return {
    title: `${calculator.title} | ProCalc Hub`,
    description: calculator.shortDescription,
  };
}

export default function CalculatorPage({ params }: CalculatorPageProps) {
  const calculator = getCalculatorBySlug(params.slug);

  if (!calculator) {
    notFound();
  }

  const relatedCalculators = calculator.relatedCalculators
    .map(slug => getCalculatorBySlug(slug))
    .filter(Boolean);

  return (
    <>
      {/* Top Ad Placeholder */}
      <div className="container mx-auto my-6">
        <div className="p-4 text-center bg-card rounded-lg border">
            <h4 className='font-semibold mb-2'>Ad Placeholder</h4>
            <div className='bg-background flex items-center justify-center h-24 md:h-32 rounded-md'>
                <p className='text-muted-foreground text-sm'>Top Leaderboard Ad</p>
            </div>
            <p className='text-xs text-muted-foreground mt-2'>/* AD PLACEHOLDER — PASTE ADSENSE SCRIPT HERE */</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Calculator Section */}
            <section>
              <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2 text-primary">{calculator.title}</h1>
              <p className="text-lg text-muted-foreground mb-8">{calculator.shortDescription}</p>

              <Card>
                <CardContent className="p-6">
                  <CalculatorWrapper calculatorDef={calculator} />
                </CardContent>
              </Card>
            </section>
            
            <Separator className="my-12" />

            {/* Article Section */}
            <section>
              <div className="prose dark:prose-invert max-w-none">
                <h2 className='font-headline'>About the {calculator.title}</h2>
                <p>{calculator.article}</p>
                {/* In-article Ad Placeholder */}
                <div className="p-4 my-6 text-center bg-card rounded-lg border">
                  <h4 className='font-semibold mb-2'>Ad Placeholder</h4>
                  <div className='bg-background flex items-center justify-center h-48 rounded-md'>
                    <p className='text-muted-foreground text-sm'>In-Article Rectangle Ad</p>
                  </div>
                  <p className='text-xs text-muted-foreground mt-2'>/* AD PLACEHOLDER — PASTE ADSENSE SCRIPT HERE */</p>
                </div>
                <p>Continue reading the article content here. This section provides more details, use cases, and information related to the calculator to improve user understanding and SEO.</p>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-8">
            {/* Related Calculators */}
            {relatedCalculators.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>You may also like</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedCalculators.map(related => (
                    related && (
                      <Link key={related.slug} href={`/calculator/${related.slug}`} className="block p-4 rounded-md border bg-background hover:bg-muted/50 transition-colors">
                        <p className="font-semibold text-primary">{related.title}</p>
                        <p className="text-sm text-muted-foreground">{related.shortDescription}</p>
                      </Link>
                    )
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Sidebar Ad Placeholder */}
            <div className='p-4 text-center bg-card rounded-lg border'>
              <h4 className='font-semibold mb-2'>Ad Placeholder</h4>
              <div className='bg-background flex items-center justify-center h-64 rounded-md'>
                <p className='text-muted-foreground text-sm'>Sidebar Ad</p>
              </div>
              <p className='text-xs text-muted-foreground mt-2'>/* AD PLACEHOLDER — PASTE ADSENSE SCRIPT HERE */</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
