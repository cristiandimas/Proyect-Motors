const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  updateUsers,
  findUser,
  deleteUser,
  updatePassword,
} = require('../controllers/users.controller');
const {
  validUserById,
  validUserByEmail,
} = require('../middlewares/users.middlewares');
const {
  validationFields,
} = require('../middlewares/validationFields.middlewares');

const router = Router();

/* Una ruta que encontrará a todos los usuarios. */
router.get('/', findAllUsers);
/* Una ruta que va a encontrar un usuario por id. */
router.get('/:id', validUserById, findUser);

/* Una solicitud de patch para actualizar el usuario. */
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

/* Una solicitud de patch para actualizar la contraseña del usuario. */
router.patch(
  '/password/:id',
  [
    check('currentPassword', 'The current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPassword', 'The new password must be mandatory ').not().isEmpty(),
    validationFields,
    validUserById,

  ],
  updatePassword
);

router.delete('/:id', validUserById, deleteUser);

module.exports = {
  usersRouter: router,
};
