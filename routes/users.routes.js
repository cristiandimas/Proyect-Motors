const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  createUsers,
  updateUsers,
  findUser,
  deleteUser,
} = require('../controllers/users.controller');
const {
  validUserById,
  validUserByEmail,
} = require('../middlewares/users.middlewares');
const {
  validationFields,
} = require('../middlewares/validationFields.middlewares');

const router = Router();

router.get('/', findAllUsers);
router.get('/:id', validUserById, findUser);
router.post(
  '/',
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
router.patch(
  '/:id',
  [
    check('name', 'The name is require').not().isEmpty(),
    check('email', 'The email is require').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validationFields,
    validUserById,
  ],
  updateUsers
);
router.delete('/:id', validUserById, deleteUser);

module.exports = {
  usersRouter: router,
};
