const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    id: {type: String, required: false}
});

module.exports = mongoose.model('Post', postSchema);