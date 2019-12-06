const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    price: String,
    seller: String,
    description: String
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;