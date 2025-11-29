const mongoose = require('mongoose');
const Product = require('./Product');

const firmschema = new mongoose.Schema({
        firmName: {type: String, required: true, unique: true},
        address: {type: String, required: true},
        category: {type: [
                    {type: String,enum:["vegeration","non-vegeration"]}
                        ], required: true},
        region: {type: [
                {type: String, enum:["north","south","east","west"]}
                    ]},
        offer: {type: String},
        image: {type: String},

    //reference to vendor model to establish relationship between firm and vendor
    vendor:[
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'vendor'

        }],


    //reference to product model to establish relationship between firm and product
    products:[
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Product'
        }]
         
});

const Firm =mongoose.model('Firm', firmschema);

module.exports = Firm;