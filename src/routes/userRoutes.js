const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');
const validateUserFields = require('../middlewares/validateUserFields');
const router = express.Router();

router.post('/signup', validateUserFields, createUser);
router.post('/login', validateUserFields, loginUser);

module.exports = router;
