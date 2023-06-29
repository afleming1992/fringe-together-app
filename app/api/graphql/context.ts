import prisma from "@/lib/prisma"
import { getClient as getShowApiClient } from "@/lib/show_api"
import { PrismaClient } from "@prisma/client"
import { authenticateUser } from "./auth"
import { User } from "@supabase/supabase-js"
import { ApolloClient, InMemoryCache } from "@apollo/client"

export type GraphQLContext = {
    prisma: PrismaClient,
    showApi: ApolloClient<InMemoryCache>,
    currentUser: User | null
}

export async function createContext(
    request: Request
): Promise<GraphQLContext> {
    return {
        prisma,
        showApi: getShowApiClient(),
        currentUser: await authenticateUser(request),
    }
}