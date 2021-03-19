const mongoose = require('mongoose');

// create new mongoose schema
const shoppingList = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

// create mongoose model and export 
const ShoppingList = mongoose.model('Shoppinglist', shoppingList, 'shoppinglist')
module.exports = ShoppingList