const mongoose = require('mongoose');

const schema = mongoose.Schema({
    SubCategoryID : Number,
    SubCategoryName : String,
    SubCategoryDescription : String,
    Image : String,
    CategoryID : {
        type : Number,
        ref : 'Category'
        //required : true
    } 
},{timestamps:true});

module.exports = mongoose.model('SubCategory', schema);