import gql from "graphql-tag";

const schema = gql`
type User {
    uid: ID!
    first_name: String!
    last_name: String!
    profile_pic: String
}

type Group {
    id: ID!
    name: String
    members: [GroupMembership]
    # interested_events: [GroupEventInterest]
    # confirmed_events: [GroupConfirmedEvents]
}

type GroupMembership {
    group: Group
    user: User
    admin: Boolean
}

type Show {

}

type Query {
    me: User
    group(id: Int!): Group
    groups: [Group]
    showDetails: ShowDetails
}

type Mutation {
    createUser(uid: ID!, first_name: String!, last_name: String!): User
    createGroup(name: String!): Group
}
`

export default schema;