import { GroupShowInterestType, PrismaClient, User } from '@prisma/client';
import { GraphQLContext } from '../../context';
import { Context } from '../../utils';
import { createTextChangeRange } from 'typescript';
import { group } from 'console';

interface CreateGroupArgs {
    name: string
}

interface AddMemberToGroupArgs {
    uid: string
    groupId: number
    isAdmin: boolean
}

export interface AddShowProps {
    type: GroupShowInterestType,
    groupId: number,
    showUri: string,
    date?: Date
}

export enum AddShowType {
    INTERESTED = "INTERESTED",
    INTERESTED_IN_DATE = "INTERESTED_IN_DATE",
    BOOKED = "BOOKED"
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

const confirmUserInGroup = async (prisma: PrismaClient, groupId: number, user_uid: string) => {
    const groupMembership = await prisma.groupMembership.findFirst({
        where: {
            group_id: groupId,
            user_uid: user.uid
        }
    });

    if(groupMembership == null) {
        throw new Error("User is not a member of this group")
    }
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
                                    uid: ctx.currentUser.id
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
    },
    async addShowInterest(parent: any, {groupId, showUri, type, date}: AddShowProps, ctx: GraphQLContext) {
        if (!ctx.currentUser) {
            throw new Error("Unauthorised");
        }  

        if (type != AddShowType.INTERESTED && date == null) {
            throw new Error("Date is required if INTERESTED_IN_DATE or BOOKED")
        }
        
        confirmUserInGroup(ctx.prisma, groupId, ctx.currentUser.id);
        
        const showInterest = await ctx.prisma.groupShowInterest.create({
            data: {
                type,
                showUri,
                date: date?.toISOString(),
                user_uid: ctx.currentUser.id,
                group_id: groupId
            },
            include: {
                group: true
            }
        });

        return showInterest;
    }
}

export default mutators;