var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var router = require('./router');
var config = require('./config');
var dbHelper = require('./Utils/MongodbHelper');
var logger = require('./Utils/Logger');
var app = express();
var upload = multer(); //for multi-part/form-data

app.set('port', config.port);
app.set('views', path.join(__dirname, 'Views'));

app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(function(req, res, next) {
//     var chunk = logger.interceptResponse(res);
//     next();
//     logger.PrintRequest(req);
//     logger.PrintResponse(chunk);
// });

router.requestMapper(app, upload);

dbHelper.getMongo().Promise = global.Promise;
dbHelper.connect();

http.createServer(app)
    .listen(app.get('port'), function() {
        console.log("server listen on port " + app.get('port'));
    })