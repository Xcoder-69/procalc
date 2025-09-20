'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const SimpleCalculator = dynamic(() => import('@/components/SimpleCalculator'), {
  ssr: false,
  loading: () => <Skeleton className="w-full max-w-xs mx-auto h-[550px]" />
});

export default function SimpleCalculatorClient() {
  return <SimpleCalculator />;
}
