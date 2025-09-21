'use client';

import { z } from 'zod';
import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { solveEquation } from "@/ai/flows/solve-equation";
import type { SolveEquationInput, SolveEquationOutput } from "@/ai/flows/solve-equation";
import { Loader2, Sparkles, Mic, Paperclip, Camera, AlertTriangle, Calculator } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Separator } from './ui/separator';
import { useToast } from '@/hooks/use-toast';

function AICalcLogo() {
    return (
        <div className="flex items-center gap-2 text-2xl font-semibold">
            <Calculator className="h-7 w-7 text-primary" />
            <span className="font-headline">AI Calc</span>
        </div>
    )
}

export function AIChat({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<SolveEquationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => setIsOpen(false), 4000);
    return () => clearTimeout(handle);
  }, [isOpen]);

  const getCameraPermission = async () => {
    if (isCameraOpen) {
      // Turn off camera
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraOpen(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasCameraPermission(true);
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      setIsCameraOpen(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings.',
      });
    }
  };


  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const input: SolveEquationInput = { question: prompt };
      const output = await solveEquation(input);
      setResult(output);
      
      if (!output.isMathProblem) {
         toast({
          variant: "destructive",
          title: "Not a Math Problem",
          description: output.reasoning,
        });
      }

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
      if (isCameraOpen && videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraOpen(false);
    }
    setIsOpen(open);
  }

  const handleToolClick = (toolName: string) => {
    toast({
      title: "Feature Coming Soon!",
      description: `The ${toolName} functionality is under development and will be available soon.`,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-background/80 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle>
            <AICalcLogo />
          </DialogTitle>
          <DialogDescription>
            Ask a math question and our AI will solve it for you.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative">
          <Textarea
            placeholder="e.g., 'Solve for x: 2x + 5 = 15' or 'If a car travels at 60 mph, how long does it take to travel 180 miles?'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            className='bg-muted/30 pr-12'
          />
          <div className="absolute bottom-2 right-2 flex flex-col gap-2">
            <Button size="icon" variant="ghost" onClick={() => handleToolClick('Microphone')}><Mic className="h-5 w-5" /></Button>
            <Button size="icon" variant="ghost" onClick={() => handleToolClick('File Upload')}><Paperclip className="h-5 w-5" /></Button>
            <Button size="icon" variant={isCameraOpen ? 'secondary' : 'ghost'} onClick={getCameraPermission}><Camera className="h-5 w-5" /></Button>
          </div>
        </div>

        {isCameraOpen && (
          <div className='space-y-2'>
            <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted />
            {hasCameraPermission === false && (
                <Alert variant="destructive">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access in your browser settings to use this feature.
                  </AlertDescription>
                </Alert>
            )}
          </div>
        )}

        <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Solving...
              </>
            ) : (
              'Solve with AI'
            )}
          </Button>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && result.isMathProblem && (
          <div className='max-h-[50vh] overflow-y-auto pr-4'>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Sparkles className="h-5 w-5 text-yellow-400"/> Solution</h3>
            <div className="p-4 bg-muted/50 rounded-lg border space-y-4">
                <div>
                    <h4 className="font-semibold mb-2">Step-by-step Explanation:</h4>
                    <div className="text-sm whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-full">
                      {result.solution}
                    </div>
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
