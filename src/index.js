const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 0,
    description: 'First Link',
    url: 'www.first-link.com'
  }
];

const resolvers = {
  Query: {
    info: () => 'this is string',
    feed: () => links
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server is running on port 4000'));
