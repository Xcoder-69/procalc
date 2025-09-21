'use server';

/**
 * @fileOverview A Genkit flow for solving mathematical equations.
 * This file defines the input and output schemas for the equation solving flow,
 * and implements the flow itself.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SolveEquationInputSchema = z.object({
  question: z.string().describe('The mathematical equation or problem to solve.'),
});
export type SolveEquationInput = z.infer<typeof SolveEquationInputSchema>;

const SolveEquationOutputSchema = z.object({
  isMathProblem: z.boolean().describe('Whether the question is math-related.'),
  reasoning: z.string().describe('The reasoning for why the question is or is not a math problem. If it is not, explain why.'),
  solution: z.string().describe('The step-by-step solution to the equation. Provide this only if it is a math problem.'),
  answer: z.string().describe('The final answer. Provide this only if it is a math problem.'),
});
export type SolveEquationOutput = z.infer<typeof SolveEquationOutputSchema>;

export async function solveEquation(input: SolveEquationInput): Promise<SolveEquationOutput> {
  return solveEquationFlow(input);
}

const solveEquationPrompt = ai.definePrompt({
  name: 'solveEquationPrompt',
  input: { schema: SolveEquationInputSchema },
  output: { schema: SolveEquationOutputSchema },
  prompt: `You are a world-class AI mathematician. Your task is to analyze and solve math-related questions.

First, determine if the user's question is a mathematical problem. A math problem can be an equation, a word problem, or any question requiring mathematical reasoning.

- If it IS a math problem, set 'isMathProblem' to true. Then, provide a detailed, step-by-step 'solution' and a clear 'final answer'. The reasoning should briefly state that it is a math problem.
- If it IS NOT a math problem, set 'isMathProblem' to false. In the 'reasoning' field, explain that you are an AI specializing in mathematics and cannot answer non-math questions. Do not provide a solution or answer.

User Question: {{{question}}}

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
