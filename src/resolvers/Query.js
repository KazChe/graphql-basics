import db from '../db'

const Query =  {
    posts(parent, args, { db }, info) {
        if(!args.query) {
            return db.posts
        } else {
            return db.posts.filter( (post) => {
                return post.body.toLowerCase().includes(args.query) ||
                    post.title.toLowerCase().includes(args.query)
            })
        }
    },
    users(parent, args, { db }, info) {
        if(!args.gooz) {
            return db.users
        } else {
            return db.users.filter( (user) => {
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
    comments(parent, args, { db }, info) {
        return db.comments
    }
}

export { Query as default }