var lensPriceFetcher = require('../Controllers/LensPriceFetcher');

exports.startSchedule = () => {
    setInterval(cb, 24 * 60 * 60 * 1000);
}

var cb = () => {
    if ((new Date).getHours == 0)
        lensPriceFetcher.fetchPrices();
}