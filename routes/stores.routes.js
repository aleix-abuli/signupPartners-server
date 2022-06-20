const router = require('express').Router();
const mongoose = require('mongoose');
const Partner = require('../models/Partner.model');
const Store = require('../models/Store.model');
const Item = require('../models/Item.model');

const { isAuthenticated } = require('../middleware/jwt.middleware');

router.post('/', isAuthenticated, (req, res) => {

    const { name, address, imageUrl } = req.body;

    const partnerId = req.payload._id;

    Store
    .create({ name, address, imageUrl })
    .then((newStore) => {
        Partner
        .findByIdAndUpdate(partnerId, { $push: { locals: newStore._id }})
        .then((updatedPartner) => res.status(201).json(updatedPartner));
    })
    .catch((err) => console.log(err));

});

router
.route('/:storeId')
.get(isAuthenticated, (req, res) => {
    
    const { storeId } = req.params;

    Store
    .findById(storeId)
    .populate('items')
    .then((store) => res.status(201).json(store))
    .catch((err) => console.log(err));

})
.post(isAuthenticated, (req, res) => {

    const { storeId } = req.params;

    Store
    .findByIdAndUpdate(storeId, req.body, { new: true })
    .then((updatedStore) => res.status(201).json(updatedStore))
    .catch((err) => console.log(err));

})
.delete(isAuthenticated, (req, res) => {

    const { storeId } = req.params;

    Store
    .findByIdAndDelete(storeId)
    .then((__) => console.log('store deleted'))
    .catch((err) => console.log(err));

});

router.post('/:storeId/items/new', isAuthenticated, (req, res) => {
    
    const { storeId } = req.params;
    const { name, price, imageUrl } = req.body;

    Item
    .create({ name, price, imageUrl })
    .then((newItem) => {
        Store
        .findByIdAndUpdate(storeId, { $push: { items: newItem }})
        .then((updatedStore) => res.status(201).json(updatedStore));
    })
    .catch((err) => console.log(err));

});


module.exports = router;