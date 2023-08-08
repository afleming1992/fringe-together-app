import { Group, GroupShowInterestType, PrismaClient, User } from '@prisma/client';
import { GraphQLContext } from '../../context';
import { getShow } from '@/lib/gql/show_remote';
import generateJoinCode from '../../util/joinCodeGenerator';

interface CreateGroupArgs {
    name: string
}

interface JoinGroupProps {
    joinCode: string
}

export interface UpdateShowInterestProps {
    groupId: number,
    showUri: string,
    type: InterestType,
    date?: Date
}

export interface UpdateGroupProps {
    groupId: number,
    name?: string | undefined,
    joinable?: boolean | undefined
}

export enum InterestType {
    NOT_INTERESTED = "NOT_INTERESTED",
    INTERESTED = "INTERESTED",
    INTERESTED_IN_DATE = "INTERESTED_IN_DATE",
    BOOKED = "BOOKED"
}

const addUserToGroup = (prisma: PrismaClient, groupId: number, user: User, isAdmin: boolean = false) => {
    return prisma.groupMembership.create({
        data: {
            groupId,
            userUid: user.uid,
            admin: isAdmin
        }
    })
}

const deleteInterestForShow = async (prisma: PrismaClient, groupShowId: number, userUid: string) => {
    return await prisma.groupShowInterest.deleteMany({
        where: {
            groupShowId,
            userUid
        }
    })
}

const getGroupUsingUser = async (prisma: PrismaClient, groupId: number, userUid: string): Promise<Group> => {
    const group = await prisma.group.findFirst({
        where: {
            id: groupId,
            members: {
                some: {
                    userUid
                }
            }
        }
    });

    if(group == null) {
        throw new Error("User is not a member of this group")
    }

    return group
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
    async updateShowInterest(parent: any, {groupId, showUri, type, date}: UpdateShowInterestProps, ctx: GraphQLContext) {
        if (!ctx.currentUser) {
            throw new Error("Unauthorised");
        }  

        const show = await getShow(showUri);
        
        const group = await getGroupUsingUser(ctx.prisma, groupId, ctx.currentUser.id);

        const showInfo = await ctx.prisma.showInfo.upsert({
            where: {
                uri: showUri
            },
            update: {
                imageUri: show.imageUri,
                time: show.time,
                duration: show.duration,
                date: show.date
            },
            create: {
                uri: showUri,
                title: show.title,
                location: show.location,
                imageUri: show.imageUri,
                time: show.time,
                duration: show.duration,
                date: show.date,
            }
        })

        const groupShow = await ctx.prisma.groupShow.findFirst({
            where: {
                show: {
                    uri: show.uri
                },
                group: {
                    id: group.id
                }
            }
        });

        if(type == InterestType.NOT_INTERESTED) {
            if(groupShow === null) {
                throw new Error("Can't be not interested in a non-existant show")
            } else {
                await deleteInterestForShow(ctx.prisma, groupShow.id, ctx.currentUser.id)
                return groupShow;
            }
        } 

        const dbType = GroupShowInterestType[type]

        const interestData = {
            type: dbType,
            date: date ?? undefined,
            userUid: ctx.currentUser.id
        }

        if(groupShow == null) {
            return await ctx.prisma.groupShow.create({
                data: {
                    groupId: group.id,
                    showUri: show.uri,
                    interest: {
                        create: [
                            interestData
                        ]
                    }
                },
                include: {
                    show: true
                }
            })
        } else {
            return await ctx.prisma.groupShow.update({
                where: {
                    id: groupShow.id
                },
                data: {
                    interest: {
                        upsert: {
                            where: {
                                groupShowId_userUid: {
                                    groupShowId: groupShow.id,
                                    userUid: ctx.currentUser.id
                                } 
                            },
                            update: {
                                type: dbType,
                                date: interestData.date
                            },
                            create: {
                                type: dbType,
                                userUid: ctx.currentUser.id,
                                date: interestData.date
                            }
                        }
                    }
                },
                include: {
                    show: true
                }
            })
        }
    },
    async joinGroup(parent: any, {joinCode}: JoinGroupProps, ctx: GraphQLContext) {
        if (!ctx.currentUser) {
            throw new Error("Unauthorised");
        }  

        const group = await ctx.prisma.group.findFirst({
            where: {
                joinCode
            }
        })

        if(!group) throw new Error("No Group Found");

        const groupMembership = await ctx.prisma.groupMembership.create({
            data: {
                groupId: group.id,
                userUid: ctx.currentUser.id,
                admin: false
            },
            include: {
                group: true
            }
        });

        if(!groupMembership) throw new Error("Failed to Add to Group");

        return group;
    },
    async updateGroup(parent: any, {groupId, name, joinable}: UpdateGroupProps, ctx:GraphQLContext) {
        if (!ctx.currentUser) {
            throw new Error("Unauthorised");
        }

        const group = await ctx.prisma.group.findFirstOrThrow({
            where: {
                id: groupId,
                members: {
                    some: {
                        userUid: ctx.currentUser.id,
                        admin: true
                    }
                }
            }
        });

        let joinCode = undefined;
        if(joinable !== undefined) {
            if(joinable && group.joinCode == null) {
                while(true) {
                    joinCode = generateJoinCode();
                    const group = await ctx.prisma.group.findFirst({
                        where: {
                            joinCode
                        }
                    });

                    if(!group) {
                        break;
                    }
                }
            } else if(!joinable) {
                joinCode = null;
            }
        }

        const updatedGroup = await ctx.prisma.group.update({
            where: {
                id: groupId
            },
            data: {
                name,
                joinable,
                joinCode
            }
        });

        return updatedGroup;
    }
}

export default mutators;
