

const Vendor = require('../models/Vendor');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.MYNAMEIS;




// Create a new vendor

const vendorRegister = async (req, res) => 
{
        console.log("BODY RECEIVED:", req.body);
      const { username, email, password } = req.body;
        try {
            
            const vendoremail = await Vendor.findOne({email})
            if(vendoremail){
                return res.status(400).json({ message: "Vendor already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newvendor = new Vendor({
                username,
                email,
                password: hashedPassword,
            });
            await newvendor.save();

            res.status(200).json({ message: "Vendor registered successfully" });
            console.log("registered successfully")
            } 
        catch (error) {
                    console.log(error);
                res.status(500).json({ message: "Server error" });
            }


            


}


//vender login


const vendorLogin = async (req, res) => {
            
        const { email, password } = req.body;
        
    try {
        const vendor = await Vendor.findOne({ email });
        if(!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({ message: "Invalid credentials" });
            }

            //token generation to safe the user info whit the help of jwt 
            const token = jwt.sign({ vendorId: vendor._id },secretKey, {expiresIn: '1h'});
            

        res.status(200).json({ message: "Vendor logged in successfully", token });
        console.log(email,"logged in successfully", token);
         }
        
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}


//to get all vendors data 
const getAllVendors = async(req, res) =>{
    try{
        //populate is used to fetch related data from another collection
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors})
    }catch(error){
        console.log(error);
        res.status(500).json({message: "internet Server error"});
    }
}


// get the vendor data by id individualy
const getvendorById = async (req,res) => {
    //getting vendor id from request params "idname" in that idname is variable name you can give any name
    const vendorId = req.params.idname;
    try{
        const vendor = await Vendor.findById(vendorId)
        if(!vendor){
            return res.status(404).json({error: "Vendor not found"});
        }
        res.status(200).json({vendor});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "internet Server error"});
    }
}

module.exports = {vendorRegister,vendorLogin,getAllVendors, getvendorById};