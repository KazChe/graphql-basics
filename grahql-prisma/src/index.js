import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Subscription from './resolvers/Subscription'
import './prisma'

// websocket underneath and pass it to GraphQLServer during its initialization
const pubsub = new PubSub()


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    context: { // this is what is passed as contect/ctx used in mutations/subscriton/query etc
        db: db,
        pubsub,
        kimia: "Kimia is Kimi Kimia"
    },
    resolvers: {
        Query,
        User,
        Post,
        Comment,
        Mutation,
        Subscription
    }})

server.start(() => {console.log('GrapgQL Server Available on http://localhost:4000 ')})