import db from "~config/firebase-config"

import { User, InsertUser, UpdateUser, UserPrivate, DBResult } from "../models"

const usersRef = db.firestore().collection("users")

export async function createUser(
    user: InsertUser,
    userPrivate: UserPrivate
): Promise<DBResult<User>> {
    try {
        const dbUser: User = {
            ...user,
        }

        await usersRef.doc(user.id).set(dbUser)

        await usersRef
            .doc(user.id)
            .collection("UserPrivate")
            .doc("UserPrivate")
            .set(userPrivate)

        return {
            status: "success",
            message: `Successfully created user with id ${user.id}`,
            data: dbUser,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to create user with id ${user.id}: ${e}`,
        }
    }
}

export async function getUser(userId: string): Promise<DBResult<User>> {
    try {
        const user = await usersRef.doc(userId).get()
        return {
            status: "success",
            message: `Successfully returned user with id ${user.id}`,
            data: user.data() as User,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to get user with id ${userId}: ${e}`,
        }
    }
}

export async function getUserPrivate(
    userId: string
): Promise<DBResult<UserPrivate>> {
    try {
        const userPrivate = await usersRef
            .doc(userId)
            .collection("UserPrivate")
            .doc("UserPrivate")
            .get()
        return {
            status: "success",
            message: `Succesfully returned userPrivate`,
            data: userPrivate.data() as UserPrivate,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to get userPrivate`,
        }
    }
}

export async function updateUser(
    userId: string,
    updateUserData: UpdateUser
): Promise<DBResult<undefined>> {
    try {
        await usersRef.doc(userId).update({
            ...updateUserData,
        })
        return {
            status: "success",
            message: `Successfully updated user with id ${userId}`,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to update user with id ${userId}: ${e}`,
        }
    }
}

export async function deleteUser(userId: string): Promise<DBResult<undefined>> {
    try {
        await usersRef.doc(userId).delete()
        return {
            status: "success",
            message: `Successfully deleted user with id ${userId}`,
        }
    } catch (e) {
        console.error(e)
        return {
            status: "error",
            message: `Failed to delete user with id ${userId}: ${e}`,
        }
    }
}
