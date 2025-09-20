'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getFormulaExplanation } from '@/ai/flows/formula-assistance';
import type { FormulaAssistanceInput } from '@/ai/flows/formula-assistance';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface FormulaAssistanceProps {
  calculatorName: string;
  formulaDescription: string;
}

export default function FormulaAssistance({ calculatorName, formulaDescription }: FormulaAssistanceProps) {
  const [showAssistance, setShowAssistance] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetExplanation = async () => {
    setIsLoading(true);
    setError(null);
    setExplanation(null);
    
    const input: FormulaAssistanceInput = { calculatorName, formulaDescription };
    
    try {
      const result = await getFormulaExplanation(input);
      setExplanation(result.explanation);
    } catch (e) {
      setError('An error occurred while fetching the explanation. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-card mt-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="assistance-switch" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5 text-accent" />
          <span>AI Formula Assistance</span>
        </Label>
        <Switch
          id="assistance-switch"
          checked={showAssistance}
          onCheckedChange={setShowAssistance}
        />
      </div>

      {showAssistance && (
        <div className="mt-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Need help understanding the formula?</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Get a simple, AI-powered explanation of the formula used in this calculator.
                </p>
                <Button onClick={handleGetExplanation} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Explain Formula'
                  )}
                </Button>

                {error && (
                   <Alert variant="destructive">
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>{error}</AlertDescription>
                   </Alert>
                )}

                {explanation && (
                  <div className="p-4 bg-muted/50 rounded-md border">
                    <h4 className="font-semibold mb-2">Explanation</h4>
                    <p className="text-sm whitespace-pre-wrap">{explanation}</p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
}
