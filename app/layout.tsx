import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Shell } from '@/components/layout/Shell';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SIF Precursor Detection Engine | Oil India Limited',
  description:
    'AI-powered HSE insights and SIF precursor detection from Unsafe Acts (UA), Unsafe Conditions (UC), and Near Miss reports. Smart India Hackathon 2026.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Shell>{children}</Shell>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}