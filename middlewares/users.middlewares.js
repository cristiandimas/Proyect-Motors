const Users = require('../models/users.model');

exports.validUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The User was not found',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.validUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (user && user.status === 'unavailable') {
      await user.update({ status: 'available' });
      return res.status(400).json({
        status: 'error',
        message:
          'El usuario tiene una cuenta, pero se encuentra inhabilitada, comuniquese con el administrador del sistema',
      });
    }
    if (user) {
      return res.status(400).json({
        status: 'error',
        message: 'El usuario ya se encuentra registrado',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
