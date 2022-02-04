const Joi = require('joi');
const { User } = require('../models');
const { userAlreadyRegistered, usersNotFound, userNotFound } = require('../utils/dictionary/messagesDefault');
const { badRequest, conflict, notFound } = require('../utils/dictionary/statusCode');
const errorHandling = require('../utils/functions/errorHandling');
const { generateToken } = require('./authService');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().length(6).required(),
});

const validateUser = (displayName, email, password) => {
  const { error } = userSchema.validate({
    displayName,
    email,
    password,
  });
  if (error) throw errorHandling(badRequest, error.message);
};

const userCreate = async (newUser) => {
  const { displayName, email, password, image } = newUser;
  validateUser(displayName, email, password);

  const [user, created] = await User.findOrCreate({ 
    where: { email },
    defaults: { displayName, email, password, image } });

  if (!created) throw errorHandling(conflict, userAlreadyRegistered);
  const { password: _password, ...userWithoutPassword } = user.dataValues;

  const token = generateToken(userWithoutPassword);

  return token;
};

const findUsers = async () => {
  const users = await User.findAll({
    attributes: [
      'id',
      'displayName',
      'email',
      'image',
    ],
  });
  console.log('find users: ', users);

  if (!users) throw errorHandling(notFound, usersNotFound);

  return users;
};

const findUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: [
      'id',
      'displayName',
      'email',
      'image',
    ] });
  if (!user) throw errorHandling(notFound, userNotFound);
  return user;
};

module.exports = {
  userCreate,
  findUsers,
  findUserById,
};