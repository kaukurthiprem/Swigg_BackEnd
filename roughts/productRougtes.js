const express = require('express');

const productcontroller = require('../controllers/productController');

const router = express.Router();

router.post('/add-product/:firmId',productcontroller.addProduct);

router.get('/:firmId/products',productcontroller.getProductByFirm);



//define route to serve uploaded images
router.get('/uploads/:imageName',(req ,res) => {
    const imageName = req.params.imageName;
    res.headerSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..','uploads', imageName));


});


//define route to delete product by id
router.delete('/:productId',productcontroller.deleteProductById);

module.exports = router;