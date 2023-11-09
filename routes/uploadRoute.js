const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = file.fieldname + '-' + Date.now() + ext;
        cb(null, fileName);
    }
});

const fileFilter = function (req, file, cb) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file extension'), false);
    }
};

const limits = {
    fileSize: 10 * 1024 * 1024 // 10 MB
};

const upload = multer({ storage, fileFilter, limits });


router.post('/', (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ error: 'File size limit exceeded (max 10MB)' });
        } else if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'File uploaded successfully' });
        }
    });
});


module.exports = router;