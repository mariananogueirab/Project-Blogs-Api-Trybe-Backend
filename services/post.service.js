const Joi = require('joi');
const { badRequest } = require('../utils/dictionary/statusCode');
const errorHandling = require('../utils/functions/errorHandling');
const { BlogPosts, Category, User } = require('../models');
const { categoryIdsNotFound } = require('../utils/dictionary/messagesDefault');

const postSchema = Joi.object({
  title: Joi.string().not('').required(),
  content: Joi.string().not('').required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
});

const validatePost = (title, content, categoryIds) => {
  const { error } = postSchema.validate({
    title, content, categoryIds,
  });
  if (error) throw errorHandling(badRequest, error.message);
};

const validateCategory = async (categoryIds) => Promise.all(
    categoryIds.map(
      async (categoryId) => {
        const category = await Category.findOne({ where: { id: categoryId } });
        if (!category) throw errorHandling(badRequest, categoryIdsNotFound);
},
    ),
  );

const blogPostCreate = async (post) => {
  const { title, content, categoryIds, userId } = post;
  const published = new Date();
  const updated = new Date();
  validatePost(title, content, categoryIds);
  await validateCategory(categoryIds);

  const response = await BlogPosts
    .create({ title, content, categoryIds, userId, published, updated });

  return response.dataValues;
};

const findBlogPosts = async () => {
  const blogPosts = await BlogPosts.findAll({
    include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }],
  });

  return blogPosts;
};

module.exports = {
  blogPostCreate,
  findBlogPosts,
};