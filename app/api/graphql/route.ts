import { createYoga, createSchema } from 'graphql-yoga'
import resolvers from './resolvers'
import { prisma } from '@/lib/prisma'
import supabase from '@/lib/supabase/server'
import typeDefs from './schema';



const { handleRequest } = createYoga({
    schema: createSchema({
        typeDefs: typeDefs,
        resolvers: resolvers
    }),
    graphqlEndpoint: '/api/graphql',
    fetchAPI: { Response },
    context: async ({request}) => {
        return {
            request,
            prisma,
            supabase
        }
    }
});

export { handleRequest as GET, handleRequest as POST }