import { Query } from './Query';
import user from './Mutations/user';
import group from './Mutations/group';
import { DateTimeResolver } from 'graphql-scalars';

const resolvers = {
    Query,
    Mutation: {
        ...user,
        ...group,
    },
    DateTime: DateTimeResolver
}

export default resolvers;