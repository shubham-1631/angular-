const mongoose=require("mongoose")

const productSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    images: [String],
    reviews: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
    }],
    stock: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    tags: [String],
    categoryName:String
})

module.exports = mongoose.model('product', productSchema); 