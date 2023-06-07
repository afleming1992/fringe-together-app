import { gql } from "@apollo/client";

export const createUser = gql`
    mutation createUserWithVariables($uid: ID!, $first_name: String!, $last_name: String!) {
        createUser(first_name: $first_name, last_name: $last_name, uid: $uid) {
            first_name
            last_name
            uid
        }
    }
`