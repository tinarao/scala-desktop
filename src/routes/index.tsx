import CreateProjectDialog from "@/components/CreateProjectDialog";
import { Button } from "@/components/ui/button";
import { Project, projectsStorage } from "@/logic/projects";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleHelp, Plus } from "lucide-react";

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
        <div>
          <h1 className="text-4xl font-medium">Проекты</h1>
          <span className="text-muted-foreground">
            Всего: {projects.length}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="size-7 rounded-full"
              >
                <CircleHelp />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              Управляйте своими проектами и задачами. Создайте проект, добавьте
              в него подзадачи, присваивайте им приоритет и меняйте их статус.
            </HoverCardContent>
          </HoverCard>
          <CreateProjectDialog>
            <Button
              size="icon"
              variant="outline"
              className="size-7 rounded-full"
            >
              <Plus />
            </Button>
          </CreateProjectDialog>
        </div>
      </div>

      <hr className="my-2" />

      {projects.length === 0 ? (
        <div>net projectow</div>
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
