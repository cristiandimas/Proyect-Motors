const Repairs = require('../models/repairs.model');

exports.validRepairsById = async (req, res, next) => {
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
        message: 'Repair not found',
      });
    }
    req.repair = repair;
    next();
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
