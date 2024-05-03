'use client';

import { AuthSession } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';
import { AppProgressBar } from 'next-nprogress-bar';
import { useServerInsertedHTML } from 'next/navigation';
import React, { useState, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function RootProvider({
  children,
  session
}: {
  children: React.ReactNode;
  session: AuthSession;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return (
      <SessionProvider session={session}>
        {children}

        <Suspense fallback={null}>
          <AppProgressBar
            height="2px"
            color="#0096FF"
            options={{ showSpinner: false }}
          />
        </Suspense>
        <Toaster />
      </SessionProvider>
    );
  }
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <SessionProvider session={session}>{children}</SessionProvider>

      <Suspense fallback={null}>
        <AppProgressBar
          height="2px"
          color="#0096FF"
          options={{ showSpinner: false }}
        />
      </Suspense>
      <Toaster />
    </StyleSheetManager>
  );
}
