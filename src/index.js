import { GraphQLServer } from 'graphql-yoga';

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
            agent(){
                return {
                    id: 1,
                    name:'Steve',
                    age: null,
                    married: true,
                    average: 4.5,
                }
            },
            agents(){
                return [
                    {
                        id: 1,
                        name:'Steve',
                        age: null,
                        married: true,
                        average: 4.5,
                    },
                    {
                        id: 1,
                        name:'Francis',
                        age: null,
                        married: true,
                        average: 4.5,
                    }
                ]
            }

        }
    }
});

server.start(()=>{
    console.log('And running running');
})