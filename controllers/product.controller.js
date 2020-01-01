const Product = require('../models/product.model');
const Historybid = require('../models/historybid.model');
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

module.exports.index = async function (req, res) {
    var products = await Product.find();
    res.render('pages/product/index', {
        products: products
    });
}

module.exports.get = async function (req, res) {
    try {
        var product = await Product.findById(req.params.id).populate('historyBidId');
        console.log(product);
        var sellDate = moment(product.sellDate);
        var dateExp = sellDate.add(1, 'minutes');
        console.log(dateExp.diff(moment()));
        res.render('pages/product/view', {
            product: product,
            sellDate: moment(product.sellDate).fromNow(),
            dateExp: dateExp.fromNow()
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports.create = function (req, res) {
    res.render('pages/product/create');
}

module.exports.postCreate = function (req, res) {
    var temp = new Product();
    temp.name = req.body.name;
    temp.price = req.body.price;
    temp.seller = req.body.seller;
    temp.sellDate = moment();
    var historybid = new Historybid();
    historybid.save();
    temp.historyBidId = historybid.id;
    temp.save();
    res.redirect('/product');
}
