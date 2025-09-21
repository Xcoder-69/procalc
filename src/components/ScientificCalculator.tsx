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
      
      evalExpr = evalExpr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
      evalExpr = evalExpr.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
      evalExpr = evalExpr.replace(/(\d+)!/g, (match, num) => `factorial(${num})`);

      const trigFunctions = ['sin', 'cos', 'tan'];
      trigFunctions.forEach(func => {
        const re = new RegExp(`${func}\\(([^)]+)\\)`, 'g');
        evalExpr = evalExpr.replace(re, (match, angle) => {
          const angleValue = safeEval(angle);
          if (isDeg) {
            return `Math.${func}(${angleValue} * Math.PI / 180)`;
          }
          return `Math.${func}(${angleValue})`;
        });
      });

      const logFunctions = {
          'log': 'Math.log10',
          'ln': 'Math.log'
      };

      Object.entries(logFunctions).forEach(([func, mathFunc]) => {
          const re = new RegExp(`${func}\\(([^)]+)\\)`, 'g');
          evalExpr = evalExpr.replace(re, (match, value) => `${mathFunc}(${safeEval(value)})`);
      });
      
      const evalFn = new Function('factorial', 'return ' + evalExpr);
      const result = evalFn(factorial);

      if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
        return 'Error';
      }
      // Round to a reasonable precision to avoid floating point inaccuracies
      return parseFloat(result.toPrecision(15));
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

    if (func === 'x²') {
        handleButtonClick('**2');
        return;
    }

    if (func === 'xʸ') {
        handleButtonClick('**');
        return;
    }
    
    if (func === 'OK') {
        handleFunction('=');
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
    <Card className="w-full max-w-sm mx-auto shadow-2xl bg-card/80 backdrop-blur-xl border-border/20 rounded-2xl overflow-hidden font-mono">
      <CardContent className="p-2 space-y-2">
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
            <CalcButton value="SHIFT" onClick={() => {}} className='col-span-1 !text-yellow-600 !bg-yellow-400/10 hover:shadow-yellow-500/30' />
            <CalcButton value="ALPHA" onClick={() => {}} className='col-span-1 !text-red-500 !bg-red-400/10 hover:shadow-red-500/30' />
             <div className="col-span-3 grid grid-cols-3 grid-rows-3 gap-px bg-foreground/10 p-1 rounded-md h-[70px] w-full">
                <div />
                <Button size="icon" variant="ghost" className='col-start-2 row-start-1 bg-card rounded-sm h-5 w-5 mx-auto my-auto'><ChevronUp className='h-4 w-4'/></Button>
                <div />
                <Button size="icon" variant="ghost" className='col-start-1 row-start-2 bg-card rounded-sm h-5 w-5 my-auto mx-auto'><ChevronLeft className='h-4 w-4'/></Button>
                <CalcButton value="OK" onClick={handleFunction} className='col-start-2 row-start-2 h-6 w-6 !rounded-full mx-auto my-auto !p-0' />
                <Button size="icon" variant="ghost" className='col-start-3 row-start-2 bg-card rounded-sm h-5 w-5 my-auto mx-auto'><ChevronRight className='h-4 w-4'/></Button>
                <div />
                <Button size="icon" variant="ghost" className='col-start-2 row-start-3 bg-card rounded-sm h-5 w-5 mx-auto my-auto'><ChevronDown className='h-4 w-4'/></Button>
                <div />
            </div>
        </div>
        
        <div className='grid grid-cols-5 gap-1'>
            <CalcButton value="sin(" display="sin" onClick={handleFunction} />
            <CalcButton value="cos(" display="cos" onClick={handleFunction} />
            <CalcButton value="tan(" display="tan" onClick={handleFunction} />
            <CalcButton value="MC" onClick={handleFunction} className='!text-destructive/80' />
            <CalcButton value="MR" onClick={handleFunction} className='!text-destructive/80' />

            <CalcButton value="x²" onClick={handleFunction} />
            <CalcButton value="xʸ" onClick={handleFunction} />
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
          <CalcButton value="C" onClick={handleFunction} className="!bg-amber-500/20 !text-amber-500 !border-amber-500/30 hover:!bg-amber-500/30 hover:shadow-amber-500/40" />
          <CalcButton value="AC" onClick={handleFunction} className="!bg-amber-500/30 !text-amber-500 !border-amber-500/40 hover:!bg-amber-500/40 hover:shadow-amber-500/50" />
          
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
