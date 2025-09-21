'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
      // Use a safer method than eval() for calculations
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


  return (
    <Card className="w-full max-w-xs mx-auto shadow-2xl bg-card/80 backdrop-blur-sm border-border/20">
      <CardContent className="p-4 space-y-4">
        <div className="bg-background/50 rounded-md p-4 text-right h-24 flex flex-col justify-end">
          <div className="h-6 text-sm text-muted-foreground truncate">{history || '0'}</div>
          <Input
            type="text"
            className="w-full text-right h-12 text-4xl font-bold border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            value={result !== null ? result : input || '0'}
            readOnly
          />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
           <Button variant="destructive" className="col-span-1 text-lg h-16" onClick={clearInput}>AC</Button>
           <Button variant="destructive" className="text-lg h-16" onClick={deleteLast}>DEL</Button>
           <Button variant="secondary" className="text-lg h-16" onClick={() => handleButtonClick('/')}>&divide;</Button>
           <Button variant="secondary" className="text-lg h-16" onClick={() => handleButtonClick('*')}>&times;</Button>
        </div>

        <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" className="text-lg h-16" onClick={() => handleButtonClick('7')}>7</Button>
            <Button variant="outline" className="text-lg h-16" onClick={() => handleButtonClick('8')}>8</Button>
            <Button variant="outline" className="text-lg h-16" onClick={() => handleButtonClick('9')}>9</Button>
            <Button variant="secondary" className="text-lg h-16" onClick={() => handleButtonClick('-')}>-</Button>
            
            <Button variant="outline" className="text-lg h-16" onClick={() => handleButtonClick('4')}>4</Button>
            <Button variant="outline" className="text-lg h-16" onClick={() => handleButtonClick('5')}>5</Button>
            <Button variant="outline" className="text-lg h-16" onClick={() => handleButtonClick('6')}>6</Button>
            <Button variant="secondary" className="text-lg h-16" onClick={() => handleButtonClick('+')}>+</Button>

        </div>
        <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" className="text-lg h-16" onClick={() => handleButtonClick('1')}>1</Button>
            <Button variant="outline" className="text-lg h-16" onClick={() => handleButtonClick('2')}>2</Button>
            <Button variant="outline" className="text-lg h-16" onClick={() => handleButtonClick('3')}>3</Button>
            <Button className="row-span-2 text-lg h-auto" onClick={calculateResult}>=</Button>

            <Button variant="outline" className="col-span-2 text-lg h-16" onClick={() => handleButtonClick('0')}>0</Button>
            <Button variant="outline" className="text-lg h-16" onClick={() => handleButtonClick('.')}>.</Button>
        </div>
      </CardContent>
    </Card>
  );
}
