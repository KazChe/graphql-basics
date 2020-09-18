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
    }
}

export { Subscription as default }