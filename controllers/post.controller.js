const { blogPostCreate } = require('../services/post.service');
const { created } = require('../utils/dictionary/statusCode');

const createBlogPost = async (req, res, next) => {
  const { id: userId } = req.user;
  const post = { ...req.body, userId };

  try {
    const blogPost = await blogPostCreate(post);

    return res.status(created).json(blogPost);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlogPost,
};