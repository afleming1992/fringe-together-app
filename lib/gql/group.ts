import { gql } from "@apollo/client";
import apollo from '@/lib/apollo/client';
import { User } from "./user";
import { GroupShow, GroupShowInterestType } from "./types";

export interface Group {
    id: number
    name: string
    joinable: boolean
    joinCode: string | null
    members: GroupMembership[]
    shows: GroupShow[],
    membersMap: Map<string, User>
}

export interface GroupMembership {
    admin: boolean
    user: User
}

export const getMembersMap = (members: GroupMembership[]): Map<string, User> => {
    let map = new Map<string, User>();
    members.map((member) => {
        map.set(member.user.uid, member.user);
    })
    return map;
}

export const getGroups = async () => {
    const { data } = await apollo.query({
        query: getGroupsQuery
    });
    return data.groups;
}

export const getGroupById = async (id: number, invalidate: boolean = false): Promise<Group> => {
    const { data, error } = await apollo.query({
        query: getGroupByIdQuery,
        variables: {
            groupId: id
        }
    });
    if(error) {
        throw new Error(error.message);
    }

    return {
        ...data.group,
        membersMap: getMembersMap(data.group.members)
    }
}

export const getGroupByIdQuery = gql`
    query getGroupById($groupId: Int!) {
        group(id: $groupId) {
            id
            name
            joinCode
            joinable
            members {
                admin
                user {
                    uid
                    firstName
                    lastName
                    profilePic
                }
            },
            shows {
                show {
                    uri
                    title
                    location
                    imageUri
                }
                interest {
                    date
                    type
                    user {
                        uid
                    }
                }
            }
        }
    }
`

export const getGroupsQuery = gql`
    query getGroups {
        groups {
            id
            name
        }
    }
`   

export const addShowInterestMutation = gql`
    mutation updateShowInterest($groupId: Int!, $showUri: String!, $type: InterestType!) {
        addShowInterest(groupId: $groupId, showUri: $showUri, type: $type) {
            id,
            show {
                uri,
                title,
                location
            }
        }
    }
`

export const updateShowInterestMutation = gql`
    mutation updateShowInterest($groupId: Int!, $showUri: String!, $type: GroupShowInterestType!, $date: String) {
        updateShowInterest(groupId: $groupId, showUri: $showUri, type: $type, date: $date) {
            id,
            show {
                uri,
                title,
                location
            }
        }
    }
`

export const updateShowInterest = async(groupId: number, type: GroupShowInterestType, showUri: string, date?: Date | null): Promise<GroupShow> => {
    const { data, errors } = await apollo.mutate({
        mutation: updateShowInterestMutation,
        variables: {
            groupId: groupId,
            type,
            showUri,
            date,
        }
    })

    if(errors) {
        throw new Error(errors[0].message);
    }

    return data.updateShowInterest;
}

export const updateGroupMutation = gql`
    mutation updateGroupMutation($groupId: Int!, $name: String, $joinable: Boolean) {
        updateGroup(groupId: $groupId, name: $name, joinable: $joinable) {
            id,
            name,
            joinable,
            joinCode
        }
    }
`

export const updateGroup = async (groupId: number, name?: string, joinable?: boolean) : Promise<Group> => {
    const { data, errors } = await apollo.mutate({
        mutation: updateGroupMutation,
        variables: {
            groupId,
            name,
            joinable
        }
    })

    if(errors) {
        throw new Error(errors[0].message);
    }

    return data.updateGroup
}

export const joinGroupMutation = gql`
    mutation joinGroupMutation($joinCode: String!) {
        joinGroup(joinCode: $joinCode) {
            id,
            name
        }
    }
`

export const joinGroup = async (joinCode: string) : Promise<Group> => {
    const { data, errors } = await apollo.mutate({
        mutation: joinGroupMutation,
        variables: {
            joinCode
        }
    })

    if(errors) {
        throw new Error(errors[0].message)
    }

    return data.joinGroup;
}