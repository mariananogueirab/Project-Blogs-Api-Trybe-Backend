const express = require('express');
const { createBlogPost, getBlogPosts, getBlogPostById } = require('../controllers/post.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, createBlogPost);
router.get('/', auth, getBlogPosts);
router.get('/:id', auth, getBlogPostById);

module.exports = router;