const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const vendorRoutes = require('./roughts/VenderRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./roughts/FremRoutes');
const productRoutes = require('./roughts/productRougtes');
//to work with file and directory paths
const path = require('path');





const PORT = 4000;
dotEnv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() =>console.log("Connected to MongoDB"))
.catch(() => console.log("Error connecting to MongoDB"));


app.listen(PORT, () => {
    console.log(`Server is running and running at ${PORT}`);
});

//middleware to parse json request body (middleware is also nothing but a function that executes during the request-response cycle)
app.use(bodyParser.json());
//importing vendor routes
app.use('/vendor',vendorRoutes);
//importing firm routes
app.use('/firm',firmRoutes);
//importing product routes
app.use('/product',productRoutes);
//serving static files from uploads directory "upload is folder name"
app.use('/uploads', express.static('uploads'));


app.use('/home',(req,res)=>{
    res.send("<h1>Welcome to Swigg");
});