const Joi = require('joi');
const { Category } = require('../models');
const {
  categoryAlreadyExists,
  categoriesNotFound,
} = require('../utils/dictionary/messagesDefault');
const { badRequest, conflict, notFound } = require('../utils/dictionary/statusCode');
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

const findCategories = async () => {
  const categories = await Category.findAll();

  if (!categories) throw errorHandling(notFound, categoriesNotFound);

  return categories;
};

module.exports = {
  categoryCreate,
  findCategories,
};