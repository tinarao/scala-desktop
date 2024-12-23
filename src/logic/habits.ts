import Database from "@tauri-apps/plugin-sql";
import { z } from "zod";
import { create } from "zustand";

export const checkpointSchema = z.object({
    id: z.number().positive(),
    date: z.string(),
    habitId: z.number().nullable(),
})

export const habitSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    description: z.string().optional(),
    longestDayStrike: z.number(),
    createdAt: z.string()
})

export type Habit = z.infer<typeof habitSchema>
export type Checkpoint = z.infer<typeof checkpointSchema>

interface HabitsStorage {
    habits: Array<Habit>
    create: (name: string, description: string) => Promise<boolean>
    getHabits: () => Promise<Array<Habit>>
}

export const habitsStorage = create<HabitsStorage>()((set, get) => ({
    habits: [],

    async getHabits() {
        const db = await Database.load("sqlite:./storage.db");

        const data = await db.select("SELECT * FROM habits")
        const parsed = z.array(habitSchema).parse(data)

        set({ habits: parsed })

        await db.close()
        return parsed
    },

    async create(name, description) {
        const db = await Database.load("sqlite:./storage.db");

        const result = await db.execute(
            "INSERT into habits (name, description, createdAt) VALUES ($1, $2, $3)",
            [name, description, new Date().toString()]
        )

        if (result.rowsAffected !== 0) {
            return false;
        }

        const inserted = await db.select("SELECT * FROM habits WHERE id = $1", [result.lastInsertId])
        const habit = await habitSchema.parse(inserted);

        const currentHabits = get().habits;
        let has = false;
        currentHabits.forEach((p) => {
            if (p.id === result.lastInsertId) {
                has = true;
            }
        });

        if (!has) {
            let newHabits = currentHabits;
            newHabits.push(habit);
            set({ habits: newHabits });
        }

        await db.close()
        return true
    }
}))