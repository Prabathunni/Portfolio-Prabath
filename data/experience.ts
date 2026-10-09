// Months are "YYYY-MM". A role with `end: null` is the current one, and its length counts up to today.
export type ExperienceProduct = {
  name: string;
  url: string;
  about: string;
  highlights: string[];
};

export type ExperienceRole = {
  id: string;
  title: string;
  company: string;
  start: string;
  end: string | null;
  location: string;
  summary: string;
  // One line that stays visible while the role is collapsed.
  teaser: { label: string; text: string };
  // Bullets for roles that aren't split into products.
  highlights?: string[];
  products?: ExperienceProduct[];
  note?: string;
  tech: string[];
};

// The month this list was last updated. The server render and the first browser render treat it as
// "now" so they match; the real current month replaces it right after the page loads.
export const EXPERIENCE_AS_OF = "2026-10";

// Newest first.
export const experience: ExperienceRole[] = [
  {
    id: "skookum",
    title: "Software Development Engineer",
    company: "SkookumInfotech LLP",
    start: "2026-05",
    end: null,
    location: "Remote",
    summary: "I own the frontend of Stone Suite, a product in development, and connect it to the backend.",
    teaser: { label: "Product", text: "Stone Suite (in development)" },
    highlights: [
      "Own the Stone Suite frontend end to end, from UI design to backend integration",
      "Added sign-in with Microsoft and Okta, and set up AWS",
      "Handle deployments with Azure Pipelines, fix bugs, and integrate APIs",
      "Take part in code reviews",
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "Go", "Docker", "Azure Pipelines", "AWS", "Claude Code"],
  },
  {
    id: "bytelock",
    title: "Junior Software Developer",
    company: "Bytelock Digital Solutions",
    start: "2025-08",
    end: "2026-04",
    location: "Remote",
    summary:
      "I worked across three of the company's products, building access control, payments, email, and a desktop app.",
    teaser: { label: "Products", text: "aQuafleet360 · JobConnect · RecruiterHub" },
    products: [
      {
        name: "aQuafleet360",
        url: "https://aquafleet360.com",
        about: "Fleet platform used on ships",
        highlights: [
          "Implemented role-based access control (RBAC), so each user only sees and does what their role allows",
          "Built the Electron desktop app from scratch and made it work on ships with poor internet",
          "Integrated Authorize.net payments and the Haraka SMTP email server",
        ],
      },
      {
        name: "JobConnect",
        url: "https://job-connect.ca",
        about: "Job search and hiring platform with smart matching",
        highlights: [
          "Integrated Authorize.net payments and built the subscription system",
          "Fetched matching candidates for each job through APIs",
          "Integrated Haraka SMTP email, maintained Python scripts, and fixed bugs",
        ],
      },
      {
        name: "RecruiterHub",
        url: "https://recruiterhub.ai",
        about: "AI-powered recruiting platform",
        highlights: [
          "Implemented most of the recruiter module",
          "Integrated resume-based candidate matching and candidate sourcing",
          "Built team configuration for recruiting companies, plus Python scripts and API integrations",
        ],
      },
    ],
    note: "I also took part in deployments and code reviews.",
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "Electron",
      "PostgreSQL",
      "CouchDB",
      "Docker",
      "Python",
      "Adminer",
      "GitHub",
    ],
  },
  {
    id: "luminar",
    title: "MERN Stack Developer Intern",
    company: "Luminar Technolab",
    start: "2025-01",
    end: "2025-07",
    location: "Kochi, Kerala · On-site",
    summary: "An intensive six-month training program where I learned how a web application works end to end.",
    teaser: { label: "Built", text: "Full-stack apps with React, Node.js, Express, and MongoDB" },
    highlights: [
      "Built full-stack apps with React, Node.js, Express, and MongoDB",
      "Designed REST APIs and added user login with JWT authentication",
      "Learned how the frontend, backend, and database fit together",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  },
];
