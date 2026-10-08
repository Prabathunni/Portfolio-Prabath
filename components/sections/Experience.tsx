"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { formatDuration, formatMonth, monthSpan, toYearMonth } from "@/lib/experienceDates";
import {
  EXPERIENCE_AS_OF,
  experience,
  type ExperienceProduct,
  type ExperienceRole,
} from "@/data/experience";

const COUNT_WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const PANEL_MS = 300; // keep in sync with duration-300 below

function SmallLabel({ children }: { children: string }) {
  return (
    <p className="mb-2 mt-5 text-[11px] uppercase tracking-[0.16em] text-ink/60">{children}</p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul role="list" className="space-y-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-4 text-sm leading-[1.6] before:absolute before:left-0 before:top-[0.7em] before:h-[5px] before:w-[5px] before:bg-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function TechChips({ tech }: { tech: string[] }) {
  return (
    <ul role="list" className="flex flex-wrap gap-1.5">
      {tech.map((item) => (
        <li key={item} className="border border-line px-2 text-[11px] uppercase leading-5 tracking-[0.08em]">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Product({ product, first }: { product: ExperienceProduct; first: boolean }) {
  return (
    <div className={first ? "" : "mt-4 border-t border-dashed border-line/40 pt-4"}>
      <h4 className="font-medium">
        <a
          href={product.url}
          target="_blank"
          rel="noreferrer"
          className="border-b border-ink text-base"
        >
          {product.name} ↗
        </a>
      </h4>
      <p className="mb-3 mt-1 text-[13px] text-ink/60">{product.about}</p>
      <BulletList items={product.highlights} />
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
    >
      <path d="M3 6l5 5 5-5" />
    </svg>
  );
}

function RoleRow({
  role,
  open,
  today,
  onToggle,
}: {
  role: ExperienceRole;
  open: boolean;
  today: string;
  onToggle: () => void;
}) {
  const current = role.end === null;
  const months = monthSpan(role.start, role.end ?? today);
  const panelId = `experience-${role.id}-details`;

  return (
    <li className="exp-item border-b border-line py-7 md:py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
        <div>
          <h3 className="font-display text-xl uppercase leading-[1.1] md:text-2xl">{role.title}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-base">
            {role.company}
            {current && (
              <span className="bg-ink px-2 text-[11px] uppercase leading-5 tracking-[0.16em] text-bg">
                Current
              </span>
            )}
          </p>
        </div>
        <div className="md:shrink-0 md:text-right">
          <p className="text-xs uppercase tracking-[0.16em]">
            {formatMonth(role.start)} — {role.end ? formatMonth(role.end) : "Present"}
          </p>
          <p className="mt-1 text-[13px]">
            {formatDuration(months)} · {role.location}
          </p>
        </div>
      </div>

      <p className="mt-4 max-w-[46rem] text-base leading-[1.6]">{role.summary}</p>
      <p className="mt-2 flex gap-3 text-sm leading-[1.6]">
        <span className="w-[4.75rem] shrink-0 text-[11px] uppercase leading-[1.9] tracking-[0.16em] text-ink/60">
          {role.teaser.label}
        </span>
        <span>{role.teaser.text}</span>
      </p>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="mt-4 inline-flex items-center gap-2 border-b border-ink text-sm font-medium"
      >
        {open ? "Hide details" : "Show details"}
        <Chevron open={open} />
      </button>

      {/* Grid-rows trick: 0fr to 1fr animates the height without measuring it. */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          id={panelId}
          className={`min-h-0 overflow-hidden transition-[visibility] duration-300 motion-reduce:transition-none ${
            open ? "visible" : "invisible"
          }`}
        >
          {role.products ? (
            <div className="pt-5">
              {role.products.map((product, i) => (
                <Product key={product.name} product={product} first={i === 0} />
              ))}
              {role.note && <p className="mt-4 text-sm leading-[1.6]">{role.note}</p>}
            </div>
          ) : (
            <div>
              <SmallLabel>What I did</SmallLabel>
              <BulletList items={role.highlights ?? []} />
            </div>
          )}
          <SmallLabel>Tech</SmallLabel>
          <TechChips tech={role.tech} />
        </div>
      </div>
    </li>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, ":scope .exp-item");

  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set([experience[0].id]));
  const [today, setToday] = useState(EXPERIENCE_AS_OF);

  // Durations and the total count up to the current month, but only after hydration so the
  // server HTML and the first browser render stay identical.
  useEffect(() => {
    const now = toYearMonth(new Date());
    setToday((prev) => (now > prev ? now : prev));
  }, []);

  // Opening or closing a row changes the page height, so later sections' scroll triggers need fresh
  // positions once the panel has finished moving.
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const id = window.setTimeout(() => ScrollTrigger.refresh(), PANEL_MS + 50);
    return () => window.clearTimeout(id);
  }, [open]);

  const allOpen = open.size === experience.length;

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(experience.map((role) => role.id)));

  const starts = experience.map((role) => role.start).sort();
  const ends = experience.map((role) => role.end ?? today).sort();
  const total = formatDuration(monthSpan(starts[0], ends[ends.length - 1]), "long");

  return (
    <section
      id="experience"
      ref={ref}
      aria-labelledby="experience-heading"
      className="px-5 py-24 md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container mx-auto">
        <div className="exp-item flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
            <span className="text-accent">✦</span> Professional experience
          </p>
          <button
            type="button"
            onClick={toggleAll}
            className="border border-line px-3 py-1 text-[11px] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-bg"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <h2
          id="experience-heading"
          className="exp-item mt-8 text-balance font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.95]"
        >
          Where I&apos;ve worked
        </h2>

        <p className="exp-item mt-6 max-w-xl text-base leading-[1.7] md:text-lg">
          {total} of experience, from a MERN internship to my current
          role as a Software Development Engineer.
        </p>

        <div className="exp-item mt-8 h-1 border-y border-line" />

        <ol role="list">
          {experience.map((role) => (
            <RoleRow
              key={role.id}
              role={role}
              open={open.has(role.id)}
              today={today}
              onToggle={() => toggle(role.id)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
