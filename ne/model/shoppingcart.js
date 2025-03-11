const mongoose=require('mongoose')

const CartSchema = new mongoose.Schema({
    items: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      quantity: { type: Number, required: true, min: 1 },
    price : Number
  }],
  totalAmount : Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports=mongoose.model('cart',CartSchema)
