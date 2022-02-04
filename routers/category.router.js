const express = require('express');
const { createCategory } = require('../controllers/category.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, createCategory);

module.exports = router;