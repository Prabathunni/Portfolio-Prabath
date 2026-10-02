"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const FILLED = "100% 70%";
const START_DELAY = 0.3;
const GAP = 0.12;

// Draws each <mark> inside the element left to right, like a highlighter, once it scrolls into view.
// Marks are always drawn one at a time in document order (first paragraph to last), each waiting
// for the previous one to finish and for itself to be in view. The highlight stays afterwards.
export function useMarkerHighlight(ref: RefObject<HTMLElement>, selector = "mark") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const marks = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (marks.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(marks, { backgroundSize: FILLED });
      return () => {
        gsap.set(marks, { clearProps: "backgroundSize" });
      };
    }

    const entered = marks.map(() => false);
    const tweens: gsap.core.Tween[] = [];
    let next = 0;
    let drawing = false;

    const drawNext = () => {
      if (drawing || next >= marks.length || !entered[next]) return;

      const mark = marks[next];
      // Longer phrases get a longer stroke so the marker moves at a similar pace.
      const length = mark.textContent?.length ?? 0;
      drawing = true;
      tweens.push(
        gsap.to(mark, {
          backgroundSize: FILLED,
          duration: Math.max(0.4, length * 0.03),
          ease: "power1.inOut",
          delay: next === 0 ? START_DELAY + GAP : GAP,
          onComplete: () => {
            drawing = false;
            next += 1;
            drawNext();
          },
        })
      );
    };

    const triggers = marks.map((mark, i) =>
      ScrollTrigger.create({
        trigger: mark,
        start: "top 80%",
        once: true,
        onEnter: () => {
          entered[i] = true;
          drawNext();
        },
      })
    );

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      tweens.forEach((tween) => tween.kill());
      gsap.set(marks, { clearProps: "backgroundSize" });
    };
  }, [ref, selector]);
}
