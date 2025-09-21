'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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


  const NumberButton = ({ value }: { value: string }) => (
    <Button variant="outline" className="text-xl h-16 bg-background/20 border-white/10 text-white hover:bg-white/20" onClick={() => handleButtonClick(value)}>{value}</Button>
  );

  const OperatorButton = ({ value, display }: { value: string, display: string }) => (
    <Button variant="secondary" className="text-xl h-16 bg-white/30 text-white hover:bg-white/40" onClick={() => handleButtonClick(value)}>{display}</Button>
  );

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl">
      <CardContent className="p-4 space-y-4">
        <div className="bg-transparent rounded-md p-4 text-right h-28 flex flex-col justify-end text-white">
          <div className="h-8 text-lg text-white/60 truncate">{history || '0'}</div>
          <div className="w-full text-right h-12 text-5xl font-bold truncate">
            {result !== null ? result : input || '0'}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
           <Button variant="secondary" className="col-span-2 text-xl h-16 bg-white/30 text-white hover:bg-white/40" onClick={clearInput}>AC</Button>
           <Button variant="secondary" className="text-xl h-16 bg-white/30 text-white hover:bg-white/40" onClick={deleteLast}>C</Button>
           <OperatorButton value="/" display="&divide;" />
        </div>

        <div className="grid grid-cols-4 gap-2">
            <NumberButton value="7" />
            <NumberButton value="8" />
            <NumberButton value="9" />
            <OperatorButton value="*" display="&times;" />
            
            <NumberButton value="4" />
            <NumberButton value="5" />
            <NumberButton value="6" />
            <OperatorButton value="-" display="-" />

            <NumberButton value="1" />
            <NumberButton value="2" />
            <NumberButton value="3" />
            <OperatorButton value="+" display="+" />
        </div>
        <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" className="col-span-2 text-xl h-16 bg-background/20 border-white/10 text-white hover:bg-white/20" onClick={() => handleButtonClick('0')}>0</Button>
            <NumberButton value="." />
            <Button className="text-xl h-16 bg-primary hover:bg-primary/90" onClick={calculateResult}>=</Button>
        </div>
      </CardContent>
    </Card>
  );
}
