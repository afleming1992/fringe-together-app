import { createYoga, createSchema } from 'graphql-yoga'
import resolvers from './resolvers'
import typeDefs from './schema';
import { createContext } from './context';

const { handleRequest } = createYoga({
    schema: createSchema({
        typeDefs: typeDefs,
        resolvers: resolvers
    }),
    graphqlEndpoint: '/api/graphql',
    fetchAPI: { Response },
    context: async ({request}) => {
        return createContext(request);
    }
});

export { handleRequest as GET, handleRequest as POST }