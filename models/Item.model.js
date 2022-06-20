const  { Schema, model } = require('mongoose');

const Item = model('Item', new Schema(
    {
        name: {type: String, required: true},
        price: {type: String, required: true},
        imageUrl: {type: String, required: true}
    }
));

module.exports = Item;