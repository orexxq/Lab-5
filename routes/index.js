const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/upload.html'));
});


module.exports = router;
