"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

// Fades/slides an element's children in once, when the element crosses 75% of the viewport.
export function useSectionReveal(ref: RefObject<HTMLElement>, itemsSelector = ":scope > *") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(itemsSelector);
    const targets = items.length > 0 ? items : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, itemsSelector]);
}
