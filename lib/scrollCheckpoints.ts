export const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "experience",
  "works",
  "resume",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
