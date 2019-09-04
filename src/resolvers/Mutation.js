const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { APP_SECRET, getUserId } = require('../utils');

const post = (root, args, context) => {
  const { url, description } = args;
  const userId = getUserId(context);

  return context.prisma.createLink({
    url,
    description,
    postedBy: { connect: { id: userId } }
  });
};

const signup = async (parent, args, context) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
};

const login = async (parent, args, context) => {
  const { email, password } = args;
  const user = await context.prisma.user({ email });

  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
};

module.exports = {
  post,
  signup,
  login
};
