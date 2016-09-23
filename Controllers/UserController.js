var User = require('../Models/User').Model();
var Logger = require('../Utils/Logger');

exports.signUp = Logger.WrapRequest(function(req, res, next) {
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
            res.json({ 'code': 1, 'message': 'registe sucessfully' });
        } else {
            Logger.PrintDocument(docs);
            res.json({ 'code': 0, 'message': 'email was registed' });
        }
    });
});

exports.login = function(req, res, next) {

    res.end('hello world');
}