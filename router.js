exports.requestMapper = function(app, upload) {
    var userModel = require('./Controllers/UserController');
    var lensFetcher = require('./Controllers/LensPriceFetcher');

    app.get('/', userModel.login);
    app.get('/alluser', userModel.getUserList);
    app.post('/signup', upload.array(), userModel.signUp);


    app.get('/lensprice', lensFetcher.fetchPrices);
}