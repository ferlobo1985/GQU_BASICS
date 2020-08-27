import { GraphQLServer } from 'graphql-yoga';

// Scalar types

const server = new GraphQLServer({
    typeDefs:`
        type Query {
           id: ID!
           name: String!
           age: Int
           married: Boolean!
           average: Float
        }
    `,
    resolvers:{
        Query:{
            id(){
                return 1
            },
            name(){
                return 'John'
            },
            age(){
                return 50
            },
            married(){
                return null
            },
            average(){
                return  3.5
            }
        }
    }
});

server.start(()=>{
    console.log('And running running');
})