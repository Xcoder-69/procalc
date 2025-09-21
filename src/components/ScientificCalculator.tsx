'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const factorial = (n: number): number => {
    if (n < 0 || n % 1 !== 0) return NaN;
    if (n > 170) return Infinity;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

export default function ScientificCalculator() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState('');
  const [isDeg, setIsDeg] = useState(true);
  const [memory, setMemory] = useState(0);

  // Helper for safe evaluation
  const safeEval = (expr: string) => {
    try {
      let evalExpr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
      evalExpr = evalExpr.replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E');
      
      // Handle percentages
      evalExpr = evalExpr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

      // Handle square roots
      evalExpr = evalExpr.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
      
      // Handle powers
      evalExpr = evalExpr.replace(/(\w+)\^/g, 'Math.pow($1,');

      // Handle factorial
      evalExpr = evalExpr.replace(/(\d+)!/g, (match, num) => `factorial(${num})`);

      // Handle trig and log functions
      const functions = ['sin', 'cos', 'tan', 'log', 'ln'];
      functions.forEach(func => {
        const re = new RegExp(`${func}\\(([^)]+)\\)`, 'g');
        let replacement = '';
        switch(func) {
          case 'sin': replacement = `Math.sin(${isDeg ? '($1 * Math.PI / 180)' : '$1'})`; break;
          case 'cos': replacement = `Math.cos(${isDeg ? '($1 * Math.PI / 180)' : '$1'})`; break;
          case 'tan': replacement = `Math.tan(${isDeg ? '($1 * Math.PI / 180)' : '$1'})`; break;
          case 'log': replacement = 'Math.log10($1)'; break;
          case 'ln': replacement = 'Math.log($1)'; break;
        }
        evalExpr = evalExpr.replace(re, replacement);
      });
      
      // Using new Function is safer than direct eval
      const evalFn = new Function('factorial', 'return ' + evalExpr);
      return evalFn(factorial);
    } catch (error) {
      console.error("Evaluation Error:", error, "Expression:", expr);
      return 'Error';
    }
  };

  const handleButtonClick = (value: string) => {
    if (input === 'Error') {
        setInput(value);
    } else {
        setInput((prev) => prev + value);
    }
  };
  
  const handleFunction = (func: string) => {
    if (func === 'AC') {
        setInput('');
        setHistory('');
        return;
    }
    
    if (func === 'C') {
        if (input !== 'Error') {
          setInput(input.slice(0, -1));
        } else {
          setInput('');
        }
        return;
    }

    if (func === '=') {
        if (input && input !== 'Error') {
          const res = safeEval(input);
          setHistory(input + '=');
          setInput(String(res));
        }
        return;
    }
    
    if (func === 'deg' || func === 'rad') {
        setIsDeg(func === 'deg');
        return;
    }

    // Memory functions
    if (func.startsWith('M')) {
      let currentVal = 0;
      if (input && input !== 'Error') {
        try {
          currentVal = Number(safeEval(input)) || 0;
        } catch {
          currentVal = 0;
        }
      }

      switch (func) {
        case 'M+': setMemory(memory + currentVal); break;
        case 'MR': setInput(prev => prev + String(memory)); break;
        case 'MC': setMemory(0); break;
      }
      return;
    }
    
    if (['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√('].includes(func)) {
      handleButtonClick(func);
      return;
    }

    handleButtonClick(func);
  };
  
  const baseButtonClass = "text-sm h-10 w-full rounded-md transition-all duration-200 border-b-4 active:border-b-0 active:translate-y-1 shadow-md hover:shadow-lg";

  const CalcButton = ({ value, display, className, onClick, children }: { value: string, display?: string, className?: string, onClick: (val: string) => void, children?: React.ReactNode }) => (
    <Button
        variant="ghost"
        className={cn(
            baseButtonClass, 
            "bg-foreground/5 border-foreground/10 hover:bg-foreground/10 hover:border-foreground/20 hover:-translate-y-px hover:shadow-primary/30", 
            className
        )}
        onClick={() => onClick(value)}
    >
      {children || display || value}
    </Button>
  );
  
  const OpButton = ({value, display, className, onClick}: { value: string, display?: string, className?: string, onClick: (val: string) => void }) => (
      <CalcButton value={value} display={display} onClick={onClick} className={cn("!bg-primary/10 !text-primary !border-primary/20 hover:!border-primary/40 hover:shadow-primary/40", className)} />
  );
  
  const NumButton = ({value, display, className, onClick}: { value: string, display?: string, className?: string, onClick: (val: string) => void }) => (
      <CalcButton value={value} display={display} onClick={onClick} className={cn("bg-card text-card-foreground border-foreground/20", className)} />
  );


  return (
    <Card className="w-full max-w-xs mx-auto shadow-2xl bg-card/80 backdrop-blur-xl border-border/20 rounded-2xl overflow-hidden font-mono">
      <CardContent className="p-2 space-y-2">
        {/* Display */}
        <div className="bg-muted/30 rounded-md px-2 py-1 text-right h-24 flex flex-col justify-end text-foreground border border-border/20 shadow-inner">
          <div className="h-6 text-sm text-foreground/50 truncate text-right flex items-center justify-between">
            <div className="flex items-center justify-center gap-2 text-xs">
                <Button variant={isDeg ? "secondary" : "ghost"} size="sm" className="h-6 px-2" onClick={() => handleFunction('deg')}>DEG</Button>
                <Button variant={!isDeg ? "secondary" : "ghost"} size="sm" className="h-6 px-2" onClick={() => handleFunction('rad')}>RAD</Button>
            </div>
            <span>{history || ''}</span>
          </div>
          <div className="w-full text-right h-10 text-3xl font-bold truncate">
            {input || '0'}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1">
            <CalcButton value="SHIFT" onClick={() => {}} className='col-span-1 !text-yellow-600 !bg-yellow-400/10' />
            <CalcButton value="ALPHA" onClick={() => {}} className='col-span-1 !text-red-500 !bg-red-400/10' />
            <div className="col-span-3 grid grid-cols-3 grid-rows-3 gap-px bg-foreground/10 p-1 rounded-md h-[70px] w-full">
                <Button size="icon" variant="ghost" className='col-start-2 row-start-1 bg-card rounded-md h-5 w-5 mx-auto'><ChevronUp className='h-4 w-4'/></Button>
                <Button size="icon" variant="ghost" className='col-start-1 row-start-2 bg-card rounded-md h-5 w-5 my-auto'><ChevronLeft className='h-4 w-4'/></Button>
                <Button size="icon" variant="ghost" className='col-start-2 row-start-2 bg-card rounded-md h-5 w-5 my-auto mx-auto' />
                <Button size="icon" variant="ghost" className='col-start-3 row-start-2 bg-card rounded-md h-5 w-5 my-auto'><ChevronRight className='h-4 w-4'/></Button>
                <Button size="icon" variant="ghost" className='col-start-2 row-start-3 bg-card rounded-md h-5 w-5 mx-auto'><ChevronDown className='h-4 w-4'/></Button>
            </div>
        </div>
        
        <div className='grid grid-cols-5 gap-1'>
            <CalcButton value="sin(" display="sin" onClick={handleFunction} />
            <CalcButton value="cos(" display="cos" onClick={handleFunction} />
            <CalcButton value="tan(" display="tan" onClick={handleFunction} />
            <CalcButton value="MC" onClick={handleFunction} className='!text-destructive/80' />
            <CalcButton value="MR" onClick={handleFunction} className='!text-destructive/80' />

            <CalcButton value="**2" display="x²" onClick={handleFunction} />
            <CalcButton value="**" display="xʸ" onClick={handleFunction} />
            <CalcButton value="log(" display="log" onClick={handleFunction} />
            <CalcButton value="ln(" display="ln" onClick={handleFunction} />
            <CalcButton value="M+" onClick={handleFunction} className='!text-destructive/80' />
            
            <CalcButton value="(" onClick={handleButtonClick} />
            <CalcButton value=")" onClick={handleButtonClick} />
            <CalcButton value="√(" display="√" onClick={handleFunction} />
            <CalcButton value="!" onClick={handleButtonClick} />
            <CalcButton value="%" onClick={handleButtonClick} />

        </div>

        <div className="grid grid-cols-5 gap-1">
          <NumButton value="7" onClick={handleButtonClick} />
          <NumButton value="8" onClick={handleButtonClick} />
          <NumButton value="9" onClick={handleButtonClick} />
          <CalcButton value="C" onClick={handleFunction} className="!bg-destructive/20 !text-destructive !border-destructive/30 hover:!bg-destructive/30 hover:shadow-destructive/40" />
          <CalcButton value="AC" onClick={handleFunction} className="!bg-destructive/20 !text-destructive !border-destructive/30 hover:!bg-destructive/30 hover:shadow-destructive/40" />
          
          <NumButton value="4" onClick={handleButtonClick} />
          <NumButton value="5" onClick={handleButtonClick} />
          <NumButton value="6" onClick={handleButtonClick} />
          <OpButton value="×" onClick={handleButtonClick} />
          <OpButton value="÷" onClick={handleButtonClick} />
          
          <NumButton value="1" onClick={handleButtonClick} />
          <NumButton value="2" onClick={handleButtonClick} />
          <NumButton value="3" onClick={handleButtonClick} />
          <OpButton value="+" onClick={handleButtonClick} />
          <OpButton value="−" onClick={handleButtonClick} />

          <NumButton value="0" onClick={handleButtonClick} />
          <NumButton value="." onClick={handleButtonClick} />
          <CalcButton value="π" onClick={handleButtonClick} />
          <CalcButton value="e" onClick={handleButtonClick} />
          <OpButton value="=" onClick={handleFunction} />
        </div>
      </CardContent>
    </Card>
  );
}
