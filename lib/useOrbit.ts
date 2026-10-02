"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

const ITEM = "[data-orbit-item]";
const RING = "[data-orbit-ring]";

// Turns every [data-orbit-ring] inside the stage, counter-rotating its [data-orbit-item]s so icons stay
// upright. A ring eases to a stop while one of its items is active (mouse hover, keyboard focus, or a tap),
// and the active item gets data-active="true" for CSS to style. Under prefers-reduced-motion nothing moves,
// but the active state still works.
// Rings read data-duration (seconds per turn) and data-direction (1 or -1).
// `content` is whatever the rings are rendered from. The orbit is built from the items present when it runs,
// so it is rebuilt whenever `content` changes, otherwise items added later would get no hover and no counter-rotation.
export function useOrbit(ref: RefObject<HTMLElement>, content: unknown) {
  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;

    const rings = gsap.utils.toArray<HTMLElement>(RING, stage);
    const items = gsap.utils.toArray<HTMLElement>(ITEM, stage);
    const timelines = new Map<HTMLElement, gsap.core.Timeline>();

    const ringOf = (item: HTMLElement | null) => item?.closest<HTMLElement>(RING) ?? null;
    const setSpeed = (ring: HTMLElement | null, timeScale: number) => {
      const tl = ring && timelines.get(ring);
      if (tl) gsap.to(tl, { timeScale, duration: timeScale === 0 ? 0.6 : 0.9, ease: "power2.out", overwrite: true });
    };

    let active: HTMLElement | null = null;
    const setActive = (next: HTMLElement | null) => {
      if (next === active) return;
      const prevRing = ringOf(active);
      const nextRing = ringOf(next);

      if (active) active.dataset.active = "false";
      if (next) next.dataset.active = "true";
      active = next;

      // The ring holding the active item sits above the others so its tooltip is never covered.
      if (prevRing && prevRing !== nextRing) {
        prevRing.style.zIndex = "";
        setSpeed(prevRing, 1);
      }
      if (nextRing) {
        nextRing.style.zIndex = "10";
        setSpeed(nextRing, 0);
      }
    };

    const cleanups = items.map((item) => {
      const on = () => setActive(item);
      const off = () => {
        if (active === item) setActive(null);
      };
      const onPointerEnter = (e: PointerEvent) => {
        if (e.pointerType === "mouse") on();
      };
      const onPointerLeave = (e: PointerEvent) => {
        if (e.pointerType === "mouse") off();
      };
      // Touch has no hover: a tap activates the item and a tap anywhere else (below) clears it.
      const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") on();
      };

      item.addEventListener("pointerenter", onPointerEnter);
      item.addEventListener("pointerleave", onPointerLeave);
      item.addEventListener("pointerdown", onPointerDown);
      item.addEventListener("focus", on);
      item.addEventListener("blur", off);
      return () => {
        item.removeEventListener("pointerenter", onPointerEnter);
        item.removeEventListener("pointerleave", onPointerLeave);
        item.removeEventListener("pointerdown", onPointerDown);
        item.removeEventListener("focus", on);
        item.removeEventListener("blur", off);
      };
    });

    const onDocPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && !(e.target as Element).closest(ITEM)) setActive(null);
    };
    document.addEventListener("pointerdown", onDocPointerDown);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Paused until the stage is on screen, so nothing animates off-screen.
      rings.forEach((ring) => {
        const duration = Number(ring.dataset.duration) || 60;
        const direction = Number(ring.dataset.direction) || 1;
        const ringItems = gsap.utils.toArray<HTMLElement>(ITEM, ring);
        const tl = gsap
          .timeline({ repeat: -1, paused: true, defaults: { ease: "none", duration } })
          .to(ring, { rotation: 360 * direction }, 0)
          .to(ringItems, { rotation: -360 * direction }, 0);
        timelines.set(ring, tl);
      });

      const core = stage.querySelector<HTMLElement>("[data-orbit-core]");
      if (core) {
        gsap.to(core, { rotation: 360, duration: 24, ease: "none", repeat: -1 });
        gsap.to(core, { scale: 1.15, duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true });
      }

      // Rings open outwards from the centre, inner ring first.
      gsap
        .timeline({
          defaults: { ease: "back.out(1.4)" },
          scrollTrigger: { trigger: stage, start: "top 80%", once: true },
        })
        .from(rings, { scale: 0.2, opacity: 0, duration: 1, stagger: 0.18 });

      // The starting state is read directly, because the stage may already be on screen when the orbit is built
      // (refresh, anchor link, hot reload) and a scroll callback would never fire. The observer handles changes.
      const setPlaying = (playing: boolean) => timelines.forEach((tl) => tl.paused(!playing));
      const { top, bottom } = stage.getBoundingClientRect();
      setPlaying(bottom > 0 && top < window.innerHeight);
      const visibility = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting));
      visibility.observe(stage);

      return () => {
        visibility.disconnect();
        timelines.forEach((tl) => tl.kill());
        timelines.clear();
      };
    });

    return () => {
      mm.revert();
      cleanups.forEach((cleanup) => cleanup());
      document.removeEventListener("pointerdown", onDocPointerDown);
      rings.forEach((ring) => (ring.style.zIndex = ""));
      items.forEach((item) => delete item.dataset.active);
    };
  }, [ref, content]);
}
