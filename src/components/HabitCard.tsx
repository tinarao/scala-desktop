import { Habit } from "@/logic/habits";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const HabitCard = ({ habit }: { habit: Habit }) => {
  const [placeholderArr, _] = useState(Array.from(Array(224).keys()));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{habit.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="col-span-1 h-min">
          <div className="grid w-fit grid-cols-[repeat(32,_minmax(0,_1fr))] gap-[0.12rem] space-y-0 p-1">
            {placeholderArr.map((_c) => (
              <div className="col-span-1 size-3 rounded-sm bg-pink-500"></div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          <ArrowRight />
          Перейти
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HabitCard;
