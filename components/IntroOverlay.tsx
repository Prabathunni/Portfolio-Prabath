"use client";

import { useEffect, useState } from "react";

const REVEAL_DELAY = 700;
const FADE_DURATION = 300;
export const INTRO_DURATION_MS = REVEAL_DELAY + FADE_DURATION;

export default function IntroOverlay({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [overlayMounted, setOverlayMounted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const revealTimer = setTimeout(() => setShowIntro(false), REVEAL_DELAY);
    const unmountTimer = setTimeout(() => {
      setOverlayMounted(false);
      document.body.style.overflow = "";
    }, REVEAL_DELAY + FADE_DURATION);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {overlayMounted && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-bg transition-opacity ease-out ${
            showIntro ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{ transitionDuration: `${FADE_DURATION}ms` }}
        >
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-ink">Prabath P U</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted">
              Software Development Engineer
            </p>
          </div>
        </div>
      )}
      <div
        className={`transition-opacity ease-out ${showIntro ? "opacity-0" : "opacity-100"}`}
        style={{ transitionDuration: `${FADE_DURATION}ms` }}
      >
        {children}
      </div>
    </>
  );
}
