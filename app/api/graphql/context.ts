import { prisma } from "@/lib/prisma"
import { PrismaClient, User } from "@prisma/client"
import { YogaInitialContext } from "graphql-yoga"
import { authenticateUser } from "./auth"

export type GraphQLContext = {
    prisma: PrismaClient,
    currentUser: User | null
}

export async function createContext(
    request: Request
): Promise<GraphQLContext> {
    return {
        prisma,
        currentUser: await authenticateUser(request),
    }
}