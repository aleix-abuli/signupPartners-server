const router = require('express').Router();
const authRoutes = require('./auth.routes');
const partnerRoutes = require('./partner.routes');
const storeRoutes = require('./stores.routes');
const itemRoutes = require('./item.routes');
const uploadRoutes = require('./upload.routes');

router.get('/', (req, res) => {res.json('Welcome to Partners Server.')});

router.use('/auth', authRoutes);
router.use('/partners', partnerRoutes);
router.use('/stores', storeRoutes);
router.use('/items', itemRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;