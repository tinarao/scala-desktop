import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/logic/projects";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>
          {project.description ? project.description : "Нет описания"}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link
            to="/project/$projectId"
            params={{ projectId: project.id.toString() }}
          >
            Перейти
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
