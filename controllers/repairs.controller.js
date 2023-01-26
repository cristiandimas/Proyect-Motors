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
      message: 'Repairs was found successfully',
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
    const { id } = req.params;
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Method GET for find one repair for id',
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
    const { date, userId } = req.body;
    const newRepair = await Repairs.create({
      date,
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
    const { id } = req.params;
    // const { status } = req.body;
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }

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
    const { id } = req.params;
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }
    await repair.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'success',
      message: `The Repairs with id ${id} was deleted`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
