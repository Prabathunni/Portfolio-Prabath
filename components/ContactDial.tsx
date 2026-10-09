"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { contact } from "@/data/contact";

type Action = {
  label: string;
  icon: string;
  href: string;
  // Opens in a new tab instead of the same one (the resume).
  newTab?: boolean;
  // Email and phone. Where there is a mouse, the button grows into a pill showing this value and a click copies it.
  value?: string;
  copiedMessage?: string;
  // Where the button settles once the dial is open, in px from the middle of the main button.
  x: number;
  y: number;
};

const RADIUS = 92;

// Three buttons on a quarter circle that opens up and to the left of the corner.
const ACTIONS: Action[] = [
  {
    label: "Email",
    icon: "fa-solid fa-envelope",
    href: `mailto:${contact.email}`,
    value: contact.email,
    copiedMessage: "Email copied",
    x: -RADIUS,
    y: 0,
  },
  {
    label: "Call",
    icon: "fa-solid fa-phone",
    href: contact.phoneHref,
    value: contact.phone,
    copiedMessage: "Phone number copied",
    x: -65,
    y: -65,
  },
  {
    label: "View resume",
    icon: "fa-solid fa-file-lines",
    href: contact.resumeHref,
    newTab: true,
    x: 0,
    y: -RADIUS,
  },
];

// Closed, the same three buttons shrink to dots on a miniature of that arc, and the dots are the dial's icon.
const DOT_ARC = 13;
const DOT_SCALE = 5 / 48;
// Scales an open position down to the miniature arc, shifted so the dots sit centred in the main button.
const dotOffset = (openOffset: number) => (openOffset / RADIUS) * DOT_ARC + DOT_ARC / 2;

const CLOSE_BAR =
  "absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 bg-bg transition-opacity duration-200 motion-reduce:transition-none";

// Fixed in the bottom-right corner at every screen size. Touch screens tap through to the mail app, dialler and
// resume; screens with a mouse get the hover pills below, since a desktop rarely has a mail or phone app.
export default function ContactDial() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const onAction = (event: ReactMouseEvent<HTMLAnchorElement>, action: Action) => {
    // With a mouse, copy the value instead of opening an app. The dial stays open so "Copied" is seen. Without the
    // Clipboard API (or if it refuses) the link opens normally.
    if (action.value && navigator.clipboard && window.matchMedia("(hover: hover)").matches) {
      event.preventDefault();
      const href = event.currentTarget.href;
      navigator.clipboard.writeText(action.value).then(
        () => {
          setCopied(action.label);
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setCopied(null), 1400);
        },
        () => {
          window.location.href = href;
        }
      );
      return;
    }
    setOpen(false);
  };

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 h-14 w-14">
      {/* an invisible layer that closes the dial and keeps the click from reaching the page underneath */}
      {open && <div aria-hidden className="fixed inset-0 -z-10" onClick={() => setOpen(false)} />}

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="contact-actions"
        aria-label={open ? "Close contact options" : "Open contact options"}
        onClick={() => setOpen((value) => !value)}
        className="absolute inset-0 z-10 rounded-full bg-ink"
      >
        {/* the close mark fades in once the dots have flown out */}
        <span aria-hidden className={`${CLOSE_BAR} rotate-45 ${open ? "opacity-100 delay-150" : "opacity-0"}`} />
        <span aria-hidden className={`${CLOSE_BAR} -rotate-45 ${open ? "opacity-100 delay-150" : "opacity-0"}`} />
      </button>

      {/* closed, these sit on top of the main button as dots but are inert; the button underneath takes the tap */}
      <ul id="contact-actions" role="list" aria-hidden={!open}>
        {ACTIONS.map((action, index) => (
          <li key={action.label} className="absolute left-1/2 top-1/2 z-20 h-0 w-0">
            <a
              href={action.href}
              target={action.newTab ? "_blank" : undefined}
              rel={action.newTab ? "noreferrer" : undefined}
              aria-label={action.value ? `${action.label} ${action.value}` : action.label}
              tabIndex={open ? 0 : -1}
              onClick={(event) => onAction(event, action)}
              style={{
                transform: open
                  ? `translate(${action.x}px, ${action.y}px)`
                  : `translate(${dotOffset(action.x)}px, ${dotOffset(action.y)}px) scale(${DOT_SCALE})`,
                // the stagger is for the flight only; the hover colours should not wait for it
                transitionDelay: open ? `${index * 50}ms, 0ms, 0ms` : "0ms",
              }}
              className={`group absolute -right-6 -top-6 flex h-12 flex-row-reverse items-center rounded-full border border-line bg-bg text-ink transition-[transform,background-color,color] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] active:bg-ink active:text-bg focus-visible:bg-ink focus-visible:text-bg motion-reduce:transition-none [@media(hover:hover)]:hover:bg-ink [@media(hover:hover)]:hover:text-bg ${
                open ? "" : "pointer-events-none"
              }`}
            >
              <span className="grid h-[46px] w-[46px] shrink-0 place-items-center">
                <i
                  aria-hidden
                  className={`${action.icon} text-base transition-opacity duration-200 motion-reduce:transition-none ${
                    open ? "opacity-100 delay-200" : "opacity-0"
                  }`}
                />
              </span>

              {action.value ? (
                <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-[max-width] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:max-w-[18rem] [@media(hover:hover)]:group-focus-visible:max-w-[18rem]">
                  {/* both texts share one grid cell, so the pill keeps its width while "Copied" replaces the value */}
                  <span className="grid pl-4">
                    <span
                      className={`col-start-1 row-start-1 transition-opacity duration-200 motion-reduce:transition-none ${
                        copied === action.label ? "opacity-0" : ""
                      }`}
                    >
                      {action.value}
                      <i aria-hidden className="fa-regular fa-copy ml-2 text-[0.85em]" />
                    </span>
                    <span
                      aria-hidden
                      className={`col-start-1 row-start-1 transition-opacity duration-200 motion-reduce:transition-none ${
                        copied === action.label ? "" : "opacity-0"
                      }`}
                    >
                      Copied ✓
                    </span>
                  </span>
                </span>
              ) : (
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap bg-ink px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-bg opacity-0 transition-opacity duration-200 motion-reduce:transition-none [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100"
                >
                  View resume
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>

      <span role="status" className="sr-only">
        {ACTIONS.find((action) => action.label === copied)?.copiedMessage ?? ""}
      </span>
    </div>
  );
}
