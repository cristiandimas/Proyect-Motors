const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Users = require('../models/users.model');
const { param } = require('express-validator');

exports.protect = catchAsync(async (req, res, next) => {
  //1.validar que el token venga
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  //2.verificar el token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );
  console.log(decoded);
  //3.verificar si el usuario existe
  const user = await Users.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });
  if (!user) {
    return next(new AppError('The owner of this token it not available', 401));
  }

  //4.verificar si el usuario ha cambiado la contraserña despues de que el token haya expirado.
  const changedTimePassword = parseInt(
    user.passwordChangedAt?.getTime() / 1000,
    10
  );

  if (decoded.iat < changedTimePassword) {
    return next(
      new AppError('User recently changed password, please login again', 401)
    );
  }
  req.sessionUser = user;
  next();
});

exports.protecUpdateAccount = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account', 401));
  }
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perfom the action!', 403)
      );
    }
    next();
  };
};
