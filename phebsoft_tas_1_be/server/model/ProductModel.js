const mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    userInput: {
        type: String
    },
    aiResponse: {
        type: String
    }
});

const Productdb = mongoose.model('product', ProductSchema);

module.exports = Productdb;