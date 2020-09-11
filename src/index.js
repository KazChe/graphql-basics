import { GraphQLServer } from 'graphql-yoga'

//Demo user data

const users = [{
    id: '1',
    name: 'Kimia',
    email: 'kimia@probao.io',
    age: '14'
},
{
    id: '2',
    name: 'Kaz',
    email: 'kaz@probao.io',
    age: '54'
}
]

const posts = [{
    id: "2",
    title: "OPenShift",
    body: "Zoro What a post this is...",
    published: true,
    author: '1',
},{
    id: "123",
    title: "kubernetes on fire",
    body: "what an open kubernetes...?",
    published: false,
    author: '1',
},{
    id: "321",
    title: "gooz and hearts",
    body: "a question for all ages?",
    published: false,
    author: '2',
}]

const comments = [{
    id: "1000",
    text: "Really I am floored.",
    post: "2",
    author: "1"
}, {
    id: "1001",
    text: "My world how did I not know this?",
    post: "123",
    author: "1"
}, {
    id: "1002",
    text: "Thanks for sharing this, but...",
    post: "321",
    author: "2"
}, {
    id: "1003",
    text: "I never.",
    post: "123",
    author: "2"
}]


// Scalar types: String, Boolean, Int, Float, ID

// Type Definition (Schema)
const typeDefs = ` 
    type Query {
        greeting(name: String): String!
        me: User!
        post: Post!
        users(gooz: String): [User!]!
        posts(query: String): [Post!]!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]! 
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    
    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

// Resolvers
// By default parent, args, ctx, info => types of default arguments passed to resolvers
const resolvers = {
    Query: {
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            } else {
                return posts.filter( (post) => {
                    return post.body.toLowerCase().includes(args.query) || 
                    post.title.toLowerCase().includes(args.query)
                })
            }
        },
        users(parent, args, ctx, info) {
            if(!args.gooz) {
                return users
            } else {
                return users.filter( (user) => {
                    return user.name.toLowerCase().includes(args.gooz)
                })
            }
        },
        add(parent, args, ctx, info) {
            if(args.numbers.length === 0) {
                return 0
            } else {
                return args.numbers.reduce( (acc, val) => {
                    return acc + val
                })
            }
        },
        grades(parent, args, ctx, info) {
            return [99,70,100]
        },
        greeting(parent, args, ctx, info) {
            // console.log(info)
            if(args.name) {
                return args.name
            } else {
                return 'Oh hello'
            }  
        },
        me() {
            return {
                id: "bbb123",
                name: "Kimia",
                email: "kimia@kgk.com",
                age: 14
            }
        },

        post() {
            return {
                id: 'MaBakerMamamama321',
                title: 'Delving to abyss of things',
                body: 'It was a delightful day at the slaughter house for happ cows.',
                published: true
            }
        },
        comments(parent, args, ctx, info) {
                return comments
        }
    },
    // In gql playground when a posts with query is called gql calls the posts resolver
    // which returns an arrya of posts objects. In post object it sees author field
    // so what gql is gonna do is look at resolvers finds one with author()
    // associated with Post type. So now it knows that objects passed to the parent
    // are of type Post. So, now we can just return our users data then check for every post data
    // the author field (parent.author) that has same id as the user data (user.id)
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter  ((comment) => {
                return comment.post === parent.id;
            })
        }
    },
    // parent is User posts and comments are its properties etc
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                console.dir(parent)
                return comment.author === parent.id
            })
        }
    },
    Comment: { // think of as Type Comment
        author(parent, args, ctx, info) { // author as Comment.author property
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    },
        
}

const server = new GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

server.start(() => {
    console.log('GrapgQL Server Running...')
})