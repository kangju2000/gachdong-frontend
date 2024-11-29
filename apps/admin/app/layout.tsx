import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/error-boundary/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import '@uiw/react-md-editor/markdown-editor.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://admin.gachdong.club'),
  title: {
    default: 'GACHDONG 어드민',
    template: '%s | GACHDONG 어드민',
  },
  description: '가츠동 관리자 페이지',
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    url: 'https://admin.gachdong.club',
    title: 'GACHDONG 어드민',
    description: '가츠동 관리자 페이지',
    locale: 'ko-KR',
    type: 'website',
    siteName: 'GACHDONG 어드민',
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
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        <Providers>
          <ErrorBoundary>
            <Suspense>
              <ErrorBoundary>{children}</ErrorBoundary>
              <Toaster />
            </Suspense>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
