exports.requestMapper = function(app, upload) {
    var userModel = require('./Controllers/UserController')

    app.get('/', userModel.login);
    app.post('/signup', upload.array(), userModel.signUp);

}