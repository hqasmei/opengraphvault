import '../styles/globals.css';

import type { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font';

import { ContextProvider } from './context-provider';
import { Header } from './header';

export const metadata: Metadata = {
  title: 'Open Graph Vault',
  description: 'All open graph images related',
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
        {/* OG Tags */}
        <meta property="og:url" content="https://opengraphvault.com" />
        <meta property="og:image" content="./opengraph-image.png" />
        <meta property="og:image:type" content="png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:title" content="Open Graph Vault" />
        <meta
          property="og:description"
          content="Where open graph images live."
        />

        {/* Twitter Tags */}

        <meta property="twitter:url" content="https://opengraphvault.com" />
        <meta name="twitter:image" content="./twitter-image.png" />
        <meta property="twitter:image:type" content="png" />
        <meta property="twitter:image:width" content="1200" />
        <meta property="twitter:image:height" content="630" />
        <meta property="twitter:title" content="Open Graph Vault" />
        <meta
          property="twitter:description"
          content="Where open graph images live."
        />
        <meta property="twitter:card" content="summary_large_image" />
      </head>
      <body className={GeistSans.className}>
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col gap-12 items-center">
            <ContextProvider>
              <Header />
              {children}
              <Analytics />
            </ContextProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
