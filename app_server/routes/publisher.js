var express = require('express');
var controller = require('../controllers/main');
var router = express.Router();

router.post('/', controller.createPublisher);

router.get('/:publisherId', controller.viewPublisherBlogs);

router.get('/:publisherId/:blogId', controller.viewOneBlog);

//router.put('/:blogId', controller.updateBlog);

router.delete('/:blogId', controller.removeBlog);

module.exports = router;