export type CategorySlug = 'health' | 'finance' | 'mathematics' | 'conversion-tools';
export type CategoryName = 'Health' | 'Finance' | 'Mathematics' | 'Conversion & Tools';

export interface Category {
  slug: CategorySlug;
  name: CategoryName;
  description: string;
}

export type CalculatorInput = {
  name: string;
  label: string;
  type: 'number' | 'select' | 'date';
  placeholder?: string;
  defaultValue?: string | number;
  options?: { value: string | number; label: string }[];
  min?: number;
  max?: number;
  step?: number;
};

export type CalculatorDef = {
  slug: string;
  title: string;
  category: CategorySlug;
  shortDescription: string;
  article: string;
  formulaDescription?: string;
  relatedCalculators: string[];
  isFeatured?: boolean;
  image: {
    seed: string;
    width: number;
    height: number;
    hint: string;
  };
  inputs: CalculatorInput[];
  resultLabels: Record<string, { label: string; unit?: string; description?: string; precision?: number }>;
};
