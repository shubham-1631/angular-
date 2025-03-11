const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product_id: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"product"
    },
    quantity: Number,
    price: Number,
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus:{ type: String,enum:['Pending','Paid'], default:'Pending'},
  orderStatus: { type: String, enum: ['Placed', 'Shipped', 'Delivered', 'Canceled'], default: 'Placed' },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  placedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('order', OrderSchema);
