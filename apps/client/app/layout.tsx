import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Providers } from './providers';
import { Header } from '@/components/layout/header/header';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/error-boundary/error-boundary';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gachdong.club'),
  title: {
    default: 'GACHDONG',
    template: '%s | GACHDONG',
  },
  description: '가츠동',
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    url: 'https://gachdong.club',
    title: 'GACHDONG',
    description: '가츠동',
    locale: 'ko-KR',
    type: 'website',
    siteName: 'GACHDONG',
    images: [
      {
        url: '/text-logo.svg',
        width: 100,
        height: 30,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground h-screen`}>
        <Providers>
          <ErrorBoundary>
            <Suspense>
              <Header />
              <main className="min-h-screen min-w-[350px]">{children}</main>
              <Toaster />
            </Suspense>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
