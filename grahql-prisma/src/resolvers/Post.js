// In gql playground when a posts with query is called gql calls the posts resolver
// which returns an arrya of posts objects. In post object it sees author field
// so what gql is gonna do is look at resolvers finds one with author()
// associated with Post type. So now it knows that objects passed to the parent
// are of type Post. So, now we can just return our users data then check for every post data
// the author field (parent.author) that has same id as the user data (user.id)

const Post = {
    author(parent, args, { db }, info) {
        return  db.users.find((user) => {
            return user.id === parent.author
        })
    },
    comments(parent, args, { db }, info) {
        return  db.comments.filter((comment) => {
            return comment.post === parent.id;
        })
    }
}

export { Post as default }