export type Project = {
    title: string
    overview: string
    due_date: string
}

export type Deadline = {
    project: string
    date: string
    title: string
    desc: string
}

export type Task = {
    project: string
    deadline_title: string
    date: string
    title: string
    desc: string
}
