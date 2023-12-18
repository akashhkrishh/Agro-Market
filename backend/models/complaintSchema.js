const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
    
    title: { type: String, required: true, },
    type: { type: String, required: true, },
    date: { type: String, required: true, },
    status: { type: Boolean, required: true },
    description: { type: String, required: true },
    owner: {type: mongoose.Types.ObjectId, ref: "userDetails", },

});


module.exports = mongoose.model('complaintDetails',complaintSchema);