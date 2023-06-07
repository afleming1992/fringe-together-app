import gql from "graphql-tag";

const schema = gql`
type User {
    uid: ID!
    first_name: String!
    last_name: String!
}

type Query {
    user(uid: ID!): User
}

type Mutation {
    createUser(uid: ID!, first_name: String!, last_name: String!): User
}
`

export default schema;