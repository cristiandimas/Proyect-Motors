const Repairs = require('../models/repairs.model');

exports.findAllRepairs = async (req, res) => {
  const repairs = await Repairs.findAll({
    where: {
      status: 'pending',
    },
  });
  res.json({
    status: 'success',
    message: 'Method GET Repairs Called',
    repairs,
  });
};

exports.findRepair = async (req, res) => {
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
};
exports.createRepairs = async (req, res) => {
  const { date, userId } = req.body;
  const newRepair = await Repairs.create({
    date,    
    userId,
  });
  res.json({
    status: 'success',
    message: 'The New Repair was been created',
    newRepair,
  });
};

exports.updateRepairs = async (req, res) => {
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
};
exports.deleteRepair = async (req, res) => {
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
};
