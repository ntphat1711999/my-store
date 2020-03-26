const Product = require('../models/product.model');
const moment = require('moment');

moment.updateLocale('en', {
    relativeTime: Object
});

moment.updateLocale('en', {
    relativeTime: {
        future: "Trong %s",
        past: "%s trước",
        s: 'một vài giây',
        ss: '%d giây',
        m: "một phút",
        mm: "%d phút",
        h: "một giờ",
        hh: "%d giờ",
        d: "một ngày",
        dd: "%d ngày",
        M: "một tháng",
        MM: "%d tháng",
        y: "một năm",
        yy: "%d năm"
    }
});

module.exports.index = async (req, res) => {
    var products = await Product.find();
    res.render('pages/product/index', {
        products: products
    });
}

module.exports.get = (req, res) => {

}

module.exports.create = (req, res) => {
    res.render('pages/product/create');
}

module.exports.postCreate = (req, res) => {

}