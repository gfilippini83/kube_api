var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
    return res.status(200).json({ message: "Welcome to the Express API template" })
})

module.exports = router; 