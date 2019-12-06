const Product = require('../models/product.model');

module.exports.index = async function (req, res) {
    var products = await Product.find();
    res.render('pages/product/index', {
        products: products
    });
}

module.exports.create = function (req, res) {
    res.render('pages/product/create');
} 

module.exports.postCreate = function(req, res){
    // User.insertMany(req.body);
    res.redirect('/product');
}
