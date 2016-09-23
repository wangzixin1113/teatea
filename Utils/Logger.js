var colors = require('colors');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

exports.PrintRequest = function(req) {
    console.log('Request Info Start'.grey);
    console.log(colors.info('HOST   :') + req.hostname);
    console.log(colors.info('FROM   :') + req.ip);
    console.log(colors.info('METHOD :') + req.method);
    console.log(colors.data('BODY   :'));
    console.log(colors.verbose(JSON.stringify(req.body)));
    console.log('Request Info End'.grey);
    console.log('');
}

exports.PrintResponse = function(res) {
    console.log('Response Info Start'.grey);
    console.log(colors.info('CODE   :') + res.body);
    console.log(colors.info('MESSAGE:') + res.body);
    console.log('Response Info End'.grey);
    console.log('');
    // console.log(colors.data('STATUS :') + res.status);
    // console.log(colors.data('DATA   :'));
}

exports.PrintDocument = function(docs) {
    console.log('Document Infos Start'.grey);
    docs.forEach(function(doc, index) {
        console.log(colors.info('DOCUMENT:'));
        console.log(colors.input('No.' + (index + 1) + ' doc'));
        console.log(colors.verbose(doc));
    }, this);
    console.log('Document Infos End'.grey);
    console.log('');
}

exports.WrapRequest = function(func) {
    return function(req, res, next) {
        exports.PrintRequest(req);
        func(req, res, next);
        exports.PrintResponse(res);
    }
}