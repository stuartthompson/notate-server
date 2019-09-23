import { GraphQLServer } from "graphql-yoga";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig } from '../config';

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
      return "Hello, world!";
    },
    note(parent, state, ctx, info) {
      const { id } = state;
      console.log("Reading note with id: " + id);
      return {
        id: state.id,
        title: "Note Title",
        tags: ["test", "tag"],
        body: "Note body."
      };
    }
  }
};

// GraphQL Server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

// Testing
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

const noteId = 'VN3XA7yW3mhU1J6SA6HO';
let noteRef = db.collection('notes').doc(noteId);
let getNote = noteRef.get()
.then(note => {
    if (!note.exists) {
        console.log(`Note not found with id ${noteid}`);
    } else {
        console.log('Document data:', note.data());
    }
})
.catch(err => {
    console.log('Error getting document', err);
});

const port = process.env.PORT || 8080;

const options = {
  port
};

server.start(options, ({ port }) => {
  console.log(`Notate server started on port ${port}.`);
});
