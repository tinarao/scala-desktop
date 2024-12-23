import { Task } from "@/logic/projects";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupByStatus(arr: Array<Task>) {
  let notStarted: Array<Task> = []
  let inProgress: Array<Task> = []
  let done: Array<Task> = []
  let scrapped: Array<Task> = []

  const statuses: Record<string, Array<Task>> = {
    "not_started": notStarted,
    "in_progress": inProgress,
    "done": done,
    "scrapped": scrapped,
  }

  arr.forEach(t => {
    statuses[t.status].push(t)
  })

  return { notStarted, inProgress, done, scrapped }

}