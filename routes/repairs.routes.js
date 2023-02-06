const { Router } = require('express');
const {
  findAllRepairs,
  createRepairs,
  updateRepairs,
  findRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');
const { validRepairsById } = require('../middlewares/repairs.middlewares');

const router = Router();

router.get('', findAllRepairs);
router.get('/:id', validRepairsById, findRepair);
router.post('', createRepairs);
router.patch('/:id', validRepairsById, updateRepairs);
router.delete('/:id', validRepairsById, deleteRepair);

module.exports = {
  repairsRouter: router,
};
