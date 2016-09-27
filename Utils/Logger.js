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
var printTag = exports.PrintTag = function(tag) {
    console.log(colors.silly(tag));
}

var print = exports.print = (tag, msg) => {
    console.log(colors.prompt(Date.now() + ' ') + colors.info(tag + ':') + colors.data(msg));
}


exports.PrintRequest = (req, tag) => {
    if (tag) printTag(tag);
    console.log('Request Info Start'.grey);
    console.log(colors.info('HOST   :') + req.hostname);
    console.log(colors.info('FROM   :') + req.ip);
    console.log(colors.info('METHOD :') + req.method);
    console.log(colors.data('BODY   :'));
    console.log(colors.verbose(JSON.stringify(req.body)));
    console.log('Request Info End'.grey);
    console.log('');
}

exports.PrintResponse = (res, tag) => {
    if (tag) printTag(tag);
    console.log('Response Info Start'.grey);
    console.log(colors.info('CODE:') + res.code);
    console.log(colors.info('MESSAGE:') + res.message);
    console.log('Response Info End'.grey);
    console.log('');
    // console.log(colors.data('STATUS :') + res.status);
    // console.log(colors.data('DATA   :'));
}

exports.PrintDocument = (docs, tag) => {
    if (tag) printTag(tag);
    console.log('Document Infos Start'.grey);
    docs.forEach(function(doc, index) {
        console.log(colors.info('DOCUMENT:'));
        console.log(colors.input('No.' + (index + 1) + ' doc'));
        console.log(colors.verbose(doc));
    }, this);
    console.log('Document Infos End'.grey);
    console.log('');
}

exports.WrapRequest = (func) => {
    return function(req, res, next) {
        exports.PrintRequest(req);
        func(req, res, next);
        exports.PrintResponse(res);
    }
}

exports.interceptResponse = (res) => {
    var oldWrite = res.write;
    var oldEnd = res.end;
    var oldJson = res.json;
    var chunks = [];

    res.write = (chunk) => {
        chunks.push(chunk);
        oldWrite.apply(res, arguments);
    };
    res.json = (chunk) => {
        chunks.push(chunk);
        oldJson.apply(res, arguments);
    }
    res.end = (chunk) => {
        if (chunk) chunks.push(chunk);
        oldEnd.apply(res, arguments);
    };
    return chunks;
}