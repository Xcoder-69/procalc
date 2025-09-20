'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { solveEquation } from "@/ai/flows/solve-equation";
import type { SolveEquationInput, SolveEquationOutput } from "@/ai/flows/solve-equation";
import { Loader2, Bot, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Separator } from './ui/separator';

export function AIChat({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<SolveEquationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const input: SolveEquationInput = { equation: prompt };
      const output = await solveEquation(input);
      setResult(output);
    } catch (e) {
      console.error(e);
      setError("Sorry, I couldn't solve that. Please try rephrasing your question.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state on close
      setPrompt('');
      setResult(null);
      setError(null);
      setIsLoading(false);
    }
    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot /> AI Problem Solver
          </DialogTitle>
          <DialogDescription>
            Ask a math problem or equation, and our AI will provide a step-by-step solution.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="e.g., 'Solve for x: 2x + 5 = 15' or 'What is the integral of x^2?'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Solving...
              </>
            ) : (
              'Solve Equation'
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent"/> Solution</h3>
            <div className="p-4 bg-muted/50 rounded-lg border space-y-4">
                <div>
                    <h4 className="font-semibold mb-2">Step-by-step Explanation:</h4>
                    <p className="text-sm whitespace-pre-wrap">{result.solution}</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-2">Final Answer:</h4>
                    <p className="text-lg font-bold text-primary">{result.answer}</p>
                </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
