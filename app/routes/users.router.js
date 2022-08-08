const express = require('express');
const controller = require('../controllers/users.controller');
const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.post('/auth', controller.authenticate);
router.post('/', controller.create);
router.put('/:id', controller.updateById);
router.delete('/:id', controller.deleteById);

module.exports = router;