'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CalculatorDef, CalculatorInput, Calculation } from '@/lib/types';
import * as calculatorLogics from '@/lib/calculator-helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Terminal } from 'lucide-react';
import FormulaAssistance from './FormulaAssistance';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useAuth } from './AuthProvider';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

const calculationMap: Record<string, (inputs: Record<string, number | string>) => Record<string, any>> = {
  'bmi-calculator': calculatorLogics.calculateBmi,
  'bmr-calculator': calculatorLogics.calculateBmr,
  'loan-emi-calculator': calculatorLogics.calculateEmi,
  'sip-calculator': calculatorLogics.calculateSip,
  'simple-interest-calculator': calculatorLogics.calculateSimpleInterest,
  'percentage-calculator': calculatorLogics.calculatePercentage,
  'age-calculator': calculatorLogics.calculateAge,
  'unit-converter': calculatorLogics.convertUnits,
  'discount-calculator': calculatorLogics.calculateDiscount,
  'date-difference-calculator': calculatorLogics.calculateDateDifference,
};

type FormValues = Record<string, string | number>;

export default function CalculatorWrapper({ calculatorDef }: { calculatorDef: CalculatorDef }) {
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const defaultValues = calculatorDef.inputs.reduce((acc, input) => {
    if (input.type === 'date') {
      acc[input.name] = format(new Date(), 'yyyy-MM-dd');
    } else {
      acc[input.name] = input.defaultValue || '';
    }
    return acc;
  }, {} as FormValues);
  
  const { control, handleSubmit, reset, setValue } = useForm<FormValues>({ defaultValues });

  const onSubmit = async (data: FormValues) => {
    const calculationFn = calculationMap[calculatorDef.slug];
    if (calculationFn) {
      const numericData = Object.entries(data).reduce((acc, [key, value]) => {
        const inputDef = calculatorDef.inputs.find(i => i.name === key);
        if (inputDef?.type === 'number' && value === '') {
          acc[key] = '';
        } else if (inputDef?.type === 'number') {
          acc[key] = parseFloat(String(value));
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, number | string>);
      const res = calculationFn(numericData);
      setResult(res);

      if (user && Object.keys(res).length > 0) {
        try {
          const historyData: Calculation = {
            userId: user.uid,
            calculatorSlug: calculatorDef.slug,
            calculatorTitle: calculatorDef.title,
            inputs: data,
            results: res,
            createdAt: serverTimestamp(),
          };
          await addDoc(collection(db, 'history'), historyData);
        } catch (error) {
          console.error("Error saving calculation to history: ", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not save this calculation to your history.",
          })
        }
      }
    }
  };

  const renderInput = (input: CalculatorInput) => {
    return (
      <Controller
        name={input.name}
        control={control}
        render={({ field }) => {
          if (input.type === 'select') {
            return (
              <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                <SelectTrigger>
                  <SelectValue placeholder={input.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {input.options?.map(option => (
                    <SelectItem key={String(option.value)} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }
          return (
            <Input
              {...field}
              type={input.type}
              placeholder={input.placeholder}
              min={input.min}
              max={input.max}
              step={input.step}
              inputMode={input.type === 'number' ? 'decimal' : undefined}
              value={field.value ?? ''}
              onChange={(e) => {
                const { value } = e.target;
                if (input.type === 'number') {
                    // Allow empty string, or valid number strings
                    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                        field.onChange(value);
                    }
                } else {
                    field.onChange(value);
                }
              }}
            />
          );
        }}
      />
    );
  };

  const handleReset = () => {
    reset(defaultValues);
    setResult(null);
  };

  const hasResults = result && Object.keys(result).length > 0;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className={cn("grid gap-4", calculatorDef.inputs.length > 2 ? "md:grid-cols-2" : "md:grid-cols-1")}>
          {calculatorDef.inputs.map(input => (
            <div key={input.name} className="space-y-2">
              <Label htmlFor={input.name}>{input.label}</Label>
              {renderInput(input)}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" className="flex-1">Calculate</Button>
          <Button type="button" variant="outline" className="flex-1" onClick={handleReset}>Reset</Button>
        </div>
      </form>

      {hasResults && (
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(result).map(([key, value]) => {
              const resultLabel = calculatorDef.resultLabels[key];
              if (!resultLabel) return null;

              const displayValue = typeof value === 'number' 
                ? value.toLocaleString(undefined, { maximumFractionDigits: resultLabel.precision ?? 2 }) 
                : String(value);

              return (
                <div key={key} className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">{resultLabel.label}</span>
                  <span className="text-lg font-semibold text-primary">
                    {resultLabel.unit && resultLabel.unit + ' '}
                    {displayValue}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-200">
        <Terminal className="h-4 w-4 !text-red-600 dark:!text-red-400" />
        <AlertTitle className="text-red-900 dark:text-red-300">Disclaimer</AlertTitle>
        <AlertDescription className="text-red-700 dark:text-red-300">
          Note: results are approximate and provided for informational purposes only. Please do not rely solely on these results for legal, financial, or medical decisions. The site owner, Mayur Suryavanshi, is not liable for actions taken based on these calculations.
        </AlertDescription>
      </Alert>
      
      {calculatorDef.formulaDescription && (
        <FormulaAssistance
          calculatorName={calculatorDef.title}
          formulaDescription={calculatorDef.formulaDescription}
        />
      )}
    </div>
  );
}
