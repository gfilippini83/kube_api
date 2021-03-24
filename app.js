var logger = require('morgan');
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var indexRouter = require('./server/routes/index');
var https = require('https');
var fs = require('fs');
var app = express();

app.use(logger('dev'))
   .use(cors())
   .use(express.json())
   .use(express.urlencoded({extended: true}))
   .use(cookieParser())
   .use('/api/v1', indexRouter)

const port = process.env.PORT || 3000;

function startServer() {
    app.angularFullStack = app.listen(port, '0.0.0.0', function () {
        console.log("Backend is listening on 0.0.0.0 and port %d", port)
    })
}

setImmediate(startServer)

module.exports = app;