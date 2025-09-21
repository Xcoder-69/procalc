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
import { Inter } from 'next/font/google';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata = {
  title: 'ProCalc - Your Ultimate All-in-One Calculator Suite',
  description: 'ProCalc is a comprehensive collection of free, accurate, and easy-to-use online calculators for finance, health, mathematics, and more. Your all-in-one suite for daily calculation needs, from BMI and loan EMI to age and percentage calculations.',
  keywords: [
    'calculator',
    'free calculator',
    'online calculator',
    'finance calculator',
    'health calculator',
    'math calculator',
    'conversion calculator',
    'all-in-one calculator',
    'BMI calculator',
    'BMR calculator',
    'loan EMI calculator',
    'SIP calculator',
    'simple interest calculator',
    'percentage calculator',
    'age calculator',
    'unit converter',
    'discount calculator',
    'date difference calculator',
    'ProCalc',
    'professional calculator',
    'calculator suite',
    'daily calculations',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5141258475616427"
          crossOrigin="anonymous"></script>
      </head>
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
