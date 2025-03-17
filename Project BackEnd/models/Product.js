const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    ProductID : Number,
    ProductName : String,
    CategoryID : {
        type : Number,
        ref : 'Category'
    },
    ProductDescription : String,
    ProductPrice : Number,
    ProductStockAvailability : Boolean,
    ProductColor : String,
    Image : String
},{timestamps:true}
);

module.exports = mongoose.model('Product', schema);