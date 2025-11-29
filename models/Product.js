const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    productName: { type: String, required: true 
            },
    price: { type: Number, required: true 
            },
    category: {type: [
                    {type: String,enum:["vegeration","non-vegeration"]}
                        ]},
    image: { type: String },

    bestseller:{type:String},
    description:{type:String},
    firm: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Firm",
        },
    ],
});

const Product = mongoose.model("Product", productschema);

module.exports = Product;
    

