
import Database from "@tauri-apps/plugin-sql"
import { create } from "zustand"
import { z } from "zod"

enum Priority {
    Low = "low",
    Medium = "medium",
    High = "high",
    Ultra = "ultra"
}

enum Status {
    NotStarted = "not_started",
    InProgress = "in_progress",
    Done = "done",
    Scrapped = "scrapped"
}


interface Task {
    id: number
    projectId: number
    title: string
    description?: string
    priority: Priority
    status: Status
}

export const projectSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    description: z.string().optional().nullable(),
    isNeedToRemind: z.number()
})

export type Project = z.infer<typeof projectSchema>

interface ProjectsStorage {
    projects: Project[],
    getAllProjects: () => Promise<Project[]>
    create: (name: string, description: string) => Promise<boolean>;
}

export const projectsStorage = create<ProjectsStorage>()(
    (set, get) => ({
        projects: [],
        getAllProjects: async () => {
            const db = await Database.load("sqlite:./storage.db");
            const data = await db.select("SELECT * from projects")
            const parsed = z.array(projectSchema).parse(data);

            set({ projects: parsed });

            await db.close()
            return parsed
        },
        create: async (name: string, description: string) => {
            const db = await Database.load("sqlite:./storage.db");
            const result = await db.execute(
                "INSERT into projects (name, description, isNeedToRemind) VALUES ($1, $2, $3)",
                [name, description ?? undefined, 0],
            );

            if (result.rowsAffected !== 1) {
                return false;
            }

            const currentProjects = get().projects;
            let has = false;
            currentProjects.forEach(p => {
                if (p.id === result.lastInsertId) {
                    has = true;
                };
            })

            if (!has) {
                let newProjects = currentProjects;
                newProjects.push({ id: result.lastInsertId!, name, description, isNeedToRemind: 0 })
                set({ projects: newProjects });
            }

            await db.close()
            return true
        }
    })
)