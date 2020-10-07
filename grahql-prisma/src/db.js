let users = [{
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

let posts = [{
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

let comments = [{
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

const db = {
    users,
    posts,
    comments
}

export { db as default }