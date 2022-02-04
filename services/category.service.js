const Joi = require('joi');
const { Category } = require('../models');
const { categoryAlreadyExists } = require('../utils/dictionary/messagesDefault');
const { badRequest, conflict } = require('../utils/dictionary/statusCode');
const errorHandling = require('../utils/functions/errorHandling');

const categorySchema = Joi.object({
  name: Joi.string().not('').required(),
});

const validCategory = (name) => {
  const { error } = categorySchema.validate({
    name,
  });
  if (error) throw errorHandling(badRequest, error.message);
};

const categoryCreate = async (name) => {
  validCategory(name);

  const [category, created] = await Category.findOrCreate({
    where: { name },
    defaults: { name },
  });

  if (!created) throw errorHandling(conflict, categoryAlreadyExists);

  return category.dataValues;
};

module.exports = {
  categoryCreate,
};