export type Project = {
    title: string
    overview: string
    due_date: string
    isCompleted: boolean
}

export type Deadline = {
    project: string
    date: string
    title: string
    desc: string
    isCompleted: boolean
}

export type Task = {
    project: string
    deadline_title: string
    date: string
    title: string
    desc: string
    isCompleted: boolean
}

export type UpdateTask = {
    project?: string
    deadline_title?: string
    date?: string
    title?: string
    desc?: string
    isCompleted?: boolean
}
