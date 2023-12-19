const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({

    name: { type: String, required: true, },
    email: { type: String, required: true, lowercase: true, unique: true, },
    pass: { type: String, required: true, }

});


module.exports = mongoose.model('adminDetails',adminSchema);