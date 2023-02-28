const Users = require('../models/users.model');
const AppError = require('../utils/appError');
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

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  /* Comparación de la contraseña actual con la contraseña del usuario. */
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  //generar los saltos de la encriptacion
  const salt = await bcrypt.genSalt(10);

  /* Cifrado de la nueva contraseña. */
  const encriptedPassword = await bcrypt.hash(newPassword, salt);
  await user.update({
    password: encriptedPassword,
    paswordChangedAt: new Date(),
  });

  res.status(200).json({
    status: 'success',
    message: 'The user password was updated successfull',
  });
});
