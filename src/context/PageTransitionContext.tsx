"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface PageTransitionContextProps {
  animReady: boolean;
  setAnimReady: (ready: boolean) => void;
}

const PageTransitionContext = createContext<PageTransitionContextProps | null>(null);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [animReady, setAnimReady] = useState(true);
  return (
    <PageTransitionContext.Provider value={{ animReady, setAnimReady }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used inside PageTransitionProvider");
  return ctx;
}
