var User = require('../Models/User').Model();
var Logger = require('../Utils/Logger');
var LOGTAG = 'UserController';

exports.signUp = function(req, res, next) {
    Logger.PrintRequest(req, LOGTAG);
    var resObj;
    User.find({ 'email': req.body.email }, function(err, docs) {
        if (docs.length == 0) {
            var userEntity = new User();
            userEntity.name = req.body.name;
            userEntity.password = req.body.password;
            userEntity.email = req.body.email;
            userEntity.save(function(err) {
                if (err) console.log(err)
                console.log('save success');
            });
            resObj = { 'code': 1, 'message': 'registe sucessfully' };
        } else {
            Logger.PrintDocument(docs);
            resObj = { 'code': 0, 'message': 'email was registed' };
        }
        Logger.PrintResponse(resObj);
        res.json(resObj);
    });
}

exports.login = function(req, res, next) {

    res.end('hello world');
}

exports.getUserList = function(req, res, next) {
    var resObj = [];
    User.find({}, function(err, docs) {
        if (docs.length != 0) {
            for (doc in docs) {
                var data = { 'name': doc.name, 'registedDate': doc.createDate };
                console.log(data);
                resObj.push(data);
            }
        } else resObj = { 'code': 0, 'message': 'none was registed' };
        res.json(resObj);
        Logger.PrintResponse(resObj);
    })
}