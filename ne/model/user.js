const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{ type:String,required:true},
    email: { type:String,required:true},
    password: { type:String,required:true},
    address: [                      
        {
          street:{ type:String,required:true},
          city:{ type:String,required:true},
          state:{ type:String,required:true},
          postal_code:{ type:String,required:true},
        }
      ],
    role:{type:String,enum:['customer','admin']},
    created_at: Date,   
    updated_at: Date 
})

module.exports = mongoose.model('user', userSchema);
