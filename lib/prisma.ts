import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {prisma: PrismaClient};

const prisma: PrismaClient =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });

export default prisma;