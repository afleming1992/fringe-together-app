import { PrismaClient, User } from '@prisma/client';
import { GraphQLContext } from '../../context';
import { Context } from '../../utils';

interface CreateGroupArgs {
    name: string
}

interface AddMemberToGroupArgs {
    uid: string
    groupId: number
    isAdmin: boolean
}

const addUserToGroup = (prisma: PrismaClient, groupId: number, user: User, isAdmin: boolean = false) => {
    return prisma.groupMembership.create({
        data: {
            group_id: groupId,
            user_uid: user.uid,
            admin: isAdmin
        }
    })
}

const mutators = {
    async createGroup(parent: any, {name}: CreateGroupArgs, ctx: GraphQLContext) {
        if (!ctx.currentUser) {
            throw new Error("Unauthorised");
        }

        const group = await ctx.prisma.group.create({
            data: {
                name,
                members: {
                    create: [
                        {
                            user: {
                                connect: {
                                    uid: ctx.currentUser.uid
                                }
                            },
                            admin: true
                        }
                    ]
                }
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return group;
    }
}

export default mutators;