const mongoose = require('mongoose');

const schema = mongoose.Schema({
    CategoryID : Number,
    CategoryName : String,
    Image : String,
    isActive : Boolean   
}, { timestamps: true });

module.exports = mongoose.model('Category', schema);