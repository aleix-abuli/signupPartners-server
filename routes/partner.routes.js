const router = require('express').Router();
const mongoose = require('mongoose');
const Partner = require('../models/Partner.model');
const Banking = require('../models/Banking.model');

const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get('/:id', isAuthenticated, (req, res) => {

    const { id } = req.params;

    Partner
    .findById(id)
    .populate('locals')
    .then((foundPartner) => res.status(201).json(foundPartner))
    .catch((err) => console.log(err));

});

router.post('/:id/edit', isAuthenticated, (req, res) => {

    const { id } = req.params;

    Partner
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedPartner) => res.status(201).json(updatedPartner))
    .catch((err) => console.log(err));

})

module.exports = router;