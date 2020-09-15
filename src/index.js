import { GraphQLServer } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    context: {
        db: db
    },
    resolvers: {
        Query,
        User,
        Post,
        Comment,
        Mutation
    }})

server.start(() => {console.log('GrapgQL Server Available on http://localhost:4000 ')})