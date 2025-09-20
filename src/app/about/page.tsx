import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-8 text-primary">About ProCalc</h1>
      
      <div className="max-w-4xl mx-auto space-y-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground space-y-4">
            <p>
              At ProCalc, our mission is to provide a comprehensive, reliable, and user-friendly suite of calculators for professionals, students, and anyone in need of quick, accurate calculations. We believe that access to powerful tools shouldn't be complicated.
            </p>
            <p>
              Whether you are managing your finances, tracking your health, or solving complex mathematical problems, our goal is to be your go-to resource, empowering you to make informed decisions with confidence.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Meet the Founder</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src="https://picsum.photos/seed/mayur/200/200" alt="Mayur Suryavanshi" data-ai-hint="male portrait" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-semibold">Mayur Suryavanshi</h3>
              <p className="text-accent font-medium">Owner & Founder — All-in-One Calculator</p>
              <div className="flex items-center justify-center sm:justify-start pt-2 gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 9879219525</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>craze777@gmail.com</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
