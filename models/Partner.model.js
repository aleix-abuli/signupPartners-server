const  { Schema, model } = require('mongoose');

const Partner = model('Partner', new Schema(
    {
        businessName: {type: String, required: true},
        city: {type: String, required: true},
        country: {
            type: String, 
            enum: [
                'Spain', 'Georgia', 'Croatia', 'Italia', 'Kenya',
                'Kazakhstan', 'Ivory Coast', 'Morocco', 'Poland', 'Portugal',
                'Romania', 'Serbia', 'Ukraine', 'Kyrgyzstan', 'Moldavia',
                'Uganda', 'Ghana', 'Bulgaria', 'Bosnia and Herzegovina', 'Montenegro',
                'Tunisia', 'Belarus', 'Nigeria', 'Armenia', 'Slovenia', 'Andorra'
            ],
            required: true
        },
        userName: {type: String, required: true},
        userSurname: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        phone: {type: String, required: true},
        type: {
            type: String,
            enum: ['restaurant','pharmacy', 'store', 'supermarket'],
            required: true
        },
        locals: [{type: Schema.Types.ObjectId, ref: 'Store'}],
        bankingDetails: {type: Schema.Types.ObjectId, ref: 'Banking'}
    }
));

module.exports = Partner;