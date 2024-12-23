import Database from "@tauri-apps/plugin-sql";
import { create } from "zustand";
import { z } from "zod";

export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Ultra = "ultra",
}

enum Status {
  NotStarted = "not_started",
  InProgress = "in_progress",
  Done = "done",
  Scrapped = "scrapped",
}


export const taskSchema = z.object({
  id: z.number().positive(),
  projectId: z.number().positive(),
  title: z.string(),
  description: z.string().optional().nullable(),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(Status)
})

export const projectSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  description: z.string().optional().nullable(),
  isNeedToRemind: z.number(),
  tasks: z.array(taskSchema).optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type Task = z.infer<typeof taskSchema>

interface ProjectsStorage {
  projects: Project[];

  getAllProjects: () => Promise<Project[]>;
  getById: (id: number) => Promise<{ ok: boolean, project: Project | undefined, tasks: Array<Task> }>;

  changeName: (id: number, newName: string) => Promise<boolean>

  create: (name: string, description: string) => Promise<boolean>;
}

export const projectsStorage = create<ProjectsStorage>()((set, get) => ({
  projects: [],
  getAllProjects: async () => {
    const db = await Database.load("sqlite:./storage.db");
    const data = await db.select("SELECT * from projects");
    const parsed = z.array(projectSchema).parse(data);

    set({ projects: parsed });

    await db.close();
    return parsed;
  },

  getById: async (id) => {
    const db = await Database.load("sqlite:./storage.db");
    const data = await db.select("SELECT * from projects WHERE id = $1", [id]);

    const parsed = z.array(projectSchema).safeParse(data);
    if (!parsed.success) {
      return { ok: false, project: undefined, tasks: [] }
    }

    const tasksData = await db.select("SELECT * from tasks WHERE projectId = $1", [parsed.data[0].id]);
    const parsedTasks = z.array(taskSchema).safeParse(tasksData)
    if (!parsedTasks.success) {
      return { ok: false, project: undefined, tasks: [] }
    }

    await db.close();
    return { ok: true, project: parsed.data[0], tasks: parsedTasks.data };
  },

  changeName: async (id, newName) => {
    return true
  },

  create: async (name, description) => {
    const db = await Database.load("sqlite:./storage.db");
    const result = await db.execute(
      "INSERT into projects (name, description, isNeedToRemind) VALUES ($1, $2, $3)",
      [name, description ?? undefined, 0]
    );

    if (result.rowsAffected !== 1) {
      return false;
    }

    const currentProjects = get().projects;
    let has = false;
    currentProjects.forEach((p) => {
      if (p.id === result.lastInsertId) {
        has = true;
      }
    });

    if (!has) {
      let newProjects = currentProjects;
      newProjects.push({
        id: result.lastInsertId!,
        name,
        description,
        isNeedToRemind: 0,
      });
      set({ projects: newProjects });
    }

    await db.close();
    return true;
  },
}));
