import gql from "graphql-tag";

const schema = gql`
type User {
    uid: ID!
    firstName: String!
    lastName: String!
    profilePic: String
}

type Group {
    id: Int!
    name: String
    members: [GroupMembership]
    shows: [GroupShow]
}

type GroupShow {
    id: Int!
    show: ShowInfo
    interest: [GroupShowInterest]
}

type GroupShowInterest {
    id: Int!
    type: GroupShowInterestType
    user: User
    date: String
}

type GroupMembership {
    group: Group
    user: User
    admin: Boolean
}

type Show {
    id: String!,
    uri: String!,
    title: String!,
    location: String,
    duration: String,
    description: String,
    showRun: String,
    availableShows: [String]
}

type ShowInfo {
    uri: String!
    title: String!
    location: String!
}

enum GroupShowInterestType {
    INTERESTED
    INTERESTED_IN_DATE
    BOOKED
}

type Query {
    me: User
    group(id: Int!): Group
    groups: [Group]
    show(uri: String!): Show
}

type Mutation {
    # User Mutations
    createUser(uid: ID!, first_name: String!, last_name: String!): User

    # Group Mutations
    createGroup(name: String!): Group
    addShowInterest(groupId: Int!, showUri: String!, type: GroupShowInterestType!, date: String): GroupShow
}
`

export default schema;