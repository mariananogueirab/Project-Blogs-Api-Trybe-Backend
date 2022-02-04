const { userLogin } = require('../services/login.service');
const { success } = require('../utils/dictionary/statusCode');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await userLogin(email, password);

    return res.status(success).json({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  login,
};