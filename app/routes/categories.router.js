const express = require('express');
const controller = require('../controllers/categories.controller')
const router = express.Router();

// methodes
router.get('/', controller.findAll);
router.delete('/:id', controller.deleteById);
router.post('/', controller.create);
router.put('/:id', controller.updateById);

module.exports = router;