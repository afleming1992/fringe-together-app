import { User } from "@prisma/client";
import { Context } from "../utils";
import { GraphQLContext } from "../context";
import { AnyMxRecord } from "dns";

export const Query = {
    async me(parent: any, args: any, ctx: GraphQLContext) {
        if(ctx.currentUser === null) {
            throw new Error("Unauthenticated");
        }

        return await ctx.prisma.user.findFirst({where: { uid: ctx.currentUser.uid }});
    },
    async groups(parent: any, args: any, ctx: GraphQLContext) {
        if(ctx.currentUser === null) {
            throw new Error("Unauthenticated");
        }

        return await ctx.prisma.group.findMany({
            where: {
                members: {
                    some: {
                        user_uid: ctx.currentUser.uid
                    }
                }
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                }
            }
        })
    },
    async group(parent: any, args: {id: number}, ctx: GraphQLContext) {
        if(ctx.currentUser === null) {
            throw new Error("Unauthenticated");
        }

        return await ctx.prisma.group.findFirst({
            where: {
                id: args.id,
                members: {
                    some: {
                        user_uid: ctx.currentUser.uid
                    }
                },
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                }
            }
        })
    }
}