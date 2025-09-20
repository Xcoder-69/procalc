import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Phone, User } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 text-primary">Contact Us</h1>
        <p className="text-center text-lg text-muted-foreground mb-12">
          We'd love to hear from you. Whether you have a question, feedback, or a suggestion, please get in touch.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Your feedback is valuable to us.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-semibold">Owner: Mayur Suryavanshi</p>
                    <p className="text-sm text-muted-foreground">Owner & Founder — ProCalc</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-accent" />
                  <p>+91 9879219525</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-accent" />
                  <p>craze777@gmail.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
