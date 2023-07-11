import { gql } from "@apollo/client";
import apollo from '@/lib/apollo/client';
import { User } from "./user";
import { GroupShow, GroupShowInterestType } from "./types";

export interface Group {
    id: number
    name: string
    members: GroupMembership[]
    shows: GroupShow[]
}

export interface GroupMembership {
    admin: boolean
    user: User
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
    return data.group;
}

export const getGroupByIdQuery = gql`
    query getGroupById($groupId: Int!) {
        group(id: $groupId) {
            id
            name
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
            members {
                admin
                user {
                    firstName
                    lastName
                    profilePic
                }
            }
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