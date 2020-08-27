import { GraphQLServer } from 'graphql-yoga';
import axios from 'axios';
// Scalar types
// object types

const server = new GraphQLServer({
    typeDefs:`
        type Query {
            agent: User!
            agents: [User!]!
        }

        type User {
            id: ID!
            name: String!
            age: Int
            married: Boolean!
            average: Float
        }
    `,
    resolvers:{
        Query:{
            agent:async()=>{
                const response = await axios.get('http://localhost:3004/users/1');
                return response.data
            },
            agents:async()=>{
                const response = await axios.get('http://localhost:3004/users');
                return response.data
            }   

        }
    }
});

server.start(()=>{
    console.log('And running running');
})