const router = require('express').Router();
const uploader = require('../config/cloudinary.config');

router.post('/', uploader.single('imageData'), (req, res) => {

    console.log('UPLOAD ROUTE', req.file)

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error uploading the file' });
        return;
    };

    res.json({ cloudinary_url: req.file.path });
});

module.exports = router;
