import { Show, getShow } from "@/lib/gql/show_remote";
import { GraphQLContext } from "../context";
import { GroupShow } from "@/lib/gql/types";
import { GroupShowInterest } from "@prisma/client";

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
                        userUid: ctx.currentUser.id
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

        return ctx.prisma.group.findFirst({
            where: {
                id: args.id,
                members: {
                    some: {
                        userUid: ctx.currentUser.id
                    }
                },
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                },
                shows: {
                    include: {
                        show: true,
                        interest: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
    },
    async show(parent: any, args: {uri: string}, ctx: GraphQLContext) {
        if(ctx.currentUser === null) {
            throw new Error("Unauthenticated");
        }

        const show: Show = await getShow(args.uri);

        return show;
    }
}