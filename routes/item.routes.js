const router = require('express').Router();
const mongoose = require('mongoose');
const Store = require('../models/Store.model');
const Item = require('../models/Item.model');

const { isAuthenticated } = require('../middleware/jwt.middleware');

router
.route('/:itemId')
.get(isAuthenticated, (req, res) => {

    const { itemId } = req.params;

    Item
    .findById(itemId)
    .then((item) => res.status(201).json(item))
    .catch((err) => console.log(err));
    
})
.post(isAuthenticated, (req, res) => {
    
    const { itemId } = req.params;

    Item
    .findByIdAndUpdate(itemId, req.body)
    .then((item) => res.status(201).json(item))
    .catch((err) => console.log(err));

})
.delete(isAuthenticated, (req, res) => {

    const { itemId } = req.params;

    Item
    .findByIdAndDelete(itemId)
    .then((__) => console.log('deleted item'))
    .catch((err) => console.log(err));

});


module.exports = router;