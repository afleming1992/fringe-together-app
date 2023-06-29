import { Show, getShow } from "@/lib/gql/show_remote";
import { GraphQLContext } from "../context";

export const Query = {
    async me(parent: any, args: any, ctx: GraphQLContext) {
        if(ctx.currentUser === null) {
            throw new Error("Unauthenticated");
        }

        return await ctx.prisma.user.findFirst({where: { uid: ctx.currentUser.id }});
    },
    async groups(parent: any, args: any, ctx: GraphQLContext) {
        if(ctx.currentUser === null) {
            throw new Error("Unauthenticated");
        }

        return await ctx.prisma.group.findMany({
            where: {
                members: {
                    some: {
                        user_uid: ctx.currentUser.id
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
                        user_uid: ctx.currentUser.id
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
    },
    async show(parent: any, args: {uri: string}, ctx: GraphQLContext) {
        if(ctx.currentUser === null) {
            throw new Error("Unauthenticated");
        }

        const show: Show = await getShow(args.uri);

        return show;
    }
}