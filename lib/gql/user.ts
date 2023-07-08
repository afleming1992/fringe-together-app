import { gql } from "@apollo/client";

export interface User {
    uid: string,
    firstName: string,
    lastName: string
    profilePic: string | null
}

export const createUser = gql`
    mutation createUserWithVariables($uid: ID!, $firstName: String!, $lastName: String!) {
        createUser(uid: $uid, firstName: $firstName, lastName: $lastName) {
            firstName
            lastName
            uid,
        }
    }
`

export const getMe = gql`
    query getMe {
        me {
            firstName,
            lastName,
            uid,
            profilePic
        }
    }
`