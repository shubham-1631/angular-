const mongoose = require('mongoose');

const schema = mongoose.Schema({
    ReviewID : Number,
    UserID : {
        type : Number,
        ref : 'User',
        //required : true
    },
    ReviewedProduct : [
        {
            ProductID : {
                type : Number,
                ref : 'Product',
                //required : true
            },
            Rating : {
                type : Number,
                max : 5,
                //required : true
            },
            Comment : String
        }
    ]
});

module.exports = mongoose.model('Review', schema);