const express = require('express');
const firmController = require('../controllers/firmControllers')
const verifyToken = require('../middlewares/verfiyToken')


const router = express.Router()

router.post('/add-firm', verifyToken, firmController.addFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);


module.exports = router;