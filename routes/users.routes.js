const { Router } = require("express");
const { findAllUsers, createUsers, updateUsers, findUser, deleteUser } = require("../controllers/users.controller");
const { validUserById, validUserByEmail } = require("../middlewares/users.middlewares");

const router = Router();

router.get('', findAllUsers);
router.get('/:id',validUserById, findUser);
router.post('',validUserByEmail, createUsers);
router.patch('/:id',validUserById, updateUsers);
router.delete('/:id',validUserById, deleteUser);

module.exports = {
  usersRouter: router,
};
