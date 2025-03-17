const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    WishlistID : Number,
    UserID : {
        type : Number,
        ref : 'User',
        //required: true
    },
    WishlistProduct : [
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
    ]
},{timestamps:true}
);

module.exports = mongoose.model('Wishlist', schema);