import { gql } from "@apollo/client";
import apollo from '@/lib/apollo/client';
import { User } from "./user";

export interface Group {
    id: number
    name: string
    members: GroupMembership
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