var express = require('express');
var router = express.Router();

const models = require('../mongo')

router.get('/test', function(req, res, next) {
    var data = models.PageModel.find(function(error, results) {
        if(error) {
            console.log("ERROR IN DB:", error)
        } else {
            console.log("RESULTS FROM DB:", results)
        }
    });
    return res.status(200).json({ message: "Welcome to the Express API template" })
})

router.get('/pages/:pageName', function(req, res, next) {
    const pageName = req.params.pageName;
    var data = models.PageModel.find({'component': pageName}, function(error, results) {
        if(error) {
            console.log("ERROR IN DB:", error)
            return res.status(401).json({ config: error })
        } else {
            return res.status(200).json({ config: results[0] })
        }
    });
})

router.get('/articles', function(req, res, next) {
    var data = models.ArticleModel.find({}, function(error, results) {
        if(error) {
            console.log("ERROR IN DB:", error)
            return res.status(401).json({ config: error })
        } else {
            return res.status(200).json(results)
        }
    });
})
router.get('/articles/:id',function(req, res, next) {
    const id = req.params.id;
    var data = models.ArticleModel.findById(id, function(err, results) {
        if(err) {
            return res.status(401).json(err);
        } else {
            return res.status(200).json(results);
        }
    })
})

module.exports = router; 