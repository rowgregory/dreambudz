import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PageWrapper from './page-wrapper';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dream Budz',
  description: 'Innovative Cannabis Experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense
          fallback={
            <div className="min-h-screen w-full bg-zinc-950 flex justify-center pt-36"></div>
          }
        >
          <PageWrapper>{children}</PageWrapper>
        </Suspense>
      </body>
    </html>
  );
}
