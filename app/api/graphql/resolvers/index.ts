import { Query } from './Query';
import user from './Mutations/user';

const resolvers = {
    Query,
    Mutation: {
        ...user
    }
}

export default resolvers;