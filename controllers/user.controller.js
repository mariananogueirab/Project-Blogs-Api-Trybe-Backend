const { userCreate, findUsers } = require('../services/user.service');
const { created, success } = require('../utils/dictionary/statusCode');

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await userCreate(user);

    return res.status(created).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await findUsers();

    return res.status(success).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
};