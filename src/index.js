const { GraphQLServer } = require('graphql-yoga');

const { prisma } = require('./generated/prisma-client');

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
    feed: async () => await prisma.links()
  },
  Mutation: {
    post: async (parent, args) => {
      const link = {
        description: args.description,
        url: args.url
      };

      const newLink = await prisma.createLink(link);
      console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);

      return newLink;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server is running on port 4000'));
