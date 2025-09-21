'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CalculatorSkeleton = () => (
  <Card className="w-full max-w-lg mx-auto shadow-2xl bg-card/50 backdrop-blur-xl border-white/10 rounded-2xl overflow-hidden animate-pulse">
    <CardContent className="p-4 space-y-4">
      <div className="bg-black/20 rounded-md px-4 py-2 text-right h-32 flex flex-col justify-end">
        <Skeleton className="h-8 w-2/3 ml-auto bg-white/10" />
        <Skeleton className="h-16 w-full mt-2 bg-white/10" />
      </div>
      
      <div className="h-14 grid grid-cols-2 gap-2 bg-black/20 border-white/10 rounded-md p-1">
        <Skeleton className="h-full w-full rounded-md bg-white/10" />
        <Skeleton className="h-full w-full rounded-md bg-white/10" />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-2xl bg-white/10" />
        ))}
      </div>
    </CardContent>
  </Card>
);


const ScientificCalculator = dynamic(() => import('@/components/ScientificCalculator'), {
  ssr: false,
  loading: () => <CalculatorSkeleton />,
});

export default function SimpleCalculatorClient() {
  return <ScientificCalculator />;
}
