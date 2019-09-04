const feed = async (parent, args, context) => {
  const { filter, skip, first, orderBy } = args;
  const where = filter
    ? {
        OR: [{ description_contains: filter }, { url_contains: filter }]
      }
    : {};

  return await context.prisma.links({
    where,
    skip,
    first,
    orderBy
  });
};

module.exports = {
  feed
};
