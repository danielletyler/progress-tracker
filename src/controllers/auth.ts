import db from "~config/firebase-config"
import { DBResult, InsertUser } from "../models"
import { validateEmail } from "../components/shared/utils"
import { createUser } from "../controllers/user"

export async function signup(
    email: string,
    password: string,
    insertUserData: InsertUser
): Promise<DBResult<null>> {
    try {
        const newUser = await db
            .auth()
            .createUserWithEmailAndPassword(email, password)
        await createUser(
            { ...insertUserData, id: newUser.user!.uid },
            { email: email }
        )
        return {
            status: "success",
            message: `Account ${email} successfully created.`,
        }
    } catch (error) {
        return {
            status: "error",
            message: `Account ${email} could not be created: ${error.message}`,
        }
    }
}

export async function login(
    email: string,
    password: string
): Promise<DBResult<null>> {
    try {
        if (!validateEmail(email)) {
            return {
                status: "error",
                message: `Email ${email} is not valid.`,
            }
        } else if (!password) {
            return {
                status: "error",
                message: `Password is not valid.`,
            }
        } else {
            await db.auth().signInWithEmailAndPassword(email, password)

            return {
                status: "success",
                message: `${email} has been signed in.`,
            }
        }
    } catch (error) {
        console.error(`${email} could not be signed in: ${error.message}`)
        return {
            status: "error",
            message: `${email} could not be signed in: ${error.message}`,
        }
    }
}

export async function sendRecoveryEmail(
    email: string
): Promise<DBResult<null>> {
    if (!validateEmail(email)) {
        return {
            status: "error",
            message: `Email ${email} is not valid.`,
        }
    } else {
        try {
            await db.auth().sendPasswordResetEmail(email)
            return {
                status: "success",
                message: `${email} has been sent a recovery email.`,
            }
        } catch (e) {
            return {
                status: "error",
                message: `Failed to send ${email} a recovery email.`,
            }
        }
    }
}
