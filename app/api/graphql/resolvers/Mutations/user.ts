import { Context } from "../../utils";

interface CreateUserArgs {
    uid: string
    firstName: string
    lastName: string
}

const mutators = {
    async createUser(parent: any,{uid, firstName, lastName}: CreateUserArgs, ctx: Context) {
        return await ctx.prisma.user.create({
            data: {
                uid,
                firstName,
                lastName
            }
        })
    }
}

export default mutators