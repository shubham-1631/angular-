const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    CartID : Number,
    UserId : {
        type : Number,
        ref : 'User',
        //required: true
    },
    CartItem : [
        {
            ProductId : {
                type: Number,
                ref: 'Product',
                // required: true
            },
            
            ProductName : String,
            ProductDescription : String,
            ProductImage : String,
            ProductQuantity : Number,
            ProductPrice : Number
        }
    ],
    TotalPrice : Number,
},{timestamps:true}
);

module.exports = mongoose.model('Cart', CartSchema);