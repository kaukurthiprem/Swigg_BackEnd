//touse express router to define the routes or endpoints
const express = require('express');

//importing the verifyToken middleware to protect the routes and verify vendor
const verifyToken = require('../middlewares/verifyToken');

//importing firmcontroller to handle firm related operations 
const firmcontroller = require('../controllers/firmcontroller');
//creating router instance to define routes
const router = express.Router();
//defining route to add firm with verifyToken middleware to protect the route 
  //NOTE : this line we can give in roughts folder also as you want
router.post('/add-firm',verifyToken,firmcontroller.addFirm);

//define route to serve uploaded images
router.get('/uploads/:imageName',(req ,res) => {
    const imageName = req.params.imageName;
    res.headerSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..','uploads', imageName));


});


//define route to delete firm by id
router.delete('/:firmid',firmcontroller.deleteFirmById);


module.exports = router;

