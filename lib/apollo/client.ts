import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
    uri: "/api/graphql"
});

const gqlapi = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    }
});

export default gqlapi;