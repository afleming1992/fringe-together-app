import gql from "graphql-tag";

const schema = gql`
scalar DateTime

type User {
    uid: ID!
    firstName: String!
    lastName: String!
    profilePic: String
}

type Group {
    id: Int!
    name: String
    joinable: Boolean
    joinCode: String
    members: [GroupMembership]
    shows: [GroupShow]
}

type GroupShow {
    id: Int
    show: ShowInfo
    interest: [GroupShowInterest]
}

type GroupShowInterest {
    id: Int!
    type: GroupShowInterestType
    user: User
    date: DateTime
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
    availableShows: [String],
    imageUri: String,
    date: String,
    time: String
}

type ShowInfo {
    uri: String!
    title: String!
    location: String!
    imageUri: String,
    date: String,
    time: String,
    duration: String
}

enum GroupShowInterestType {
    NOT_INTERESTED
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
    createUser(uid: ID!, firstName: String!, lastName: String!): User

    # Group Mutations
    createGroup(name: String!): Group
    updateGroup(groupId: Int!, name: String, joinable: Boolean): Group
    updateShowInterest(groupId: Int!, showUri: String!, type: GroupShowInterestType!, date: String): GroupShow
    joinGroup(joinCode: String!): Group
}
`

export default schema;