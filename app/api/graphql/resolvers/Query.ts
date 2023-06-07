import { User } from "@prisma/client";
import { Context } from "../utils";

export const Query = {
    async user(parent: any, args: {uid: string}, ctx: Context) {
        return await ctx.prisma.user.findFirst({where: { uid: args.uid }});
    }
}