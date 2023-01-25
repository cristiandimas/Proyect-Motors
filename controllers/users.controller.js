const Users = require('../models/users.model');

exports.findAllUsers = async (req, res) => {
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
};

exports.findUser = async (req, res) => {
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
  return res.status(200).json({
    status: 'success',
    message: 'Method findUser',
    user,
  });
};

exports.createUsers = async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = await Users.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role: role.toLowerCase(),
  });
  res.json({
    status: 'success',
    message: 'Method createUsers',
    newUser,
  });
};

exports.updateUsers = async (req, res) => {
  const { name, email } = req.body;
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

  const updateUser = await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'The User was been update',
    updateUser,
  });
};

exports.deleteUser = async (req, res) => {
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

  await user.update({
    status: 'unavailable',
  });
  res.status(200).json({
    status: 'success',
    message: `The User with id ${id} was been deleted`,
    user,
  });
};
