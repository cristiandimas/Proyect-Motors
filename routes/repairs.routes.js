const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllRepairs,
  createRepairs,
  updateRepairs,
  findRepair,
  deleteRepair,
  findAllRepairsCompleted,
} = require('../controllers/repairs.controller');
const { protect, restrictTo } = require('../middlewares/auth.middlewares');
const { validRepairsById } = require('../middlewares/repairs.middlewares');
const {
  validationFields,
} = require('../middlewares/validationFields.middlewares');

const router = Router();

/* Un middleware que se ejecuta antes que las demás rutas. */
router.use(protect);

router.get('', restrictTo('employee'), findAllRepairs);
router.get('/completed', findAllRepairsCompleted);
router.get('/:id', validRepairsById, restrictTo('employee'), findRepair);

/* Un middleware que valida los campos del formulario. */
router.post(
  '',
  [
    check('date', 'The date is require').not().isEmpty(),
    check('motorsNumber', 'The Motors Number is require').not().isEmpty(),
    check('motorsNumber', 'The engine number must be numerical').isNumeric(),
    check('description', 'Description cannot be empty').not().isEmpty(),
  ],
  validationFields,
  createRepairs
);
router.patch('/:id', validRepairsById, restrictTo('employee'), updateRepairs);
router.delete('/:id', validRepairsById, restrictTo('employee'), deleteRepair);

module.exports = {
  repairsRouter: router,
};
