var express = require('express');
var controller = require('../controllers/main');
const { route } = require('./users');

var router = express.Router();

router.get('/', controller.adminView);

router.get('/:publisherId', controller.adminViewPublisherId);

router.get('/:publisherId/:blogId', controller.adminViewPublisherIdBlog);

router.put('/:blogId', controller.adminModerateBlog);

router.delete('/:publisherId', controller.adminRemovePublisher);

module.exports = router;