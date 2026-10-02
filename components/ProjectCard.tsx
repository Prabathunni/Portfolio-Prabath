import type { Project } from "@/data/projects";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group border border-line transition-shadow hover:shadow-[6px_6px_0_0_#000000]">
      <ImagePlaceholder ratio="16/10" label={project.title} bordered={false} className="border-b border-line" />
      <div className="p-6">
        <h3 className="font-display text-xl uppercase tracking-wide text-ink">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block text-xs uppercase tracking-widest text-accent hover:underline"
        >
          View Project ↗
        </a>
      </div>
    </div>
  );
}
