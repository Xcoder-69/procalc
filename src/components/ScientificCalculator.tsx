'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Helper for safe evaluation
const safeEval = (expr: string) => {
  try {
    // Replace user-friendly symbols with JS equivalents
    let evalExpr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
    
    // Handle percentages by evaluating them in the expression
    // This regex finds a number followed by '%' and converts it to '*(1/100)'
    evalExpr = evalExpr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

    // Using new Function is safer than eval, but for a production app, a dedicated math expression parser is recommended.
    return new Function('return ' + evalExpr)();
  } catch (error) {
    console.error("Evaluation Error:", error);
    return 'Error';
  }
};

const factorial = (n: number): number => {
    if (n < 0 || n % 1 !== 0) return NaN; // Factorial is only for non-negative integers
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

  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };
  
  const handleFunction = (func: string) => {
    switch (func) {
      case 'AC':
        setInput('');
        setHistory('');
        break;
      case 'C':
        setInput(input.slice(0, -1));
        break;
      case '=':
        if (input) {
          const res = safeEval(input);
          setHistory(input + '=');
          setInput(String(res));
        }
        break;
      case 'deg':
        setIsDeg(true);
        break;
      case 'rad':
        setIsDeg(false);
        break;
      case '^':
        handleButtonClick('**');
        break;
      default:
        // For functions that operate on the current input
        if (input) {
            try {
                const currentVal = parseFloat(safeEval(input));
                if (isNaN(currentVal)) {
                    setInput('Error');
                    return;
                }

                let result;
                let funcName = func;

                switch (func) {
                    case '√':
                        result = Math.sqrt(currentVal);
                        funcName = 'sqrt';
                        break;
                    case 'log':
                        result = Math.log10(currentVal);
                        break;
                    case 'ln':
                        result = Math.log(currentVal);
                        break;
                    case 'sin':
                        result = Math.sin(isDeg ? currentVal * (Math.PI / 180) : currentVal);
                        break;
                    case 'cos':
                        result = Math.cos(isDeg ? currentVal * (Math.PI / 180) : currentVal);
                        break;
                    case 'tan':
                        result = Math.tan(isDeg ? currentVal * (Math.PI / 180) : currentVal);
                        break;
                    case 'x²':
                        result = Math.pow(currentVal, 2);
                        funcName = 'sqr';
                        break;
                    case '!':
                        result = factorial(currentVal);
                        funcName = 'fact';
                        break;
                    case 'π':
                        result = Math.PI;
                        break;
                    case 'e':
                        result = Math.E;
                        break;
                    default:
                        handleButtonClick(func);
                        return;
                }

                if (result !== undefined && !isNaN(result)) {
                  if (func === 'π' || func === 'e') {
                     setInput(String(result));
                     setHistory(func);
                  } else {
                    setHistory(`${funcName}(${input})`);
                    setInput(String(result));
                  }
                } else {
                    setInput('Error');
                }
            } catch (e) {
                setInput('Error');
            }
        } else if (func === 'π' || func === 'e') {
            // Handle PI or E when input is empty
            handleButtonClick(`Math.${func.toUpperCase()}`);
        }
        break;
    }
  };
  
  const baseButtonClass = "text-xl h-16 w-full rounded-2xl transition-all duration-200 shadow-inner-white-sm border border-transparent bg-white/10 dark:bg-white/10 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg";

  const CalcButton = ({ value, display, className, onClick }: { value: string, display?: string, className?: string, onClick: (val: string) => void }) => (
    <Button
        variant="ghost"
        className={cn(baseButtonClass, className)}
        onClick={() => onClick(value)}
    >
      {display || value}
    </Button>
  );

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl bg-card/50 backdrop-blur-xl border-white/10 rounded-2xl overflow-hidden">
      <CardContent className="p-4 space-y-4">
        {/* Display */}
        <div className="bg-transparent rounded-md px-4 py-2 text-right h-32 flex flex-col justify-end text-foreground font-mono">
          <div className="h-8 text-2xl text-foreground/50 truncate text-right">{history || '0'}</div>
          <div className="w-full text-right h-16 text-6xl font-bold truncate">
            {input || '0'}
          </div>
        </div>
        
        <Tabs defaultValue="simple" className='w-full'>
          <TabsList className="grid w-full grid-cols-2 bg-foreground/10 dark:bg-black/20 border-white/10 h-14">
            <TabsTrigger value="scientific" className='text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40'>Scientific</TabsTrigger>
            <TabsTrigger value="simple" className='text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40'>Simple</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scientific" className='mt-4'>
            <div className="grid grid-cols-5 gap-2">
                <CalcButton value={isDeg ? 'rad' : 'deg'} display={isDeg ? 'RAD' : 'DEG'} onClick={() => setIsDeg(!isDeg)} className="text-sm text-primary/80 hover:shadow-primary/30" />
                <CalcButton value="sin" onClick={handleFunction} className='text-primary/80 hover:shadow-primary/30'/>
                <CalcButton value="cos" onClick={handleFunction} className='text-primary/80 hover:shadow-primary/30'/>
                <CalcButton value="tan" onClick={handleFunction} className='text-primary/80 hover:shadow-primary/30'/>
                <CalcButton value="x²" display="x²" onClick={handleFunction} className='text-primary/80 hover:shadow-primary/30'/>

                <CalcButton value="log" onClick={handleFunction} className='text-primary/80 hover:shadow-primary/30'/>
                <CalcButton value="ln" onClick={handleFunction} className='text-primary/80 hover:shadow-primary/30'/>
                <CalcButton value="(" onClick={handleButtonClick} className='text-primary/80 hover:shadow-primary/30'/>
                <CalcButton value=")" onClick={handleButtonClick} className='text-primary/80 hover:shadow-primary/30'/>
                <CalcButton value="^" display="xʸ" onClick={handleFunction} className='text-primary/80 hover:shadow-primary/30'/>
                
                <CalcButton value="√" onClick={handleFunction} className='text-primary/80 hover:shadow-primary/30'/>
                <CalcButton value="AC" onClick={handleFunction} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:shadow-red-500/30" />
                <CalcButton value="C" onClick={handleFunction} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:shadow-red-500/30" />
                <CalcButton value="%" onClick={handleButtonClick} className="text-primary hover:shadow-primary/30"/>
                <CalcButton value="÷" onClick={handleButtonClick} className="text-primary hover:shadow-primary/30"/>

                <CalcButton value="π" onClick={handleFunction} className='text-primary/80 hover:shadow-primary/30'/>
                <CalcButton value="7" onClick={handleButtonClick} className='hover:shadow-foreground/30' />
                <CalcButton value="8" onClick={handleButtonClick} className='hover:shadow-foreground/30' />
                <CalcButton value="9" onClick={handleButtonClick} className='hover:shadow-foreground/30' />
                <CalcButton value="×" onClick={handleButtonClick} className="text-primary hover:shadow-primary/30"/>

                <CalcButton value="e" onClick={handleFunction} className='text-primary/80 hover:shadow-primary/30'/>
                <CalcButton value="4" onClick={handleButtonClick} className='hover:shadow-foreground/30' />
                <CalcButton value="5" onClick={handleButtonClick} className='hover:shadow-foreground/30' />
                <CalcButton value="6" onClick={handleButtonClick} className='hover:shadow-foreground/30' />
                <CalcButton value="−" onClick={handleButtonClick} className="text-primary hover:shadow-primary/30"/>

                <CalcButton value="!" onClick={handleFunction} className='text-primary/80 hover:shadow-primary/30'/>
                <CalcButton value="1" onClick={handleButtonClick} className='hover:shadow-foreground/30' />
                <CalcButton value="2" onClick={handleButtonClick} className='hover:shadow-foreground/30' />
                <CalcButton value="3" onClick={handleButtonClick} className='hover:shadow-foreground/30' />
                <CalcButton value="+" onClick={handleButtonClick} className="text-primary hover:shadow-primary/30"/>

                <div className="col-span-2">
                    <Button variant='ghost' className={cn(baseButtonClass, 'w-full hover:shadow-foreground/30')} onClick={() => handleButtonClick('0')}>0</Button>
                </div>
                <CalcButton value="." onClick={handleButtonClick} className='hover:shadow-foreground/30'/>
                <div className="col-span-2">
                    <Button variant='default' className={cn(baseButtonClass, 'w-full text-2xl bg-primary hover:bg-primary/90 hover:shadow-primary/40 text-primary-foreground')} onClick={() => handleFunction('=')}>=</Button>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="simple" className='mt-4'>
             <div className="grid grid-cols-4 gap-2">
              <CalcButton value="AC" onClick={handleFunction} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:shadow-red-500/30" />
              <CalcButton value="C" onClick={handleFunction} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:shadow-red-500/30" />
              <CalcButton value="%" onClick={handleButtonClick} className="text-primary hover:shadow-primary/30"/>
              <CalcButton value="÷" onClick={handleButtonClick} className="text-primary hover:shadow-primary/30"/>
              
              <CalcButton value="7" onClick={handleButtonClick} className='hover:shadow-foreground/30'/>
              <CalcButton value="8" onClick={handleButtonClick} className='hover:shadow-foreground/30'/>
              <CalcButton value="9" onClick={handleButtonClick} className='hover:shadow-foreground/30'/>
              <CalcButton value="×" onClick={handleButtonClick} className="text-primary hover:shadow-primary/30"/>
              
              <CalcButton value="4" onClick={handleButtonClick} className='hover:shadow-foreground/30'/>
              <CalcButton value="5" onClick={handleButtonClick} className='hover:shadow-foreground/30'/>
              <CalcButton value="6" onClick={handleButtonClick} className='hover:shadow-foreground/30'/>
              <CalcButton value="−" onClick={handleButtonClick} className="text-primary hover:shadow-primary/30"/>
              
              <CalcButton value="1" onClick={handleButtonClick} className='hover:shadow-foreground/30'/>
              <CalcButton value="2" onClick={handleButtonClick} className='hover:shadow-foreground/30'/>
              <CalcButton value="3" onClick={handleButtonClick} className='hover:shadow-foreground/30'/>
              <CalcButton value="+" onClick={handleButtonClick} className="text-primary hover:shadow-primary/30"/>

              <div className="col-span-2">
                <Button variant='ghost' onClick={() => handleButtonClick('0')} className={cn(baseButtonClass, 'w-full hover:shadow-foreground/30')}>0</Button>
              </div>
              <CalcButton value="." onClick={handleButtonClick} className='hover:shadow-foreground/30'/>
              <Button variant='default' onClick={() => handleFunction('=')} className={cn(baseButtonClass, "text-2xl bg-primary hover:bg-primary/90 hover:shadow-primary/40 text-primary-foreground")}> =</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
