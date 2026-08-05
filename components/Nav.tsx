import { SECTION_IDS } from "@/lib/scrollCheckpoints";

const LABELS: Record<(typeof SECTION_IDS)[number], string> = {
  hero: "Home",
  about: "About",
  skills: "Skills",
  works: "Work",
  resume: "Resume",
  contact: "Contact",
};

export default function Nav() {
  const links = SECTION_IDS.filter((id) => id !== "hero");

  return (
    <nav className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-5 py-4 md:px-6">
        <a href="#hero" className="font-display text-2xl tracking-wide">
          P<span className="text-accent">.</span>
        </a>
        <div className="hidden gap-8 md:flex">
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
            >
              {LABELS[id]}
            </a>
          ))}
        </div>
        <a
          href="mailto:prabathunni826@gmail.com"
          className="text-xs uppercase tracking-[0.2em] text-ink hover:text-accent"
        >
          Say Hello
        </a>
      </div>
    </nav>
  );
}
