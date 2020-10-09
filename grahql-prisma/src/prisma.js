import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 1));
//     // console.dir(JSON.stringify(data));
// })

// // prisma.query.comments(null, '{  id text  author { name } }').then(data => {
// //     console.log(JSON.stringify(data, undefined ,2));
// // })
//

// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL 101",
//         body: "",
//         published: false,
//         author: {
//             connect: {
//                 id: "ckfucxhg201lr074788kvg9xe"
//             }
//         }
//     }
// }, '{ id title body published }').then((data) => {
//     console.log(data)
//     return prisma.query.users(null, '{ id name posts { id title } }')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// }) ckg2kmq8500iz084742hb8m3m

prisma.mutation.updatePost({
    where: {
        id: "ckg2kmq8500iz084742hb8m3m"
    },
    data: {
        body: "This is how to get started with Graphql...",
        published: true
    }
}, '{ id }').then((data) => {
    return prisma.query.posts(null, '{ id title body published }')
}).then((data) => {
    console.log(data)
})