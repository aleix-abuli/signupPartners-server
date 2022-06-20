const  { Schema, model } = require('mongoose');

const Store = model('Store', new Schema(
    {
        name: {type: String, required: true},
        address: {type: String, required: true},
        items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
        imageUrl: {type: String}
    }
));

module.exports = Store;