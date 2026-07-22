export const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "works",
  "resume",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
