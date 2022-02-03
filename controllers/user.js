const { User } = require('../models');
const { created } = require('../utils/dictionary/statusCode');

const createUser = async (req, res, next) => {
  console.log(req.body);
  const { displayName, email, password, image } = req.body;
  /* const { authorization: token } = req.headers; */

  try {
    await User.create({ displayName, email, password, image });

    return res.status(created).json({ message: 'tudo ok' });
  } catch (error) {
    next();
  }
};

module.exports = {
  createUser,
};