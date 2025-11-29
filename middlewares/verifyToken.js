
const Vendor = require('../models/Vendor');

//importing dotenv to access secret key (or) to access enviroment variables 
const dotEnv = require('dotenv');


//configuring dotenv
dotEnv.config();

//accessing secret key from enviroment to variables
const secretKey = process.env.MYNAMEIS;

//middleware to verify token
const jwt = require('jsonwebtoken');


//async function to verify token SHOULD USE THE "=>" Otherwise it will give error
const verifyToken = async(req, res, next) => {
            //to foward the token from header
            const token = req.headers.token;

    if(!token){
        console.log("No token, token is requrided");    
        return res.status(401).json({message: "No token, token is requrided"});

    }
    try {

        //decoding token
        const decoded = jwt.verify(token, secretKey);


        //attaching vendor to request object to verify token with vendorid
        //findbyid method to find vendor by id , it is an inbuilt method of mongoose

        const vendor = await Vendor.findById(decoded.vendorId);
        if(!vendor){
            return res.status(401).json({error: "Invalid token, vendor not found"});
        }
        //to verify if decodedvendorID  to match with actual vendor id 
        req.vendorId = vendor._id;

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "invalid token"});
    }
}

module.exports = verifyToken;