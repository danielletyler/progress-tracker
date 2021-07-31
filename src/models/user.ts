export type User = {
    id: string
    first_name: string
    last_name: string
}

export type InsertUser = {
    id: string
    first_name: string
    last_name: string
}

export type UpdateUser = {
    first_name?: string
    last_name?: string
}

export type UserPrivate = {
    email: string
}
