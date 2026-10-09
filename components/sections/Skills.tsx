"use client";

import { useRef } from "react";
import { useOrbit } from "@/lib/useOrbit";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { skillRings, type Skill } from "@/data/skills";

// Ring sizes are percentages of the square stage, so the whole orbit scales with the viewport.
const OUTER_INSET = 4;
const RING_GAP = 14;
const BASE_DURATION = 60; // seconds per turn for the inner ring; each ring further out is slower
const DURATION_STEP = 30;
const ANGLE_STEP = 24; // each ring starts a little further round so icons don't line up across rings
const LEGEND_BASE = 10; // px; the legend marks each ring with a dashed circle that grows with the ring
const LEGEND_STEP = 6;

// Position of an item on its ring's circle, as percentages of the ring's box.
function pointOnRing(index: number, count: number, ringIndex: number) {
  const angle = ((-90 + ringIndex * ANGLE_STEP + (360 * index) / count) * Math.PI) / 180;
  return {
    left: `${(50 + 50 * Math.cos(angle)).toFixed(3)}%`,
    top: `${(50 + 50 * Math.sin(angle)).toFixed(3)}%`,
  };
}

function SkillGlyph({ icon }: { icon: Skill["icon"] }) {
  if ("fa" in icon) {
    return <i aria-hidden className={`${icon.fa} relative text-2xl leading-none md:text-4xl`} />;
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="relative h-6 w-6 md:h-9 md:w-9">
      <path d={icon.path} />
    </svg>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  useSectionReveal(containerRef, "[data-reveal]");
  useOrbit(stageRef, skillRings);

  return (
    <section
      id="skills"
      className="px-5 py-24 md:px-6 lg:px-10 xl:px-20"
    >
      <div ref={containerRef} className="container mx-auto xl:relative">
        <div data-reveal className="xl:absolute xl:left-0 xl:top-0 xl:z-10">
          <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="text-accent">✦</span> Hands-on with
          </p>
          <h2 className="mb-10 font-display text-4xl uppercase leading-tight md:text-5xl xl:mb-0 2xl:text-6xl">
            What I <br className="hidden xl:block" />
            <span className="text-accent">build</span> with
          </h2>
        </div>
        <div ref={stageRef} className="relative mx-auto aspect-square w-full max-w-[680px]">
          <div aria-hidden className="absolute inset-0 flex items-center justify-center">
            <svg data-orbit-core viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 md:h-14 md:w-14">
              <path d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z" />
            </svg>
          </div>
          {skillRings.map((ring, r) => (
            <ul
              key={ring.label}
              role="list"
              aria-label={ring.label}
              data-orbit-ring
              data-duration={BASE_DURATION + r * DURATION_STEP}
              data-direction={r % 2 === 0 ? 1 : -1}
              className="pointer-events-none absolute rounded-full border border-dashed border-line/40"
              style={{ inset: `${OUTER_INSET + (skillRings.length - 1 - r) * RING_GAP}%` }}
            >
              {ring.skills.map((skill, i) => (
                <li
                  key={skill.name}
                  className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 md:h-16 md:w-16"
                  style={pointOnRing(i, ring.skills.length, r)}
                >
                  <button
                    type="button"
                    data-orbit-item
                    data-active="false"
                    aria-label={skill.name}
                    className="group pointer-events-auto relative block h-full w-full rounded-full"
                  >
                    <span className="absolute inset-0 flex items-center justify-center rounded-full bg-bg transition-transform duration-300 group-data-[active=true]:scale-125">
                      <span
                        aria-hidden
                        className="absolute inset-0 scale-0 rounded-full bg-[#ffe200] transition-transform duration-300 group-data-[active=true]:scale-100"
                      />
                      <SkillGlyph icon={skill.icon} />
                    </span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap bg-ink px-2 py-1 text-[10px] uppercase tracking-widest text-bg opacity-0 transition-opacity duration-200 group-data-[active=true]:opacity-100"
                    >
                      {skill.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <ul
          data-reveal
          aria-hidden
          className="mt-10 flex flex-col items-center gap-2 text-xs uppercase tracking-widest lg:mt-6 xl:absolute xl:bottom-0 xl:right-0 xl:z-10 xl:mt-0 xl:items-end"
        >
          {skillRings.map((ring, r) => (
            <li key={ring.label} className="flex items-center gap-3">
              {ring.label}
              <span className="flex w-6 justify-center">
                <span
                  className="block rounded-full border border-dashed border-line/60"
                  style={{ width: LEGEND_BASE + r * LEGEND_STEP, height: LEGEND_BASE + r * LEGEND_STEP }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
