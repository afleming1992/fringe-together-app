import { createYoga, createSchema } from 'graphql-yoga'
import resolvers from './resolvers'
import { prisma } from '@/lib/prisma'
import supabase from '@/lib/supabase/server'
import typeDefs from './schema';
import { createContext } from './context';
import { create } from 'domain';

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