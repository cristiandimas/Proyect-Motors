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
const { validRepairsById } = require('../middlewares/repairs.middlewares');
const { validationFields } = require('../middlewares/validationFields.middlewares');

const router = Router();

router.get('', findAllRepairs);
router.get('/completed', findAllRepairsCompleted);
router.get('/:id', validRepairsById, findRepair);
router.post(
  '',
  [
    check('date', 'The date is require').not().isEmpty(),
    check('motorsNumber', 'The Motors Number is require').not().isEmpty(),
    check('motorsNumber', 'The engine number must be numerical').isNumeric(),
    check('description', 'Description cannot be empty').not().isEmpty(),
  ],validationFields,
  createRepairs
);
router.patch('/:id', validRepairsById, updateRepairs);
router.delete('/:id', validRepairsById, deleteRepair);

module.exports = {
  repairsRouter: router,
};
