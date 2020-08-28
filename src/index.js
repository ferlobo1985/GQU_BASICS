import { GraphQLServer } from 'graphql-yoga';
import axios from 'axios';
// Scalar types
// object types

const db = 'http://localhost:3004';

const server = new GraphQLServer({
    typeDefs:`
        type Query {
            agent(id:ID!): User!
            agents(name:String,age:Int): [User!]!
            posts:[Post!]!
            post(id:ID!): Post!
        }

        type User {
            id: ID!
            name: String!
            age: Int
            married: Boolean!
            average: Float
            posts: [Post!]!
        }

        type Post {
            id: ID!
            title:String!
            content:String!
            author: User!
        }
    `,
    resolvers:{
        Query:{
            agent:async(parent,args,context,info)=>{
                const response = await axios.get(`${db}/users/${args.id}`);
                return response.data
            },
            agents:async(parent,args,context,info)=>{
                const name = args.name != null ? `name=${args.name}`: '';
                const age = args.age != null ? `age=${args.age}`:''

                const response = await axios.get(`${db}/users?${name}&${age}`);
                return response.data
            },
            posts: async(parent,args,context,info)=>{
                const response = await axios.get(`${db}/posts`);
                return response.data
            },
            post:async(parent,args,context,info)=>{
                const response = await axios.get(`${db}/posts/${args.id}`);
                return response.data
            }
        },
        Post:{
            author:async(parent,args,context,info)=>{
                const response = await axios.get(`${db}/users/${parent.author}`);
                return response.data
            }
        },
        User:{
            posts:async(parent,args,context,info)=>{
                const response = await axios.get(`${db}/posts?author=${parent.id}`);
                return response.data
            }
        }
    }
});

server.start(()=>{
    console.log('And running running');
})