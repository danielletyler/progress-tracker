import db from "~config/firebase-config"
import { DBResult, Deadline, Project, Task, UpdateTask } from "../models"

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
            isCompleted: false,
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

export async function deleteProject(
    userId: string,
    title: string
): Promise<DBResult<Project>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        await projRef.doc(title).delete()
        return {
            status: "success",
            message: `Successfully deleted project with title ${title}`,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to delete project with title ${title}`,
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

export async function updateProject(
    userId: string,
    title: string,
    updateTaskData: UpdateTask
): Promise<DBResult<undefined>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        await projRef.doc(title).update({
            ...updateTaskData,
        })
        return {
            status: "success",
            message: `Successfully updated project with title ${title}`,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to update project with title ${title}: ${e}`,
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
            isCompleted: false,
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

export async function deleteDeadline(
    userId: string,
    project: string,
    title: string
): Promise<DBResult<Project>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        await projRef
            .doc(project)
            .collection("Deadlines")
            .doc(title)
            .delete()
        return {
            status: "success",
            message: `Successfully deleted deadline with title ${title}`,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to delete deadline with title ${title}`,
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

export async function updateDeadline(
    userId: string,
    project: string,
    title: string,
    updateTaskData: UpdateTask
): Promise<DBResult<undefined>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        await projRef
            .doc(project)
            .collection("Deadlines")
            .doc(title)
            .update({
                ...updateTaskData,
            })
        return {
            status: "success",
            message: `Successfully updated deadline with title ${title}`,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to update deadline with title ${title}: ${e}`,
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
            isCompleted: false,
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

export async function getTask(
    userId: string,
    project: string,
    deadline: string,
    title: string
): Promise<DBResult<Task>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        const task = await projRef
            .doc(project)
            .collection("Deadlines")
            .doc(deadline)
            .collection("Tasks")
            .doc(title)
            .get()
        return {
            status: "success",
            message: `Successfully returned task ${title} from deadline ${deadline}`,
            data: task.data() as Task,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to get task with title ${title}`,
        }
    }
}

export async function deleteTask(
    userId: string,
    project: string,
    deadline: string,
    title: string
): Promise<DBResult<Project>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        await projRef
            .doc(project)
            .collection("Deadlines")
            .doc(deadline)
            .collection("Tasks")
            .doc(title)
            .delete()
        return {
            status: "success",
            message: `Successfully deleted task with title ${title}`,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to delete task with title ${title}`,
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

export async function updateTask(
    userId: string,
    project: string,
    deadline: string,
    title: string,
    updateTaskData: UpdateTask
): Promise<DBResult<undefined>> {
    try {
        const projRef = db
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("projects")
        await projRef
            .doc(project)
            .collection("Deadlines")
            .doc(deadline)
            .collection("Tasks")
            .doc(title)
            .update({
                ...updateTaskData,
            })
        return {
            status: "success",
            message: `Successfully updated task with title ${title}`,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to update task with title ${title}: ${e}`,
        }
    }
}
