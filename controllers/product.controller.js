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
    let products = await Product.find();
    res.render('pages/product/index', {
        products: products
    });
}

module.exports.get = async (req, res) => {
    let product = await Product.findById(req.params.id);
    res.render('pages/product/update', {
        product: product
    });
}

module.exports.updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    if (req.file) {
        product.image = req.file.path.split('/').splice(1).join('/');
    }
    product.amount = req.body.amount;
    product.importDate = moment();

    product.save()
        .then(() => res.redirect('/product'))
        .catch(err => res.status(400).json('Error: ', err));
}

module.exports.create = (req, res) => {
    res.render('pages/product/create');
}

module.exports.postCreate = (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.path.split('/').slice(1).join('/'),
        amount: 0,
        importDate: moment()
    });

    newProduct.save()
        .then(() => {
            res.redirect('/product');
        })
        .catch(err => res.status(400).json('Error: ', error));
}

module.exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/product'))
        .catch(err => res.status(400).json('Error: ', err));
}