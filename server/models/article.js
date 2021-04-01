const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        title: String,
        author: String,
        date: Number,
        coverPhoto: String,
        footer: String,
        rating: Number,
        comments: [
            {
                comment: String,
                datetime: Number,
                commenter: String,
                link: String
            }
        ],
        content: Array
    }
)

const Article = mongoose.model('Article', articleSchema)
module.exports = Article