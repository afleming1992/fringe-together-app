import { Context } from "../../utils";

interface CreateUserArgs {
    uid: string
    first_name: string
    last_name: string
}

const mutators = {
    async createUser(parent: any,{uid, first_name, last_name}: CreateUserArgs, ctx: Context) {
        return await ctx.prisma.user.create({
            data: {
                uid,
                first_name,
                last_name
            }
        })
    }
}

export default mutators