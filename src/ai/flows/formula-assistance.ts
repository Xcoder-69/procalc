// formula-assistance.ts
'use server';

/**
 * @fileOverview Provides AI-powered explanations of calculator formulas.
 *
 * This file exports:
 * - `getFormulaExplanation`: Function to retrieve an AI-generated explanation of a formula.
 * - `FormulaAssistanceInput`: The input type for the `getFormulaExplanation` function.
 * - `FormulaAssistanceOutput`: The return type for the `getFormulaExplanation` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FormulaAssistanceInputSchema = z.object({
  calculatorName: z.string().describe('The name of the calculator.'),
  formulaDescription: z.string().describe('The detailed description of the formula used in the calculator.'),
});
export type FormulaAssistanceInput = z.infer<typeof FormulaAssistanceInputSchema>;

const FormulaAssistanceOutputSchema = z.object({
  explanation: z.string().describe('An AI-generated explanation of the formula.'),
});
export type FormulaAssistanceOutput = z.infer<typeof FormulaAssistanceOutputSchema>;

export async function getFormulaExplanation(input: FormulaAssistanceInput): Promise<FormulaAssistanceOutput> {
  return formulaAssistanceFlow(input);
}

const formulaExplanationPrompt = ai.definePrompt({
  name: 'formulaExplanationPrompt',
  input: {schema: FormulaAssistanceInputSchema},
  output: {schema: FormulaAssistanceOutputSchema},
  prompt: `You are an expert in explaining mathematical and financial formulas in simple terms.

  Provide a clear and concise explanation of the following formula used in the {{{calculatorName}}} calculator:

  {{{formulaDescription}}}

  Explanation:`, 
});

const formulaAssistanceFlow = ai.defineFlow(
  {
    name: 'formulaAssistanceFlow',
    inputSchema: FormulaAssistanceInputSchema,
    outputSchema: FormulaAssistanceOutputSchema,
  },
  async input => {
    const {output} = await formulaExplanationPrompt(input);
    return output!;
  }
);
