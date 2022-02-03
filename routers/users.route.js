const express = require('express');
const { createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', createUser);

module.exports = router;