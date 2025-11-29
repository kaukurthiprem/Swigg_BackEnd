const Product = require("../models/Product");

const multer = require("multer");

const Firm = require("../models/Firm");

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


//add product
const addProduct = async (req, res) => {
    try {
        //destructuring product details from request body
        const {productName, price, category, bestseller, description} = req.body;

        //handling image upload
        const image = req.file ? req.file.filename : undefined;

        //getting firm id from request parameters
        const firmId = req.params.firmId;

        //finding firm by id
        const firm = await Firm.findById(firmId);
        if (!firm) {
                
            return res.status(404).json({ error: "Firm not found" });
            
        }
        const product = new Product({
            productName,
            price,
            category,
            bestseller,
            description,
            image,
            firm: firm._id,
        });


          //saving product details to database
      const savedProduct = await product.save();
            //establishing relationship between product and firm (or) pushing product id to firm's product array
             firm.products.push(savedProduct);
        //saving the updated firm details to database
        await firm.save();

        return res.status(201).json({ success: "Product added successfully",product });
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }

};

//get products by firm


    const getProductByFirm = async (req, res) => {
        try {
            const firmId = req.params.firmId;
            const firm = await Firm.findById(firmId);
            if (!firm) {
                return res.status(404).json({ error: "Firm not found" });
            }
            const RestarantName = firm.firmName;
           const products = await Product.find({firm: firmId});
            return res.status(200).json({RestarantName, products } );
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Server error" });
        }
    };




  //to delete product by id
  const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};
module.exports = {addProduct: [upload.single('image'), addProduct],getProductByFirm, deleteProductById};