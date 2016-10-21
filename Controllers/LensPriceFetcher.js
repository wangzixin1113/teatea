var Lens = require('../Models/Lens').Model();
var Logger = require('../Utils/Logger');
var LOGTAG = 'LensPriceFetcher';

//node_modules dependencies
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var jsonp = require('superagent-jsonp');

//links
var jdLensUrl = 'http://list.jd.com/list.html?cat=652,654,834&trans=1&JL=6_0_0&ms=6&page=';
var jdPriceUrl = 'http://p.3.cn/prices/get?&skuid=J_';
var pageMax;

//define a function save data to mongodb
var saveDate = ($) => {
    var lensList = [];
    $('.j-sku-item').each((idx, item) => {
        var lens = { 'name': '', 'sku': '', 'price': '' };
        var $item = $(item);
        lens.sku = $item.attr('data-sku');
        lens.name = $item.find('.p-name em').text();
        //  console.log($(item).attr('data-sku'));

        superagent.get(jdPriceUrl + lens.sku)
            .end((err, res) => {
                if (res.text) {
                    Logger.print(LOGTAG, 'Url:' + jdPriceUrl + lens.sku);
                    Logger.print(LOGTAG, 'Res.tx:' + res.text);
                    var obj = JSON.parse(res.text)[0];
                    if (typeof obj === 'object' && typeof obj.p != "undefined") {
                        lens.price = obj.p;
                        lensList.push(lens);
                        Logger.print(LOGTAG, 'Lens Has Price:' + lens);
                    }
                    Lens.findOne({ 'id': lens.sku, 'source': 'JD' }, (err, doc) => {
                        if (doc) {
                            var today = { 'price': lens.price, 'date': Date.now() };
                            console.log(JSON.stringify(today));
                            doc.days.push(today);
                            doc.price = lens.price;
                            //doc.editDate = new Date;
                            doc.save((err) => {
                                if (err) Logger.print(LOGTAG, 'err eccur' + err + 'sku:' + lens.sku);
                                else { Logger.print(LOGTAG, 'updated 1 data' + doc); }
                            });
                        } else {
                            var lensEntity = new Lens();
                            lensEntity.name = lens.name;
                            lensEntity.price = lens.price;
                            lensEntity.id = lens.sku;
                            lensEntity.source = 'JD';
                            lensEntity.created = Date.now();
                            lensEntity.days.push({ 'price': lens.price, 'date': Date.now() });
                            lensEntity.save((err) => {
                                if (err) Logger.print(LOGTAG, err);
                                Logger.print(LOGTAG, 'inserted 1 data' + lensEntity);
                            });
                        }
                    });
                }
            });
    });
};

//define a function fetch url, then call saveDate
var fetchUrl = (url, callback) => {
    console.log(url);
    superagent.get(url).use(jsonp)
        .end((err, sres) => {
            if (err) {
                res.end(err);
                return console.error(err);
            }
            var $ = cheerio.load(sres.text);

            if (typeof callback === 'function')
                pageMax = $('.p-num a:nth-last-child(2)').text(), console.log(pageMax), callback();


            saveDate($);
        });
};

exports.fetchPrices = (req, res, next) => {
    fetchUrl(jdLensUrl, () => {
        for (var i = 2; i <= pageMax; i++) {
            console.log('current page: ' + i);
            fetchUrl(jdLensUrl + i);
        }
    });
}