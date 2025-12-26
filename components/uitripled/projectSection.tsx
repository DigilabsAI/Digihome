import { ProjectsBlock } from "./projects-block-shadcnui";

export default function ProjectSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">
        Our Latest Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <ProjectsBlock />
        <ProjectsBlock />
      </div>
      {/* Replace the below divs with <ProjectsBlock /> components for each project */}
    </div>
  );
}
