const express = require('express');
const { createBlogPost, getBlogPosts } = require('../controllers/post.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, createBlogPost);
router.get('/', auth, getBlogPosts);

module.exports = router;