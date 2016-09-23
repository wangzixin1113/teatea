var User = require('../Models/User').Model();


exports.signUp = function(req, res, next) {
    var userEntity = new User();
    console.log(req.body.name);
    console.log(req.body.password);
    console.log(req.body.email);
    // userEntity.name = req.body.name;
    // userEntity.password = req.body.password;
    // userEntity.email = req.body.email;
    // userEntity.save(function(err) {
    //     console.log(err)
    //     console.log('save success');
    // });
    res.end('signUp');
}

exports.login = function(req, res, next) {
    res.end('hello world');
}