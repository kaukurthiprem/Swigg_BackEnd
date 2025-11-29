
//importing firm model to establish relationship between vendor and firm(resturant)
const Firm = require('../models/Firm');

//importing vendor model to establish relationship between vendor and firm(resturant)
const Vendor = require('../models/Vendor');

//importing multer to handle image uploads
const multer = require('multer');


  //configuring multer storage to store uploaded images
    const multerStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Specify the destination folder for uploaded images
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname( file.originalname)); // Specify the filename for the uploaded image (or to generate a unique filename)
        }});
//middleware to handle image upload
    const upload = multer({storage: multerStorage});



//*add firm to vendor 
const addfirm = async (req, res) => {

    try {
    //destructuring firm details from request body (body is nothing but firm.js file)
    const { firmName, address, category, region, offer} = req.body;

    //handling image upload
    const image = req.file? req.file.filename : undefined;

     //getting vendor id from request object
    const vendor = await Vendor.findById(req.vendorId);
        if(!vendor){
            res.status(404).json({error: "Vendor not found"});
        }

    const firm = new Firm({
        firmName,address,category,region,offer,image,vendor: vendor._id});
            
        //saving firm details to database
        const saveFirm =await firm.save();
        vendor.firm.push(saveFirm)
        await vendor.save();


    return res.status(201).json({succes: "Firm added successfully", firm});
}

 catch (error) {
    console.log(error);
    res.status(500).json({error: "Server error"});
    }

}



//*delete firm by id
const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);
        if (!deletedFirm) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};



//exporting addfirm function along with multer middleware to handle image upload
module.exports = {addFirm:[upload.single('image'), addfirm], deleteFirmById};
