"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";

const SOCIALS = [
  { href: "https://www.linkedin.com/in/prabath77/", icon: "fa-brands fa-linkedin" },
  { href: "https://github.com/Prabathunni", icon: "fa-brands fa-github" },
  { href: "https://www.instagram.com/sethuramxn/", icon: "fa-brands fa-instagram" },
  { href: "mailto:prabathunni826@gmail.com", icon: "fa-solid fa-envelope" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <footer id="contact" ref={ref} className="text-center py-16">
      <div className="flex justify-center gap-4 mb-6">
        {SOCIALS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="text-white text-2xl hover:text-orange-400 transition-colors"
          >
            <i className={s.icon} />
          </a>
        ))}
      </div>
      <h5 className="mb-3 font-semibold">Thanks for visiting!</h5>
      <small className="text-gray-400">&copy; 2025 Prabath | Stay inspired. Stay creative.</small>
    </footer>
  );
}
