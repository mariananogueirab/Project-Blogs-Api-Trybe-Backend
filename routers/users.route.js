const express = require('express');
const { createUser, getAllUsers, getUser } = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', createUser);
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUser);

module.exports = router;