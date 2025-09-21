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
      if (['+', '-', '*', '/'].includes(value)) {
        setInput(String(result) + value);
        setHistory(String(result) + value);
        setResult(null);
      } else {
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
    try {
      // Avoid using eval directly for security reasons
      const safeEval = new Function('return ' + input.replace(/[^-()\d/*+.]/g, ''));
      const res = safeEval();
      if (isNaN(res) || !isFinite(res)) {
        setResult('Error');
        setInput('');
      } else {
        setResult(String(res));
        setHistory(input + '=' + res);
        setInput(String(res));
      }
    } catch (error) {
      setResult('Error');
      setInput('');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult(null);
    setHistory('');
  };

  const deleteLast = () => {
    if (result !== null) {
      clearInput();
      return;
    }
    setInput(input.slice(0, -1));
    setHistory(input.slice(0, -1));
  };
  
  const baseButtonClass = "text-xl h-16 w-16 rounded-2xl transition-all duration-200";

  const ActionButton = ({ value, display, className, onClick }: { value?: string, display: string, className?: string, onClick?: () => void }) => (
    <Button
        variant="secondary"
        className={cn(baseButtonClass, "bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300", className)}
        onClick={onClick ? onClick : () => handleButtonClick(value!)}
    >
      {display}
    </Button>
  );

  const OperatorButton = ({ value, display }: { value: string, display: string }) => (
    <Button
      variant="secondary"
      className={cn(baseButtonClass, "bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary/80 text-2xl")}
      onClick={() => handleButtonClick(value)}
    >
      {display}
    </Button>
  );

  const NumberButton = ({ value }: { value: string }) => (
    <Button
      variant="outline"
      className={cn(baseButtonClass, "bg-white/5 border-white/10 text-white hover:bg-white/10")}
      onClick={() => handleButtonClick(value)}
    >
      {value}
    </Button>
  );

  return (
    <Card className="w-full max-w-sm mx-auto shadow-2xl bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl">
      <CardContent className="p-4 space-y-2">
        <div className="bg-transparent rounded-md p-4 text-right h-28 flex flex-col justify-end text-white">
          <div className="h-8 text-lg text-white/60 truncate">{history || '0'}</div>
          <div className="w-full text-right h-12 text-5xl font-bold truncate">
            {result !== null ? result : input || '0'}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
           <ActionButton display="AC" onClick={clearInput} />
           <ActionButton display="C" onClick={deleteLast} />
           <OperatorButton value="/" display="÷" />
           <OperatorButton value="*" display="×" />
        </div>

        <div className="grid grid-cols-4 gap-2">
            <NumberButton value="7" />
            <NumberButton value="8" />
            <NumberButton value="9" />
            <OperatorButton value="-" display="−" />
            
            <NumberButton value="4" />
            <NumberButton value="5" />
            <NumberButton value="6" />
            <OperatorButton value="+" display="+" />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <NumberButton value="1" />
              <NumberButton value="2" />
              <NumberButton value="3" />
              <Button
                variant="outline"
                className={cn(baseButtonClass, "bg-white/5 border-white/10 text-white hover:bg-white/10")}
                onClick={() => handleButtonClick('0')}
              >
                0
              </Button>
            </div>
            <div className="col-span-2 grid grid-rows-2 gap-2">
                <NumberButton value="." />
                <Button className={cn(baseButtonClass, "row-span-2 h-full w-full bg-primary hover:bg-primary/90 text-2xl")} onClick={calculateResult}>=</Button>
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
