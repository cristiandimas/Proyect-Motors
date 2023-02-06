const Repairs = require('../models/repairs.model');

exports.findAllRepairs = async (req, res) => {
  try {
    const repairs = await Repairs.findAll({
      where: {
        status: 'pending',
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Repairs found successfully',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.findRepair = async (req, res) => {
  try {
    const { repair } = req;

    return res.status(200).json({
      status: 'success',
      message: 'Repair found successfully',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
exports.createRepairs = async (req, res) => {
  try {
    const { date, motorsNumber, description, userId } = req.body;
    const newRepair = await Repairs.create({
      date,
      motorsNumber,
      description,
      userId,
    });
    res.status(200).json({
      status: 'success',
      message: 'The New Repair was been created',
      newRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.updateRepairs = async (req, res) => {
  try {
    const { repair } = req;

    await repair.update({ status: 'completed' });

    res.status(200).json({
      status: 'success',
      message: 'The repair was been update',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
exports.deleteRepair = async (req, res) => {
  try {
    const { repair } = req;
    await repair.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'success',
      message: `The Repairs with id ${repair.id} was deleted`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
