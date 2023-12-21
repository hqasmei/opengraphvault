'use client';

import StyledComponentsRegistry from '@/lib/antd-registry';

import { ThemeProvider } from './theme-provider';

export function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
