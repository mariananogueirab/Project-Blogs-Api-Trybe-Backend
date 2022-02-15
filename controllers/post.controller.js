const {
  blogPostCreate,
  findBlogPosts,
  findBlogPostById,
  /* updateBlogPost, */
} = require('../services/post.service');
const { created, success } = require('../utils/dictionary/statusCode');

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

const getBlogPosts = async (req, res, next) => {
  try {
    const blogPosts = await findBlogPosts();

    return res.status(success).json(blogPosts);
  } catch (error) {
    next(error);
  }
};

const getBlogPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blogPost = await findBlogPostById(id);

    return res.status(success).json(blogPost);
  } catch (error) {
    next(error);
  }
};

/* const update = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  const post = {
    ...req.body,
    userId,
    postId,
  };
  try {
    const blogPost = await updateBlogPost(post);

    return res.status(success).json(blogPost);
  } catch (error) {
    next(error);
  }
}; */

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  /* update, */
};