import {v4 as uuidv4} from "uuid";

const Mutation =  {
    createUser(parent, args, { db }, info) {
        const emailToken = db.users.some((user) => {
            return user.email === args.data.email
        })
        if(emailToken) {
            throw new Error("email already exists.")
        }
        //use object spread operator
        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)
        return user
    },
    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) =>{
            return user.id === args.id
        })
        if(userIndex === -1) {
            throw new Error("User does not exist.")
        }
        const deletedUsers = db.users.splice(userIndex, 1) // delete from users array
        // remove posts and comments
        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id
            if(match) {
                db.comments = db.comments.filter((comment) => {
                    return comment.post !== post.id
                })
            }
            return !match
        })
        db.comments = db.comments.filter((comment) => comment.author !== args.id)

        // return User!
        return deletedUsers[0]

    },
    createPost(parent, args, { db }, info) {
        const userExists = db.users.some((user) =>{
            return user.id === args.data.author
        })
        if(!userExists) {
            throw new Error("User not found.")
        }
        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post);
        return post;
    },
    deletePost(parent, args, { db }, info) {
        const postIndex = db.posts.findIndex((post) => post.id === args.id)

        if (postIndex === -1) {
            throw new Error('Post not found')
        }

        const deletedPosts =  db.posts.splice(postIndex, 1)

        db.comments =  db.comments.filter((comment) => comment.post !== args.id)

        return deletedPosts[0]
    },
    createComment(parent, args, { db }, info){
        const userExists =  db.users.some((user) =>{
            return user.id === args.data.author
        })
        const postExists =  db.posts.some((post) =>{
            return post.id === args.data.post && post.published === true
        })
        if(!userExists || !postExists) {
            console.log("userExists", userExists, "postExists", postExists)
            throw new Error("something is forked.")
        }
        const comment = {
            id: uuidv4(),
            ...args.data
        }
        comments.push(comment)
        return comment
    },
    deleteComment(parent, args, { db }, info) {
        const commentIndex =  db.comments.findIndex((comment) => comment.id === args.id)

        if (commentIndex === -1) {
            throw new Error('Comment not found')
        }

        const deletedComments =  db.comments.splice(commentIndex, 1)

        return deletedComments[0]
    }
}

export { Mutation as default }