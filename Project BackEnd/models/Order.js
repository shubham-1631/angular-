const mongoose = require('mongoose');

const schema = mongoose.Schema({
    OrderID : Number,
    UserID : {
        type : Number,
        ref : 'User',
        //required : true
    },
    OrderedProducts : [
        {
            ProductID : {
                type : Number,
                ref : 'Product',
                //required : true
            },
            ProductQuantity : Number,
            ProductPrice : Number
        }
    ],
    TotalPrice : Number,
    OrderDate : Date,
    OrderStatus : String
});

module.exports = mongoose.model('Order', schema);