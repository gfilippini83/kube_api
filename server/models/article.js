const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        title: String,
        author: String,
        date: String,
        coverPhoto: String,
        footer: String,
        content: Array
    }
)

const Article = mongoose.model('Article', articleSchema)
module.exports = Article