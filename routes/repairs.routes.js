const { Router } = require("express");
const { findAllRepairs, createRepairs, updateRepairs, findRepair, deleteRepair } = require("../controllers/repairs.controller");

const router = Router();

router.get('', findAllRepairs);
router.get('/:id', findRepair);
router.post('', createRepairs);
router.patch('/:id', updateRepairs);
router.delete('/:id', deleteRepair);

module.exports = {
  repairsRouter: router,
};