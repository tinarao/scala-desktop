import { Button, buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { CircleHelp, Plus } from "lucide-react";

export const Route = createFileRoute("/habits")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-medium">Привычки</h1>
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
              Говорят, формирование привычки происходит примерно за{" "}
              <strong>60</strong> дней.
              <br />
              Добавьте привычку и отслеживайте прогресс.
            </HoverCardContent>
          </HoverCard>
          <Button size="icon" variant="outline" className="size-7 rounded-full">
            <Plus />
          </Button>
        </div>
      </div>

      <hr className="my-2" />
    </div>
  );
}
