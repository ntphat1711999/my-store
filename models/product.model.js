const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    price: String,
    seller: String,
    sellDate: Date,
    historyBidId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Historybid'
    }
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;