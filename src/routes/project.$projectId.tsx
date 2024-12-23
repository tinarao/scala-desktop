import CreateTaskDialog from "@/components/CreateTaskDialog";
import { Button } from "@/components/ui/button";
import { Project, projectsStorage } from "@/logic/database";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Cog, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/project/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const { projectId } = Route.useParams();
  const projectsService = projectsStorage();

  useEffect(() => {
    const getData = async () => {
      const data = await projectsService.getById(parseInt(projectId));
      setProject(data.project);
    };

    getData();
  }, []);

  return (
    <div className="flex h-screen flex-col p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-medium">{project?.name}</h1>
        <div className="space-x-2">
          <Button asChild variant="link">
            <Link to="/">
              <ArrowLeft /> Вернуться к проектам
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <Cog />
          </Button>
        </div>
      </div>

      <hr className="my-2" />

      {project && (
        <div className="grid flex-1 grid-cols-4 gap-2">
          <div className="col-span-1 h-full">
            <div className="flex items-center gap-x-2 rounded-md bg-accent p-2 font-medium">
              <div className="size-4 rounded-full bg-indigo-500"></div>
              Не начато
            </div>
            <div className="space-y-1 pt-2">
              <CreateTaskDialog projectId={project.id}>
                <Button
                  title="Нажмите, чтобы добавить задачу"
                  variant="ghost"
                  className="w-full"
                >
                  <Plus />
                </Button>
              </CreateTaskDialog>
            </div>
          </div>
          <div className="col-span-1 h-full">
            <div className="flex items-center gap-x-2 rounded-md bg-accent p-2 font-medium">
              <div className="size-4 rounded-full bg-yellow-500"></div>В
              процессе
            </div>
          </div>
          <div className="col-span-1 h-full">
            <div className="flex items-center gap-x-2 rounded-md bg-accent p-2 font-medium">
              <div className="size-4 rounded-full bg-green-500"></div>
              Завершено
            </div>
          </div>
          <div className="col-span-1 h-full">
            <div className="flex items-center gap-x-2 rounded-md bg-accent p-2 font-medium">
              <div className="size-4 rounded-full bg-red-500"></div>
              Заброшено
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
