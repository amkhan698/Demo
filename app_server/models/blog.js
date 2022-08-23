const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
    },
    body: {
        type: String,
    },
    visible: {
        type: Boolean,
        default: true
    },
    comments: {
        type: String
    },
    ratings: Number
},  {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;