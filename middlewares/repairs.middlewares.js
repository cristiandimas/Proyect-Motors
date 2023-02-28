const Repairs = require('../models/repairs.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* A function that is exported to be used in other files. */
exports.validRepairsById = catchAsync(async (req, res, next) => {
  /* Desestructuración del id del objeto req.params. */
  const { id } = req.params;
  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  /* Si no se encuentra la reparación, devolverá un error. */
  if (!repair) {
    return next(new AppError('Repair not found', 404));
  }
  req.repair = repair;
  /* Una función que se utiliza para pasar el control a la siguiente función de middleware. */
  next();
});


