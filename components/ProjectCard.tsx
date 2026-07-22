import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="relative bg-card rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(249,21,21,0.75)]">
      <div className="absolute top-0 right-0 bg-red-600 text-white font-bold px-3 py-2 rounded-bl-2xl">
        ➔
      </div>
      <h3 className="text-lg font-bold mb-2 text-white">{project.title}</h3>
      <p className="text-gray-400 mb-4">{project.description}</p>
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noreferrer"
        className="text-red-500 hover:underline"
      >
        Demo
      </a>
    </div>
  );
}
