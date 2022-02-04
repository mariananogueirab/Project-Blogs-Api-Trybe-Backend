const express = require('express');
const { createUser, getAllUsers } = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', createUser);
router.get('/', auth, getAllUsers);

module.exports = router;