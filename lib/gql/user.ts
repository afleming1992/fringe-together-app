import { gql } from "@apollo/client";

export const createUser = gql`
    mutation createUserWithVariables($first_name: String!, $last_name: String!) {
        createUser(first_name: $first_name, last_name: $last_name) {
            first_name
            last_name
            uid
        }
    }
`

export const getMe = gql`
    query getMe {
        me {
            first_name,
            last_name,
            uid
        }
    }
`