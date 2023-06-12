import { gql } from "@apollo/client";

export const getGroups = gql`
    query getGroups {
        groups {
            id
            members {
                admin
                user {
                    first_name
                    last_name
                    profile_pic
                }
            }
            name
        }
    }
`