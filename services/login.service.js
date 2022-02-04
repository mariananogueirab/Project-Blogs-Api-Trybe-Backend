const Joi = require('joi');
const { User } = require('../models');
const { invalidEntry } = require('../utils/dictionary/messagesDefault');
const { badRequest } = require('../utils/dictionary/statusCode');
const errorHandling = require('../utils/functions/errorHandling');
const { generateToken } = require('./authService');

const loginSchema = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().length(6).required(),
});

const validateLogin = (email, password) => {
  const { error } = loginSchema.validate({
    email,
    password,
  });
  if (error) throw errorHandling(badRequest, error.message);
};

const userLogin = async (email, password) => {
  validateLogin(email, password);

  const userFound = await User.findOne({ where: { email } });
  console.log(userFound);

  if (userFound == null) throw errorHandling(badRequest, invalidEntry);

  const { password: _password, ...userWithoutPassword } = userFound.dataValues;

  const token = generateToken(userWithoutPassword);

  return token;
};

module.exports = {
  userLogin,
};