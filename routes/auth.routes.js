const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 10;
const Partner = require('../models/Partner.model');
const Banking = require('../models/Banking.model');

const { isAuthenticated } = require('../middleware/jwt.middleware');

router.post('/signup', (req, res) => {
    
    console.log('THIS IS REQUEST', req.body)
    const { businessName, city, country, userName, userSurname, password, email, phone, type, locals } = req.body.partner;

    if(password.length < 8) {
        res.status(400).json({ message: 'Password must be at least 8 characters long.'})
    };

    Partner
    .findOne({ email })
    .then((foundPartner) => {

        if(foundPartner) {
            res.status(400).json({ message: 'Sorry, this business is already signed up to Partners.' });
            return;
        };

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        
        return Partner.create({ businessName, city, country, userName, userSurname, password: hashedPassword, email, phone, type, locals });

    })
    .then((createdPartner) => {
        Banking
        .create(req.body.banking)
        .then((createdBanking) => {
            Partner.findByIdAndUpdate(createdPartner._id, {
                $push: { bankingDetails: createdBanking._id }
            })
            .then((updatedPartner) => res.status(201).json(updatedPartner));
        });
    })
    .catch(err => {res.status(500).json({ message: 'Internal Server Error' })});

});


router.post('/login', (req, res, next) => {

    const { email, password } = req.body;

    if( email === '' || password === '') {
        res.status(400).json({ message: 'Please provide email and password.' });
        return;
    };

    Partner
    .findOne({ email })
    .then((foundPartner) => {

        if(!foundPartner) {
            res.status(401).json({ message: 'Partner not found. Please try again.' });
            return;
        };

        if(bcrypt.compareSync(password, foundPartner.password)) {

            const { _id, email, businessName } = foundPartner;
            const payload = { _id, email, businessName };
            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: '24h' }
            );

            res.status(200).json({ authToken });
        } else {
            res.status(401).json({ message: 'Unable to authenticate the user.' });
        };
    })
    .catch(err => {res.status(500).json({ message: 'Internal Server Error' })});
});


router.get('/verify', isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload);
});

module.exports = router;