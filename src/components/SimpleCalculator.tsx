'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function SimpleCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState('');

  const handleButtonClick = (value: string) => {
    if (result !== null) {
      // If an operator is pressed, start a new calculation with the previous result
      if (['+', '−', '×', '÷'].includes(value)) {
        setInput(String(result) + value);
        setHistory(String(result) + value);
        setResult(null);
      } else { // Otherwise, start a fresh calculation
        setInput(value);
        setHistory(value);
        setResult(null);
      }
      return;
    }
    setInput((prev) => prev + value);
    setHistory((prev) => prev + value);
  };

  const calculateResult = () => {
    if (!input || input === 'Error') return;
    try {
      // Replace display symbols with evaluatable operators
      const expr = input.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
      // Use Function for safer evaluation than direct eval()
      const safeEval = new Function('return ' + expr.replace(/[^-()\d/*+.]/g, ''));
      const res = safeEval();

      if (isNaN(res) || !isFinite(res)) {
        setResult('Error');
        setHistory(input + '=Error');
        setInput('');
      } else {
        const finalResult = parseFloat(res.toPrecision(15));
        setResult(String(finalResult));
        setHistory(input + '=' + finalResult);
        setInput(String(finalResult));
      }
    } catch (error) {
      setResult('Error');
      setHistory(input + '=Error');
      setInput('');
    }
  };

  const clearAll = () => {
    setInput('');
    setResult(null);
    setHistory('');
  };

  const clearEntry = () => {
    if (result !== null) {
      clearAll();
      return;
    }
    setInput(input.slice(0, -1));
    setHistory(input.slice(0, -1));
  };
  
  const baseButtonClass = "text-xl h-14 w-full rounded-lg transition-all duration-200 border-b-4 active:border-b-0 active:translate-y-1 shadow-md hover:shadow-lg";

  const ActionButton = ({ display, className, onClick }: { display: string, className?: string, onClick: () => void }) => (
    <Button
        variant="ghost"
        className={cn(baseButtonClass, "!bg-red-400/10 !text-red-500 dark:!text-red-400 !border-red-500/20 hover:!bg-red-400/20 hover:shadow-red-400/30", className)}
        onClick={onClick}
    >
      {display}
    </Button>
  );

  const OperatorButton = ({ value }: { value: string }) => (
    <Button
      variant="ghost"
      className={cn(baseButtonClass, "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:shadow-primary/30 text-2xl")}
      onClick={() => handleButtonClick(value)}
    >
      {value}
    </Button>
  );

  const NumberButton = ({ value }: { value: string }) => (
    <Button
      variant="ghost"
      className={cn(baseButtonClass, "bg-card text-card-foreground border-foreground/10 hover:bg-foreground/10 hover:-translate-y-px hover:shadow-primary/20")}
      onClick={() => handleButtonClick(value)}
    >
      {value}
    </Button>
  );

  return (
    <Card className="w-full max-w-xs mx-auto shadow-2xl bg-card/80 backdrop-blur-xl border-border/20 rounded-2xl overflow-hidden font-mono">
      <CardContent className="p-2 space-y-2">
        <div className="bg-muted/30 rounded-md p-2 text-right h-24 flex flex-col justify-end text-foreground border border-border/20 shadow-inner">
          <div className="h-6 text-sm text-foreground/50 truncate">{history || ' '}</div>
          <div className="w-full text-right h-10 text-3xl font-bold truncate">
            {result !== null ? result : input || '0'}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <ActionButton display="AC" onClick={clearAll} className="col-span-2" />
          <ActionButton display="C" onClick={clearEntry} />
          <OperatorButton value="÷" />
        </div>

        <div className="grid grid-cols-4 gap-2">
            <NumberButton value="7" />
            <NumberButton value="8" />
            <NumberButton value="9" />
            <OperatorButton value="×" />
        </div>

        <div className="grid grid-cols-4 gap-2">
            <NumberButton value="4" />
            <NumberButton value="5" />
            <NumberButton value="6" />
            <OperatorButton value="−" />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
            <NumberButton value="1" />
            <NumberButton value="2" />
            <NumberButton value="3" />
            <OperatorButton value="+" />
        </div>

        <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2">
              <NumberButton value="0" />
            </div>
            <NumberButton value="." />
            <Button className={cn(baseButtonClass, "bg-primary hover:bg-primary/90 text-2xl")} onClick={calculateResult}>=</Button>
        </div>

      </CardContent>
    </Card>
  );
}
