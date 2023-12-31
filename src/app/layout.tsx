import '../styles/globals.css';

import type { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font';

import { ContextProvider } from './context-provider';
import { Header } from './header';

export const metadata: Metadata = {
  metadataBase: new URL('https://opengraphvault.com/'),
  title: 'Open Graph Vault',
  description: 'All open graph images related',
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    images: '/opengraph-image.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />

        {/* App icons */}
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={GeistSans.className}>
        <main className="min-h-screen flex flex-col items-center">
          <ContextProvider>
            <Header />
            {children}
            <Analytics />
            <SpeedInsights />
          </ContextProvider>
        </main>
      </body>
    </html>
  );
}
