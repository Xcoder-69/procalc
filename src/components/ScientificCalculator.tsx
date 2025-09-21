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
  
  const baseButtonClass = "text-xl h-16 rounded-2xl transition-all duration-200 flex-1";

  const CalcButton = ({ value, display, className, onClick, variant = 'secondary' }: { value: string, display?: string, className?: string, onClick: (val: string) => void, variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | null | undefined }) => (
    <Button
        variant={variant}
        className={cn(baseButtonClass, className)}
        onClick={() => onClick(value)}
    >
      {display || value}
    </Button>
  );

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl bg-card border rounded-2xl">
      <CardContent className="p-4 space-y-4">
        {/* Display */}
        <div className="bg-muted/30 rounded-md p-4 text-right h-32 flex flex-col justify-end">
          <div className="h-8 text-lg text-muted-foreground truncate">{history}</div>
          <div className="w-full text-right h-12 text-5xl font-bold truncate">
            {input || '0'}
          </div>
        </div>
        
        <Tabs defaultValue="scientific" className='w-full'>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scientific">Scientific</TabsTrigger>
            <TabsTrigger value="simple">Simple</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scientific" className='mt-4'>
            <div className="grid grid-cols-5 gap-2">
                <CalcButton value={isDeg ? 'rad' : 'deg'} display={isDeg ? 'RAD' : 'DEG'} onClick={() => setIsDeg(!isDeg)} className="text-xs"/>
                <CalcButton value="sin" onClick={handleFunction} />
                <CalcButton value="cos" onClick={handleFunction} />
                <CalcButton value="tan" onClick={handleFunction} />
                <CalcButton value="x²" display="x²" onClick={handleFunction} />

                <CalcButton value="log" onClick={handleFunction} />
                <CalcButton value="ln" onClick={handleFunction} />
                <CalcButton value="(" onClick={handleButtonClick} />
                <CalcButton value=")" onClick={handleButtonClick} />
                <CalcButton value="^" display="xʸ" onClick={handleFunction} />
                
                <CalcButton value="√" onClick={handleFunction} />
                <CalcButton value="AC" onClick={handleFunction} variant="destructive" />
                <CalcButton value="C" onClick={handleFunction} variant="destructive" />
                <CalcButton value="%" onClick={handleButtonClick} className="text-primary"/>
                <CalcButton value="÷" onClick={handleButtonClick} className="text-primary"/>

                <CalcButton value="π" onClick={handleFunction} />
                <CalcButton value="7" onClick={handleButtonClick} variant="outline" />
                <CalcButton value="8" onClick={handleButtonClick} variant="outline" />
                <CalcButton value="9" onClick={handleButtonClick} variant="outline" />
                <CalcButton value="×" onClick={handleButtonClick} className="text-primary"/>

                <CalcButton value="e" onClick={handleFunction} />
                <CalcButton value="4" onClick={handleButtonClick} variant="outline" />
                <CalcButton value="5" onClick={handleButtonClick} variant="outline" />
                <CalcButton value="6" onClick={handleButtonClick} variant="outline" />
                <CalcButton value="−" onClick={handleButtonClick} className="text-primary"/>

                <CalcButton value="!" onClick={handleFunction} />
                <CalcButton value="1" onClick={handleButtonClick} variant="outline" />
                <CalcButton value="2" onClick={handleButtonClick} variant="outline" />
                <CalcButton value="3" onClick={handleButtonClick} variant="outline" />
                <CalcButton value="+" onClick={handleButtonClick} className="text-primary"/>

                <div className="col-span-2">
                    <CalcButton value="0" onClick={handleButtonClick} variant="outline" className='w-full'/>
                </div>
                <CalcButton value="." onClick={handleButtonClick} variant="outline" />
                <div className="col-span-2">
                    <CalcButton value="=" onClick={handleFunction} variant="default" className='w-full' />
                </div>
            </div>
          </TabsContent>

          <TabsContent value="simple" className='mt-4'>
            <div className="grid grid-cols-4 gap-2">
              <CalcButton value="AC" onClick={handleFunction} variant="destructive" className="col-span-2 w-full"/>
              <CalcButton value="C" onClick={handleFunction} variant="destructive" />
              <CalcButton value="÷" onClick={handleButtonClick} className="text-primary"/>
              
              <CalcButton value="7" onClick={handleButtonClick} variant="outline" />
              <CalcButton value="8" onClick={handleButtonClick} variant="outline" />
              <CalcButton value="9" onClick={handleButtonClick} variant="outline" />
              <CalcButton value="×" onClick={handleButtonClick} className="text-primary"/>
              
              <CalcButton value="4" onClick={handleButtonClick} variant="outline" />
              <CalcButton value="5" onClick={handleButtonClick} variant="outline" />
              <CalcButton value="6" onClick={handleButtonClick} variant="outline" />
              <CalcButton value="−" onClick={handleButtonClick} className="text-primary"/>
              
              <CalcButton value="1" onClick={handleButtonClick} variant="outline" />
              <CalcButton value="2" onClick={handleButtonClick} variant="outline" />
              <CalcButton value="3" onClick={handleButtonClick} variant="outline" />
              <CalcButton value="+" onClick={handleButtonClick} className="text-primary"/>

              <CalcButton value="0" onClick={handleButtonClick} variant="outline" className="col-span-2 w-full"/>
              <CalcButton value="." onClick={handleButtonClick} variant="outline" />
              <CalcButton value="=" onClick={handleFunction} variant="default" />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
