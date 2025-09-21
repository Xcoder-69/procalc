'use client';

import dynamic from 'next/dynamic';
import CalculatorSkeleton from '@/components/CalculatorSkeleton';

const ScientificCalculator = dynamic(() => import('@/components/ScientificCalculator'), {
  ssr: false,
  loading: () => <CalculatorSkeleton />,
});

export default function SimpleCalculatorClient() {
  return <ScientificCalculator />;
}
