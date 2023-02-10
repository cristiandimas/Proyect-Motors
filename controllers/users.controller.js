const Users = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.findAll({
    where: {
      status: 'available',
    },
  });

  res.json({
    status: 'success',
    message: 'Method findAllUsers',
    users,
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  return res.status(200).json({
    status: 'success',
    message: 'Method findUser',
    user,
  });
});

exports.createUsers = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const newUser = await Users.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role: role.toLowerCase(),
  });
  res.status(200).json({
    status: 'success',
    message: 'Method createUsers',
    newUser,
  });
});

exports.updateUsers = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  const updateUser = await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'The User was been update',
    updateUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({
    status: 'unavailable',
  });
  res.status(200).json({
    status: 'success',
    message: `The User with id ${user.id} was been deleted`,
    user,
  });
});
