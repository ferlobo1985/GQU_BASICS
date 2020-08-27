import { GraphQLServer } from 'graphql-yoga';

const server = new GraphQLServer({
    typeDefs:`
        type Query {
            start: String!
        }
    `,
    resolvers:{
        Query:{
            start(){
                return 'We are starting'
            }
        }
    }
});

server.start(()=>{
    console.log('And running running');
})