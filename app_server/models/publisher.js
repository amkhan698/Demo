const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publisherSchema = new Schema({
    name: String,
    publishingarea: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

const Publisher = mongoose.model('Publisher', publisherSchema);
module.exports = Publisher;