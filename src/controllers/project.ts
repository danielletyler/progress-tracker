import db from "~config/firebase-config"
import { DBResult, Deadline, Project, Task } from "../models"

export async function addProject(
    userId: string,
    title: string,
    due_date: string,
    overview: string
): Promise<DBResult<Project>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        const newProject: Project = {
            title: title,
            due_date: due_date,
            overview: overview,
        }
        await projRef.doc(title).set(newProject)
        return {
            status: "success",
            message: `Successfully added project with title ${title}`,
            data: newProject,
        }
    } catch (error) {
        return {
            status: "error",
            message: `Project with title ${title} could not be created: ${error}`,
        }
    }
}

export async function getProject(
    userId: string,
    title: string
): Promise<DBResult<Project>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        const project = await projRef.doc(title).get()
        return {
            status: "success",
            message: `Successfully returned project with title ${title}`,
            data: project.data() as Project,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to get project with title ${title}`,
        }
    }
}

export async function getAllProjects(
    userId: string
): Promise<DBResult<Project[]>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        const projects: Project[] = []
        const projectQuery = await projRef.get()

        projectQuery.forEach(doc => {
            projects.push(doc.data() as Project)
        })

        return {
            status: "success",
            message: `Successfully returned projects from user ${userId}`,
            data: projects,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to get projects from user ${userId}`,
        }
    }
}

export async function addDeadline(
    userId: string,
    project: string,
    title: string,
    desc: string,
    date: string
): Promise<DBResult<Deadline>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        const newDeadline: Deadline = {
            project: project,
            title: title,
            desc: desc,
            date: date,
        }
        await projRef
            .doc(newDeadline.project)
            .collection("Deadlines")
            .doc(newDeadline.title)
            .set(newDeadline)
        return {
            status: "success",
            message: `Successfully added deadline with title ${title} to project ${project}`,
            data: newDeadline,
        }
    } catch (error) {
        return {
            status: "error",
            message: `Deadline with title ${title} could not be created: ${error}`,
        }
    }
}

export async function getDeadline(
    userId: string,
    project: string,
    title: string
): Promise<DBResult<Deadline>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        const deadline = await projRef
            .doc(project)
            .collection("Deadlines")
            .doc(title)
            .get()
        return {
            status: "success",
            message: `Successfully returned deadline ${title} from project ${project}`,
            data: deadline.data() as Deadline,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to get deadline with title ${title}`,
        }
    }
}

export async function getAllDeadlines(
    userId: string,
    project: string
): Promise<DBResult<Deadline[]>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        const deadlines: Deadline[] = []
        const deadlineQuery = await projRef
            .doc(project)
            .collection("Deadlines")
            .get()

        deadlineQuery.forEach(doc => {
            deadlines.push(doc.data() as Deadline)
        })

        return {
            status: "success",
            message: `Successfully returned deadlines from project ${project}`,
            data: deadlines,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to get deadlines from project ${project}`,
        }
    }
}

export async function addTask(
    userId: string,
    project: string,
    deadline_title: string,
    title: string,
    desc: string,
    date: string
): Promise<DBResult<Task>> {
    const projRef = db
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("projects")
    try {
        const newTask: Task = {
            project: project,
            deadline_title: deadline_title,
            title: title,
            desc: desc,
            date: date,
        }
        await projRef
            .doc(newTask.project)
            .collection("Deadlines")
            .doc(newTask.deadline_title)
            .collection("Tasks")
            .doc(newTask.title)
            .set(newTask)
        return {
            status: "success",
            message: `Successfully added task with title ${title} to deadline ${deadline_title}`,
            data: newTask,
        }
    } catch (error) {
        return {
            status: "error",
            message: `Task with title ${title} could not be created: ${error}`,
        }
    }
}

export async function getAllTasks(
    userId: string,
    project: string,
    deadline: string
): Promise<DBResult<Task[]>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        const tasks: Task[] = []
        const taskQuery = await projRef
            .doc(project)
            .collection("Deadlines")
            .doc(deadline)
            .collection("Tasks")
            .get()

        taskQuery.forEach(doc => {
            tasks.push(doc.data() as Task)
        })

        return {
            status: "success",
            message: `Successfully returned tasks from deadline ${deadline}`,
            data: tasks,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to get tasks from deadline ${deadline}`,
        }
    }
}
