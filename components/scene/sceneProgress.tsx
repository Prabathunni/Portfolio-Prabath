"use client";

import { createContext, useContext, useRef, type MutableRefObject, type ReactNode } from "react";

const SceneProgressContext = createContext<MutableRefObject<number> | null>(null);

export function SceneProgressProvider({ children }: { children: ReactNode }) {
  const progress = useRef(0);
  return (
    <SceneProgressContext.Provider value={progress}>{children}</SceneProgressContext.Provider>
  );
}

// Returns a ref whose .current (0-1) tracks scroll progress through the page.
// Read it inside useFrame - do not use it to drive React state (would re-render every frame).
export function useSceneProgress(): MutableRefObject<number> {
  const ctx = useContext(SceneProgressContext);
  if (!ctx) {
    throw new Error("useSceneProgress must be used within a SceneProgressProvider");
  }
  return ctx;
}
