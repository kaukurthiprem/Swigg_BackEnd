const mongoose = require('mongoose');

const vendorschema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    //reference to firm model to establish relationship between vendor and firm(resturant)
    firm:[
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Firm'
        }]
    
});

const vendor = mongoose.model('vendor', vendorschema);

module.exports = vendor;