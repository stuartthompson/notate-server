import { GraphQLServer } from 'graphql-yoga';

// Type definitions
const typeDefs = `
    type Query {
        hello: String!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'Hello, world!'
        }
    }
}

// Server
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('Notate server started.');
});