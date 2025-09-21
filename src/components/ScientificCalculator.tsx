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
    
    // Handle percentages
    evalExpr = evalExpr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

    // This is still using new Function, which is safer than eval, but caution is advised.
    // For a production app, a proper math expression parser is recommended.
    return new Function('return ' + evalExpr)();
  } catch (error) {
    return 'Error';
  }
};

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
      case '√':
        setInput((prev) => `Math.sqrt(${prev})`);
        break;
      case 'log':
        setInput((prev) => `Math.log10(${prev})`);
        break;
      case 'ln':
        setInput((prev) => `Math.log(${prev})`);
        break;
      case 'sin':
        setInput((prev) => `Math.sin(${(isDeg ? 'Math.PI/180*' : '') + prev})`);
        break;
      case 'cos':
        setInput((prev) => `Math.cos(${(isDeg ? 'Math.PI/180*' : '') + prev})`);
        break;
      case 'tan':
        setInput((prev) => `Math.tan(${(isDeg ? 'Math.PI/180*' : '') + prev})`);
        break;
      case 'x²':
        setInput((prev) => `Math.pow(${prev}, 2)`);
        break;
      case '^':
        handleButtonClick('**');
        break;
      case 'π':
        handleButtonClick('Math.PI');
        break;
      case 'e':
        handleButtonClick('Math.E');
        break;
      case '!':
        try {
          const num = parseInt(input);
          if (num < 0) {
            setInput('Error');
            return;
          }
          let result = 1;
          for (let i = 2; i <= num; i++) {
            result *= i;
          }
          setInput(String(result));
        } catch {
          setInput('Error');
        }
        break;
      case 'deg':
        setIsDeg(true);
        break;
      case 'rad':
        setIsDeg(false);
        break;
      default:
        break;
    }
  };
  
  const baseButtonClass = "text-xl h-16 w-16 rounded-2xl transition-all duration-200 border-white/10";

  const CalcButton = ({ value, display, className, onClick }: { value: string, display?: string, className?: string, onClick: (val: string) => void }) => (
    <Button
        variant="ghost"
        className={cn(baseButtonClass, 'backdrop-blur-sm', className)}
        onClick={() => onClick(value)}
    >
      {display || value}
    </Button>
  );

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl">
      <CardContent className="p-4 space-y-4">
        {/* Display */}
        <div className="bg-transparent rounded-md p-4 text-right h-32 flex flex-col justify-end text-white">
          <div className="h-8 text-lg text-white/70 truncate">{history || '0'}</div>
          <div className="w-full text-right h-12 text-5xl font-bold truncate">
            {input || '0'}
          </div>
        </div>
        
        <Tabs defaultValue="scientific" className='w-full'>
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
            <TabsTrigger value="scientific">Scientific</TabsTrigger>
            <TabsTrigger value="simple">Simple</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scientific" className='mt-4'>
            <div className="grid grid-cols-5 gap-2">
                <CalcButton value={isDeg ? 'rad' : 'deg'} display={isDeg ? 'RAD' : 'DEG'} onClick={() => setIsDeg(!isDeg)} className="text-xs bg-white/10"/>
                <CalcButton value="sin" onClick={handleFunction} className='bg-white/10'/>
                <CalcButton value="cos" onClick={handleFunction} className='bg-white/10'/>
                <CalcButton value="tan" onClick={handleFunction} className='bg-white/10'/>
                <CalcButton value="x²" display="x²" onClick={handleFunction} className='bg-white/10'/>

                <CalcButton value="log" onClick={handleFunction} className='bg-white/10'/>
                <CalcButton value="ln" onClick={handleFunction} className='bg-white/10'/>
                <CalcButton value="(" onClick={handleButtonClick} className='bg-white/10'/>
                <CalcButton value=")" onClick={handleButtonClick} className='bg-white/10'/>
                <CalcButton value="^" display="xʸ" onClick={handleFunction} className='bg-white/10'/>
                
                <CalcButton value="√" onClick={handleFunction} className='bg-white/10'/>
                <CalcButton value="AC" onClick={handleFunction} className="bg-red-500/50 text-red-100 hover:bg-red-500/60" />
                <CalcButton value="C" onClick={handleFunction} className="bg-red-500/50 text-red-100 hover:bg-red-500/60" />
                <CalcButton value="%" onClick={handleButtonClick} className="text-primary bg-primary/20 hover:bg-primary/30"/>
                <CalcButton value="÷" onClick={handleButtonClick} className="text-primary bg-primary/20 hover:bg-primary/30"/>

                <CalcButton value="π" onClick={handleFunction} className='bg-white/10'/>
                <CalcButton value="7" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
                <CalcButton value="8" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
                <CalcButton value="9" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
                <CalcButton value="×" onClick={handleButtonClick} className="text-primary bg-primary/20 hover:bg-primary/30"/>

                <CalcButton value="e" onClick={handleFunction} className='bg-white/10'/>
                <CalcButton value="4" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
                <CalcButton value="5" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
                <CalcButton value="6" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
                <CalcButton value="−" onClick={handleButtonClick} className="text-primary bg-primary/20 hover:bg-primary/30"/>

                <CalcButton value="!" onClick={handleFunction} className='bg-white/10'/>
                <CalcButton value="1" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
                <CalcButton value="2" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
                <CalcButton value="3" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
                <CalcButton value="+" onClick={handleButtonClick} className="text-primary bg-primary/20 hover:bg-primary/30"/>

                <div className="col-span-2">
                    <Button variant='ghost' className={cn(baseButtonClass, 'w-full bg-white/5 hover:bg-white/10')} onClick={() => handleButtonClick('0')}>0</Button>
                </div>
                <CalcButton value="." onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
                <div className="col-span-2">
                    <Button variant='default' className={cn(baseButtonClass, 'w-full')} onClick={() => handleFunction('=')}>=</Button>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="simple" className='mt-4'>
             <div className="grid grid-cols-4 gap-2">
              <div className='col-span-2'>
                <Button variant='ghost' onClick={() => handleFunction('AC')} className={cn(baseButtonClass, "w-full bg-red-500/50 text-red-100 hover:bg-red-500/60")}>AC</Button>
              </div>
              <CalcButton value="C" onClick={handleFunction} className="bg-red-500/50 text-red-100 hover:bg-red-500/60"/>
              <CalcButton value="÷" onClick={handleButtonClick} className="text-primary bg-primary/20 hover:bg-primary/30"/>
              
              <CalcButton value="7" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
              <CalcButton value="8" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
              <CalcButton value="9" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
              <CalcButton value="×" onClick={handleButtonClick} className="text-primary bg-primary/20 hover:bg-primary/30"/>
              
              <CalcButton value="4" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
              <CalcButton value="5" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
              <CalcButton value="6" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
              <CalcButton value="−" onClick={handleButtonClick} className="text-primary bg-primary/20 hover:bg-primary/30"/>
              
              <CalcButton value="1" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
              <CalcButton value="2" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
              <CalcButton value="3" onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
              <CalcButton value="+" onClick={handleButtonClick} className="text-primary bg-primary/20 hover:bg-primary/30"/>

              <div className="col-span-2">
                <Button variant='ghost' onClick={() => handleButtonClick('0')} className={cn(baseButtonClass, 'w-full bg-white/5 hover:bg-white/10')}>0</Button>
              </div>
              <CalcButton value="." onClick={handleButtonClick} className='bg-white/5 hover:bg-white/10' />
              <Button variant='default' onClick={() => handleFunction('=')} className={cn(baseButtonClass)}> =</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
