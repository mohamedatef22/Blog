const mongoose = require('mongoose');

const Confirmation = mongoose.model("confirmation",new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
}));

module.exports = Confirmation;