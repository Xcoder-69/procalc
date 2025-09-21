import CalculatorSkeleton from '@/components/CalculatorSkeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-lg">
        <CalculatorSkeleton />
      </div>
    </div>
  );
}
