const user = (parent, args, context) =>
  context.prisma.vote({ id: parent.id }).user();

const link = (parent, args, context) =>
  context.prisma.vote({ id: parent.id }).link();

module.exports = {
  user,
  link
};
