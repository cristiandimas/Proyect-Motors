const Users = require('../models/users.model');

exports.findAllUsers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.findUser = async (req, res) => {
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
    return res.status(200).json({
      status: 'success',
      message: 'Method findUser',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.createUsers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.updateUsers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.deleteUser = async (req, res) => {
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

    await user.update({
      status: 'unavailable',
    });
    res.status(200).json({
      status: 'success',
      message: `The User with id ${id} was been deleted`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
