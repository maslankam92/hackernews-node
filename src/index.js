const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 0,
    description: 'First Link',
    url: 'www.first-link.com'
  }
];

let linksCount = links.length;

const resolvers = {
  Query: {
    info: () => 'this is string',
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link${linksCount++}`,
        description: args.description,
        url: args.url
      };

      links.push(link);

      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server is running on port 4000'));
