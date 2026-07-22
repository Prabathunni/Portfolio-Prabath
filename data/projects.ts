export type Project = {
  title: string;
  description: string;
  demoUrl: string;
};

export const projects: Project[] = [
  {
    title: "CashFlow",
    description:
      "Developed a responsive cash flow system to simplify income and expense tracking for better financial control.",
    demoUrl: "https://cashflow-budget-calculator.vercel.app/",
  },
  {
    title: "porsche-gsap",
    description:
      "Crafted a Porsche website with GSAP animations to deliver an interactive and visually engaging experience.",
    demoUrl: "https://porsche-reveal-gsap.vercel.app/",
  },
  {
    title: "Nike-Clone",
    description:
      "Crafted a Nike website clone with a focus on clean design and seamless user experience across all devices.",
    demoUrl: "https://nike-umber-ten.vercel.app/",
  },
  {
    title: "ecovehicle",
    description:
      "Developed a EV awareness website to promote electric vehicle adoption through clean design and engaging content.",
    demoUrl: "https://ecovehicle.vercel.app/",
  },
  {
    title: "BMI",
    description:
      "Built a simple BMI checker tool to help users calculate and understand their body mass index easily and accurately.",
    demoUrl: "https://bmi-checker-nu.vercel.app/",
  },
];
