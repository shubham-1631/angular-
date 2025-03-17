const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    
  name: { type: String, required: true, unique: true, trim: true },
  images: String,
  description: { type: String, default: "No description provided" },
  created_at:  Date, 
  updated_at:  Date, 
});

module.exports=mongoose.model('category',CategorySchema)