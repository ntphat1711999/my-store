const mongoose = require('mongoose');

var historybidSchema = new mongoose.Schema({
    turn: {
        type: Array
    }
});

var Historybid = mongoose.model('Historybid', historybidSchema, 'historybid');

module.exports = Historybid;