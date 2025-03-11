const mongoose=require('mongoose')

const WishlistSchema = new mongoose.Schema({
 
  UserID : {
      type : Number,
      ref : 'User',
  },
  WishlistProduct : [
      {
          ProductId : {
              type: Number,
              ref: 'Product',
          },
          ProductName : String,
          ProductDescription : String,
          ProductImage : String,
          ProductQuantity : Number,
          ProductPrice : Number
      }
  ]
});

module.exports=mongoose.model('wishlist',WishlistSchema)

