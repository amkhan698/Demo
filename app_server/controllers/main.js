var Blog = require('../models/blog');
var Publisher = require('../models/publisher');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
}

module.exports.adminView = function(req,res){
    Publisher.find({}).
        exec(function(err, publishers){
            if(!publishers){
                sendJsonResponse(res, 404, {
                    "message": "No Publishers found" 
                });
                return;
            }
            else if(err){
                sendJsonResponse(res,404, err);
                return;
            }
            sendJsonResponse(res, 200, publishers);
        });
}

module.exports.adminViewPublisherId = function(req,res){
    var id = req.params.publishedId;
    Publisher.findById(id).
        exec(function(err, publisher){
            if(!publisher){
                sendJsonResponse(res, 404, {
                    "message" : "Publisher not found"
                });
                return;
            }
            else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log('Blogs: ', publisher.blogs);
            sendJsonResponse(res, 200, publisher.blogs);
        });
}

module.exports.adminViewPublisherIdBlog = function(req,res){
    var pubId = req.params.publishedId;
    var blogId = req.params.blogId;
    Publisher.findById(pubId).
        exec(function(err, publisher){
            if(!publisher){
                sendJsonResponse(res, 404, {
                    "message" : "Publisher not found"
                });
                return;
            }
            else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            Blog.findById(blogId).
                exec(function(err, blog){
                    if(!blog)
                    {
                        sendJsonResponse(res, 404, {
                            "message" : "Blog not found"
                        });
                        return;
                    }
                    else if(err){
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    console.log('Blog: ', blog);
                    sendJsonResponse(res, 200, blog);
                });
                
        });
}

module.exports.adminModerateBlog = function(req,res){
    const id = req.params.blogId;
    const blog = req.body;

    if(!blog){
        sendJsonResponse(res,400, {
            "message": "There must be some body to update it"
        });
        return;
    }

    Blog.findByIdAndUpdate(id, {$set: blog}, {new:true}, 
        function(err, updatedBlog){
            if(!updatedBlog){
                sendJsonResponse(res, 404, {
                    "message": "blog does not exist"
                });
                return;
            }
            else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, updatedBlog);
        });
}

module.exports.adminRemovePublisher = function(req,res){
    const id = req.params.publisherId;
    console.log('The id is', id);

    Publisher.findByIdAndDelete(id, function(err){
        if(err){
            sendJsonResponse(res, 404, err);
            return;
        }
        sendJsonResponse(res, 204, null);
    });
}

module.exports.view = function(req,res){
    Blog.find({visible: true}).
        exec(function(err, blogs){
            if(!blogs){
                sendJsonResponse(res,404, {
                    "message": "blogs not found"
                });
                return;
            }
            else if(err){
                sendJsonResponse(res,404, err);
            }
            console.log('The result is: ', blogs);
            sendJsonResponse(res,200, blogs);
        });
}

module.exports.create = function(req,res){
    const blog = new Blog(req.body);
    blog.save(function(err){
        if(err){
            sendJsonResponse(res, 400, err);
            return;
        }
        sendJsonResponse(res, 201, blog);
    });
}

module.exports.viewId = function(req,res){
    const id = req.params.blogId;
    console.log('The id is', id);

    Blog.findById(id).
        exec(function(err, blog){
            if(!blog){
                sendJsonResponse(res, 404, {
                    "message": "Blog does not exist"
                });
                return;
            }
            else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log('The blog is ', blog);
            sendJsonResponse(res, 200, blog);
        });
}

module.exports.update = function(req,res){
    const id = req.params.blogId;
    const blog = req.body;

    if(!blog){
        sendJsonResponse(res,400, {
            "message": "There must be some body to update it"
        });
        return;
    }

    Blog.findByIdAndUpdate(id, {$set: blog}, {new:true}, 
        function(err, updatedBlog){
            if(!updatedBlog){
                sendJsonResponse(res, 404, {
                    "message": "blog does not exist"
                });
                return;
            }
            else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, updatedBlog);
        });
}

module.exports.erase = function(req,res){
    const id = req.params.blogId;
    Blog.findByIdAndDelete(id, function(err){
        if(err){
            sendJsonResponse(res,404, err);
            return;
        }
        sendJsonResponse(res, 204, null);
    });
}

module.exports.createPublisher = function(req,res){
    const publisher = new Publisher(req.body);
    publisher.save(function(err){
        if(err){
            sendJsonResponse(res, 400, err);
            return;
        }
        sendJsonResponse(res, 201, publisher);
    });
}

module.exports.viewPublisherBlogs = function(req,res){
    var pubId = req.params.publisherId;
    Publisher.findById(pubId).
    exec(function(err, publisher){
        if(!publisher){
            sendJsonResponse(res, 404, {
                "message" : "Publisher not found"
            });
            return;
        }
        else if(err){
            sendJsonResponse(res, 404, err);
            return;
        }
        console.log('Blogs: ', publisher.blogs);
        sendJsonResponse(res, 200, publisher);
    });
}

module.exports.viewOneBlog = function(req,res){
    var pubId = req.params.publishedId;
    var blogId = req.params.blogId;
    Publisher.findById(pubId).
        exec(function(err, publisher){
            if(!publisher){
                sendJsonResponse(res, 404, {
                    "message" : "Publisher not found"
                });
                return;
            }
            else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            Blog.findById(blogId).
                exec(function(err, blog){
                    if(!blog)
                    {
                        sendJsonResponse(res, 404, {
                            "message" : "Blog not found"
                        });
                        return;
                    }
                    else if(err){
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    console.log('Blog: ', blog);
                    sendJsonResponse(res, 200, blog);
                });
                
        });
}



module.exports.removeBlog = function(req,res){
    const id = req.params.blogId;
    Blog.findByIdAndDelete(id, function(err){
        if(err){
            sendJsonResponse(res,404, err);
            return;
        }
        sendJsonResponse(res, 204, null);
    });
}