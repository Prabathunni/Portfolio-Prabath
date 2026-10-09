export type Project = {
  title: string;
  description: string;
  url: string;
  // Small label shown when the project is open in the strip.
  kind: "Recent work" | "Personal project";
};

// In display order.
export const projects: Project[] = [
  {
    title: "Venmer Tech",
    description: "Enterprise technology and consulting company",
    url: "https://venmertech.com/",
    kind: "Recent work",
  },
  {
    title: "Elevation Stone",
    description: "Custom stone fabrication, Dallas–Fort Worth",
    url: "https://elevationstone.com/",
    kind: "Recent work",
  },
  {
    title: "Porsche GSAP",
    description: "Animated Porsche website built with GSAP",
    url: "https://porsche-reveal-gsap.vercel.app/",
    kind: "Personal project",
  },
  {
    title: "Nike Clone",
    description: "Just Did it.",
    url: "https://nike-umber-ten.vercel.app/",
    kind: "Personal project",
  },
];
