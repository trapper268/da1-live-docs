'use client'

import Loader from '@/components/Loader'
import { getClerkUsers, getDucumentUsers } from '@/lib/actions/user.action'
import { useUser } from '@clerk/nextjs'
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from '@liveblocks/react/suspense'
import { ReactNode } from 'react'

const Provider = ({ children }: { children: ReactNode }) => {
    const { user: clerkUser } = useUser()

    return (
        <LiveblocksProvider
            authEndpoint="/api/liveblocks-auth"
            resolveUsers={async ({ userIds }) => {
                const users = await getClerkUsers({ userIds })
                return users
            }}
            resolveMentionSuggestions={async ({ text, roomId }) => {
                const roomUsers = await getDucumentUsers({
                    roomId,
                    currentUser: clerkUser?.emailAddresses[0].emailAddress!,
                    text,
                })

                return roomUsers
            }}
        >

            <ClientSideSuspense fallback={<Loader />}>
                {children}
            </ClientSideSuspense>
        </LiveblocksProvider >
    )
}

export default Provider