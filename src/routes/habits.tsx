import CreateHabitDialog from "@/components/CreateHabitDialog";
import HabitCard from "@/components/HabitCard";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Habit, habitsStorage } from "@/logic/habits";
import { createFileRoute } from "@tanstack/react-router";
import { CircleHelp, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/habits")({
  component: RouteComponent,
});

function RouteComponent() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { getHabits } = habitsStorage();

  useEffect(() => {
    const getData = async () => {
      const data = await getHabits();
      setHabits(data);
    };

    getData();
  }, []);

  return (
    <div className="h-screen p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-medium">Привычки</h1>
          <span className="text-muted-foreground">Всего: {habits.length}</span>
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
              Говорят, формирование привычки происходит примерно за{" "}
              <strong>60</strong> дней.
              <br />
              Добавьте привычку и отслеживайте прогресс.
            </HoverCardContent>
          </HoverCard>
          <CreateHabitDialog>
            <Button
              size="icon"
              variant="outline"
              className="size-7 rounded-full"
            >
              <Plus />
            </Button>
          </CreateHabitDialog>
        </div>
      </div>

      <hr className="my-2" />

      {habits.length === 0 ? (
        <div>net priwychek</div>
      ) : (
        <div className="space-y-2">
          {habits.map((h) => (
            <HabitCard key={h.id} habit={h} />
          ))}
        </div>
      )}
    </div>
  );
}
