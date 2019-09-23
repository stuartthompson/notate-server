import { GraphQLServer } from 'graphql-yoga';

// Type definitions
const typeDefs = `
    type Query {
        hello: String!
        note(id: ID!): Note

    }

    type Note {
        id: ID!
        title: String!
        tags: [String!]!
        body: String
    }
`;

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'Hello, world!'
        },
        note(parent, state, ctx, info) {
            const { id } = state;
            console.log("Reading note with id: " + id);
            return {
                id: state.id,
                title: "Note Title",
                tags: ["test", "tag"],
                body: "Note body."
            }
        }
    }
}

// GraphQL Server
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('Notate server started.');
});