import { Query } from './Query';
import user from './Mutations/user';
import group from './Mutations/group';

const resolvers = {
    Query,
    Mutation: {
        ...user,
        ...group
    }
}

export default resolvers;