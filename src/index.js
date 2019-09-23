import { GraphQLServer } from 'graphql-yoga';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const FIREBASE_URL = 'https://notate-2cc9c.firebaseio.com/';

// Type definitions
const typeDefs = `
    type Query {
        hello: String!
        note(id: ID!): Note

    }

    type Mutation {
        addNote(title: String!, body: String!): Note!
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

const firebaseConfig = {
    apiKey: "AIzaSyAf_UcvO_Qr9r0y8AU0G3Spyl0_1YwOBNc",
    authDomain: "notate-2cc9c.firebaseapp.com",
    databaseURL: "https://notate-2cc9c.firebaseio.com",
    projectId: "notate-2cc9c",
    storageBucket: "notate-2cc9c.appspot.com",
    messagingSenderId: "897587592469",
    appId: "1:897587592469:web:5c758189e76b02670cfd1c"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// GraphQL Server
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('Notate server started.');
});