var lensPriceFetcher = require('../Controllers/LensPriceFetcher');

exports.startSchedule = () => {
    setInterval(cb, 3600);
}

var cb = () => {
    if ((new Date).getHours == 0)
        lensPriceFetcher.fetchPrices();
}