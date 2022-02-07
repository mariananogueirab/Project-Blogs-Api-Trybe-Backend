const express = require('express');
const { createBlogPost } = require('../controllers/post.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, createBlogPost);

module.exports = router;