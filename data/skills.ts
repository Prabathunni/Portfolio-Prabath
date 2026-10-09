import {
  siBootstrap,
  siClaude,
  siEjs,
  siExpress,
  siGit,
  siGithub,
  siGo,
  siHtml5,
  siJavascript,
  siLinux,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siNpm,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

// Simple Icons dropped the VS Code logo after v11, so its 24x24 path is kept here (from simple-icons@11.0.0).
const VS_CODE_PATH =
  "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z";

// Simple Icons ships a 24x24 SVG path; FontAwesome covers what Simple Icons lacks (CSS3).
export type SkillIcon = { path: string } | { fa: string };

export type Skill = {
  name: string;
  icon: SkillIcon;
};

// One orbit ring on the Skills section. Listed inner ring first, outer ring last.
export type SkillRing = {
  label: string;
  skills: Skill[];
};

export const skillRings: SkillRing[] = [
  {
    label: "Frontend",
    skills: [
      { name: "HTML", icon: { path: siHtml5.path } },
      { name: "CSS", icon: { fa: "fa-brands fa-css3-alt" } },
      { name: "JavaScript", icon: { path: siJavascript.path } },
      { name: "TypeScript", icon: { path: siTypescript.path } },
      { name: "React", icon: { path: siReact.path } },
      { name: "Next.js", icon: { path: siNextdotjs.path } },
    ],
  },
  {
    label: "Styling and backend",
    skills: [
      { name: "Tailwind CSS", icon: { path: siTailwindcss.path } },
      { name: "Bootstrap", icon: { path: siBootstrap.path } },
      { name: "Node.js", icon: { path: siNodedotjs.path } },
      { name: "Express.js", icon: { path: siExpress.path } },
      { name: "EJS", icon: { path: siEjs.path } },
      { name: "MongoDB", icon: { path: siMongodb.path } },
    ],
  },
  {
    label: "Languages and tools",
    skills: [
      { name: "Python", icon: { path: siPython.path } },
      { name: "Go", icon: { path: siGo.path } },
      { name: "Git", icon: { path: siGit.path } },
      { name: "GitHub", icon: { path: siGithub.path } },
      { name: "npm", icon: { path: siNpm.path } },
      { name: "Linux", icon: { path: siLinux.path } },
      { name: "VS Code", icon: { path: VS_CODE_PATH } },
      { name: "Claude", icon: { path: siClaude.path } },
    ],
  },
];
