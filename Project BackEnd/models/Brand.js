const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    BrandID : Number,
    BrandName : String,
    BrandDescription : String,
    BrandTagLine: String,
    BrandImage : String,
    isActive : Boolean,
    BrandBarCode: {
        type: String, // Can store a barcode number or QR code URL
        required: true,
        unique: true, // Ensures each brand has a unique barcode
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
    UpdatedAt: {
        type: Date,
        default: Date.now,
    }
},{timestamps:true}
);

module.exports = mongoose.model('Brand', BrandSchema);