export * from "~models/user"
export * from "~models/project"

export type DBResult<T> = {
    status: "success" | "error"
    message: string
    data?: T
}
