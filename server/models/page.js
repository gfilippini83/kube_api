const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        component: String
    }
)

const Page = mongoose.model('Page', pageSchema)
module.exports = Page