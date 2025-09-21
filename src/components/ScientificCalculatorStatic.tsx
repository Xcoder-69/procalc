import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const baseButtonClass = "text-xl h-16 w-full rounded-2xl transition-all duration-200 shadow-inner-white-sm border border-transparent bg-white/10 dark:bg-white/10 backdrop-blur-sm";

const CalcButton = ({ display, className }: { display?: string, className?: string }) => (
    <div className={cn(baseButtonClass, 'flex items-center justify-center', className)}>
      {display}
    </div>
);

export default function ScientificCalculatorStatic() {
  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl bg-card/50 backdrop-blur-xl border-white/10 rounded-2xl overflow-hidden">
      <CardContent className="p-4 space-y-4">
        {/* Display */}
        <div className="bg-transparent rounded-md px-4 py-2 text-right h-32 flex flex-col justify-end text-foreground font-mono">
          <div className="h-8 text-2xl text-foreground/50 truncate text-right">0</div>
          <div className="w-full text-right h-16 text-6xl font-bold truncate">
            0
          </div>
        </div>
        
        <Tabs defaultValue="simple" className='w-full'>
          <TabsList className="grid w-full grid-cols-2 bg-foreground/10 dark:bg-black/20 border-white/10 h-14">
            <TabsTrigger value="scientific" className='text-base' disabled>Scientific</TabsTrigger>
            <TabsTrigger value="simple" className='text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40'>Simple</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simple" className='mt-4'>
             <div className="grid grid-cols-4 gap-2">
              <div className='col-span-2'>
                <div className={cn(baseButtonClass, "w-full flex items-center justify-center bg-red-500/20 text-red-400")}>AC</div>
              </div>
              <CalcButton display="C" className="bg-red-500/20 text-red-400" />
              <CalcButton display="÷" className="text-primary" />
              
              <CalcButton display="7" />
              <CalcButton display="8" />
              <CalcButton display="9" />
              <CalcButton display="×" className="text-primary" />
              
              <CalcButton display="4" />
              <CalcButton display="5" />
              <CalcButton display="6" />
              <CalcButton display="−" className="text-primary" />
              
              <CalcButton display="1" />
              <CalcButton display="2" />
              <CalcButton display="3" />
              <CalcButton display="+" className="text-primary" />

              <div className="col-span-2">
                <div className={cn(baseButtonClass, 'w-full flex items-center justify-center')}>0</div>
              </div>
              <CalcButton display="." />
              <div className={cn(baseButtonClass, "text-2xl flex items-center justify-center bg-primary text-primary-foreground")}> =</div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
