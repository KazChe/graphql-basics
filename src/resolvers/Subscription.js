const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0
            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count: count // match substription type Int and subscription name
                })
            }, 5000)
            return pubsub.asyncIterator('count') //channel name
        }
    },
    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info) {
            const post = db.posts.find((post) => post.id = postId)
            if(!post){
                throw new Error("Post Not Found.")
            }
            return pubsub.asyncIterator(`comment ${postId}`) // pick a naming convention
            // next we have to publish newly created comment
            // this will be done when the comment create mutation is run, see Mutations.createComment()
        }
    },
    post: {
        subscribe(parent, args, { db, pubsub, kimia }, info) {
            console.log(kimia)
            console.dir(info)
            return pubsub.asyncIterator('post')
            // next we have to publish newly created post
            // this will be done when the post create mutation is run, see Mutations.createPost()
        }

    }
}

export { Subscription as default }