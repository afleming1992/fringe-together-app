import prisma from "@/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { authenticateUser } from "./auth"
import { User } from "@supabase/supabase-js"

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