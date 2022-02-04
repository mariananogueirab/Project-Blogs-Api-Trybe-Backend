const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/category.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, createCategory);
router.get('/', auth, getAllCategories);

module.exports = router;