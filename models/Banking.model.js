const  { Schema, model } = require('mongoose');

const Banking = model('Banking', new Schema(
    {
        legalName: {type: String, required: true},
        taxID: {type: String, required: true},
        address: {type: String, required: true},
        bank: {type: String, required: true},
        accNumber: {type: String, required: true},
        ownerName: {type: String, required: true},
        ownerSurname: {type: String, required: true}
    }
));

module.exports = Banking;