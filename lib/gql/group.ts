import { gql } from "@apollo/client";
import apollo from '@/lib/apollo/client';
import { User } from "./user";

export interface Group {
    id: number
    name: string
    members: GroupMembership[]
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

export const getGroupById = async (id: number): Promise<Group> => {
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
                    first_name
                    last_name
                    profile_pic
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
                    first_name
                    last_name
                    profile_pic
                }
            }
        }
    }
`