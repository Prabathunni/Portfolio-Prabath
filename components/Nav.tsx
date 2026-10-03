import { SECTION_IDS } from "@/lib/scrollCheckpoints";

const LABELS: Record<(typeof SECTION_IDS)[number], string> = {
  hero: "Home",
  about: "About",
  skills: "Skills",
  experience: "Experience",
  works: "Work",
  resume: "Resume",
  contact: "Contact",
};

export default function Nav() {
  const links = SECTION_IDS.filter((id) => id !== "hero");

  return (
    <nav className="sticky top-0 z-20 border-b border-line bg-bg">
      <div className="container mx-auto flex items-center justify-between px-5 py-4 md:px-6 lg:px-10 xl:px-20">
        <a href="#hero" className="font-display text-2xl tracking-wide">
          P<span className="text-accent">.</span>
        </a>
        <div className="hidden gap-8 md:flex">
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-xs uppercase tracking-[0.2em] underline-offset-4 hover:underline"
            >
              {LABELS[id]}
            </a>
          ))}
        </div>
        <a
          href="mailto:prabathunni826@gmail.com"
          className="text-xs uppercase tracking-[0.2em] underline-offset-4 hover:underline"
        >
          Say Hello
        </a>
      </div>
    </nav>
  );
}
