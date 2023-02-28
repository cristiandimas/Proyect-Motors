const { Router } = require('express');
const { check } = require('express-validator');
const { createUsers, login } = require('../controllers/auth.controller');
const { validUserByEmail } = require('../middlewares/users.middlewares');
const {
  validationFields,
} = require('../middlewares/validationFields.middlewares');

const router = Router();

router.post(
  '/signup',
  [
    check('name', 'The name is require').not().isEmpty(),
    check('email', 'The email is require').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password is require').not().isEmpty(),
    check('password', 'The password is not Alphanumeric').isAlphanumeric(),
    check(
      'password',
      'The password must be at least 6 characters long'
    ).isLength({ min: 6 }),
    validationFields,
    validUserByEmail,
  ],
  createUsers
);

router.post(
  '/login',
  [
    check('email', 'The email is require').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password is require').not().isEmpty(),
    validationFields,
  ],
  login
);

module.exports = {
  authRouter: router,
};
