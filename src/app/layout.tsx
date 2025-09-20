import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { AIChat } from '@/components/AIChat';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { Poppins } from 'next/font/google';


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'ProCalc - Your Suite of Professional Calculators',
  description: 'A comprehensive collection of calculators for finance, health, mathematics, and more. All-in-one suite for your daily calculation needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <AIChat>
              <Button
                className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg hover:scale-110 active:scale-100 transition-transform duration-200"
                aria-label="Open AI Chat"
              >
                <Bot className="h-8 w-8" />
              </Button>
            </AIChat>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
