const express = require('express');
const usersControllers = require('../controllers/users-controllers');
const { check } = require('express-validator');

const router = express.Router();

router.get('/:uid',usersControllers.getData);

router.post('/signup',[
  check('name').not().isEmpty(),
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({min:6}),
  check('aadhar').isLength({min:12})
], usersControllers.signup);

router.post('/login', usersControllers.login);

module.exports = router;
