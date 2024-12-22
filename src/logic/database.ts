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

interface Project {
    id: number
    name: string
    desciption?: string
    isNeedToRemind: boolean
}

interface Task {
    id: number
    projectId: number
    title: string
    description?: string
    priority: Priority
    status: Status
}

interface ProjectsStorage {
    projects: Project[],

}

const useBearStore = create<BearState>()(
    persist(
        (set) => ({
            bears: 0,
            increase: (by) => set((state) => ({ bears: state.bears + by })),
        }),
        { name: 'bearStore' },
    ),
)