const models = require('../mongo');
const mongoose = require('mongoose');

exports.postComment = (req, res) => {
    const id = req.params.id;
    const comment = req.body
    console.log("ID:", id, "COMMENT:", comment)
    var data = models.ArticleModel.findOneAndUpdate({_id: id},{ $push : { comments: comment
        } }, function(err, results) {
        if(err) {
            return res.status(401).json(err);
        } else {

            return res.status(200).json({status: 'SUCCESS', message: 'comment has been successfully posted!'});
        }
    })
}

exports.postBlog = (req, res) => {
    var blog = req.body
    blog['_id'] = mongoose.Types.ObjectId(); 
    console.log("BLOG:", blog)
    var data = models.ArticleModel.insertMany(blog, function(err, result) {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json({status: 'SUCCESS', message: 'Blog has been successfully posted!'})
        }
    })
}