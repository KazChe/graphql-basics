## GraphQL Basics 

- Building a out a simple GraphQL application from scratch
- Uses graphql-yoga
- For Subscription `graphql-subscriptions`

#### Build

- `npm i`
- `npm start` - starts up with nodemon
- Go to http://localhost:4000 (GraphQL Playground)
- The code in the root covers basic from-scratch graphql concepts
- Code under graphql-prisma includes integration with Postgres db deployed in Heroku, adds Prisma running as Docker cotainer
and I build Types covered in the from-scratch-code base.
- Uses [prisma-bindings](https://github.com/prisma-labs/prisma-binding) to interact with nodejs bindings
- Uses [graphql-cli](https://github.com/Urigo/graphql-cli#readme)
- Note for setting up graphql-cli this is what worked for me:

```
Make sure you're on latest Node version

1. install graphql-codegen

yarn add @graphql-cli/codegen @graphql-codegen/schema-ast --dev

OR install it globally, your choice -

yarn global add graphql-cli graphql-codegen

I had issues executing local dev-dependencies from mac bash, so installed it globally as bash looks at user/bin for the package to execute.



2. Inside root folder graphql-prisma, create codegen.yml, with the following contents -

schema: http://localhost:4466
extensions:
  codegen:
    generates:
      ./src/generated/prisma.graphql:
        plugins:
          - schema-ast


3. Add following script to package.json -

"get-schema": "graphql-codegen --config ./codegen.yml"



4. On mac bash (terminal command-line) -

yarn get-schema
```

