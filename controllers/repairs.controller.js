const Repairs = require('../models/repairs.model');
const Users = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repairs.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      status: 'pending',
    },
    include: [
      {
        model: Users,
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
        where: {
          status: 'available',
        },
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'Repairs found successfully',
    repairs,
  });
});
exports.findAllRepairsCompleted = catchAsync(async (req, res, next) => {
  const repairs = await Repairs.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      status: 'completed',
    },
    include: [
      {
        model: Users,
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
        where: {
          status: 'available',
        },
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'Repairs found successfully',
    repairs,
  });
});

exports.findRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    message: 'Repair found successfully',
    repair,
  });
});

exports.createRepairs = catchAsync(async (req, res, next) => {
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
});

exports.updateRepairs = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'The repair was been update',
  });
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  await repair.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: `The Repairs with id ${repair.id} was deleted`,
  });
});
