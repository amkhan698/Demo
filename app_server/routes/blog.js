var express = require('express');
var router = express.Router();
var controller = require('../controllers/main');

router.get('/', controller.view);

router.post('/', controller.create);

router.get('/:blogId', controller.viewId);

router.put('/:blogId', controller.update);

router.delete('/:blogId', controller.erase);

module.exports = router;

