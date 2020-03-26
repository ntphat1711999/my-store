const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    amount: Number,
    importDate: Date
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;