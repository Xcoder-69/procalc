'use server';

/**
 * @fileOverview A Genkit flow for solving mathematical equations.
 * This file defines the input and output schemas for the equation solving flow,
 * and implements the flow itself.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SolveEquationInputSchema = z.object({
  equation: z.string().describe('The mathematical equation or problem to solve.'),
});
export type SolveEquationInput = z.infer<typeof SolveEquationInputSchema>;

const SolveEquationOutputSchema = z.object({
  solution: z.string().describe('The step-by-step solution to the equation.'),
  answer: z.string().describe('The final answer.'),
});
export type SolveEquationOutput = z.infer<typeof SolveEquationOutputSchema>;

export async function solveEquation(input: SolveEquationInput): Promise<SolveEquationOutput> {
  return solveEquationFlow(input);
}

const solveEquationPrompt = ai.definePrompt({
  name: 'solveEquationPrompt',
  input: { schema: SolveEquationInputSchema },
  output: { schema: SolveEquationOutputSchema },
  prompt: `You are a world-class mathematician. Solve the following equation, providing a step-by-step solution and the final answer.

Equation: {{{equation}}}

Your response must be in the structured format defined.`,
});

const solveEquationFlow = ai.defineFlow(
  {
    name: 'solveEquationFlow',
    inputSchema: SolveEquationInputSchema,
    outputSchema: SolveEquationOutputSchema,
  },
  async (input) => {
    const { output } = await solveEquationPrompt(input);
    return output!;
  }
);
