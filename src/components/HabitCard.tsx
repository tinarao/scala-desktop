import { Habit } from "@/logic/habits";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

const HabitCard = ({ habit }: { habit: Habit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{habit.name}</CardTitle>
        <CardDescription>
          {habit.description ? habit.description : "Нет описания"}
        </CardDescription>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default HabitCard;
