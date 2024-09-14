'use server'

import { clerkClient, EmailAddress } from "@clerk/nextjs/server"
import { parseStringify } from "../utils"

export const getClerkUsers = async ({ usersId }: { usersId: string[] }) => {
    try {
        const { data } = await clerkClient.users.getUserList({
            emailAddress: usersId
        })

        const users = data.map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            avatar: user.imageUrl
        }))

        const sortedUsers = usersId.map((email) => users.find((user) => user.email === email))

        return parseStringify(sortedUsers)
    } catch (error) {
        console.log(`Error fetching users: ${error}`)
    }
}