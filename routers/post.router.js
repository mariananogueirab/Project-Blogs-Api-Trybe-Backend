const express = require('express');
const {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  /* update, */
} = require('../controllers/post.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, createBlogPost);
router.get('/', auth, getBlogPosts);
router.get('/:id', auth, getBlogPostById);
/* router.put('/:id', auth, update); */

module.exports = router;