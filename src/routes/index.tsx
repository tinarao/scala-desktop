import CreateProjectDialog from "@/components/CreateProjectDialog";
import { Button } from "@/components/ui/button";
import { Project, projectsStorage } from "@/logic/database";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const projectsService = projectsStorage();
  useEffect(() => {
    const updateState = async () => {
      const data = await projectsService.getAllProjects();
      setProjects(data);
    };

    updateState();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-medium">Проекты</h1>
        <CreateProjectDialog>
          <Button>Создать проект</Button>
        </CreateProjectDialog>
      </div>

      <hr className="my-2" />

      {projects.length === 0 ? (
        <div>net projectow</div>
      ) : (
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
