const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    image: { 
        file_name: String,
        file_type: String,
        file_data: String,
        file_size: String,
    },
    name: { type: String, required: true, },
    color: { type: String, required: true, },
    family: { type: String, required: true },
    origin: { type: String, required: true },
    owner: {type: mongoose.Types.ObjectId, ref: "userDetails", },
    quantity: { type: String, required: true, },
    price: { type: String, required: true, },
    description: { type: String, required: true, },

});


module.exports = mongoose.model('productDetails',productSchema);