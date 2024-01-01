const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    image: { 
        file_name: String,
        file_type: String,
        file_data: String,
        file_size: String,
    },
    name: { type: String, required: true, },
    email: { type: String, required: true, lowercase: true, unique: true, },
    contact_no: { type: String, required: true, },
    city: {type: String, required: true, },
    state: { type: String, required: true, },
    pass: { type: String, required: true, }

});

module.exports = mongoose.model('userDetails',userSchema);