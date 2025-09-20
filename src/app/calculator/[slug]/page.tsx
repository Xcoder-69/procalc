import { notFound } from 'next/navigation';
import { calculators, getCalculatorBySlug } from '@/lib/calculators-data';
import CalculatorWrapper from '@/components/CalculatorWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    title: `${calculator.title} | ProCalc`,
    description: calculator.shortDescription,
    keywords: [calculator.title, 'calculator', ...calculator.title.toLowerCase().split(' ')],
  };
}

const AdPlaceholder = ({ title, className }: { title: string, className: string }) => (
    <div className="p-4 text-center bg-card rounded-lg border">
        <h4 className='font-semibold mb-2 text-sm'>Ad Placeholder</h4>
        <div className={`bg-background/50 flex items-center justify-center rounded-md ${className}`}>
            <p className='text-muted-foreground text-xs'>{title}</p>
        </div>
    </div>
);

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
      <div className="container mx-auto my-6">
        <AdPlaceholder title="Top Leaderboard Ad (728x90)" className="h-24" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
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

            <section>
              <div className="prose dark:prose-invert max-w-none">
                <h2 className='font-headline'>About the {calculator.title}</h2>
                <p>{calculator.article}</p>
                <div className="my-8">
                  <AdPlaceholder title="In-Article Ad (300x250)" className="h-64" />
                </div>
                <p>Continue reading the article content here. This section provides more details, use cases, and information related to the calculator to improve user understanding and SEO.</p>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-8 sticky top-24 self-start">
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

            <AdPlaceholder title="Sidebar Ad (300x600)" className="h-[600px]" />
          </aside>
        </div>
      </div>
    </>
  );
}
