'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ScientificCalculator = dynamic(() => import('@/components/ScientificCalculator'), {
  ssr: false,
  loading: () => <Skeleton className="w-full max-w-lg mx-auto h-[740px]" />
});

export default function SimpleCalculatorClient() {
  return <ScientificCalculator />;
}
