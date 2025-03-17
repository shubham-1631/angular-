const mongoose = require('mongoose');

const schema = mongoose.Schema({

    UserID : Number,
    Name : {
        type : String,
        required : true
    },
    UserName : {
        type : String,
        required : true
    },
    UserEmail : {
        type : String,
        required : true
    },
    UserPassword : {
        type : String,
        required : true
    },
    UserContact : {
        type : Number,
        required : true
    },
    UserBalance : Number,
    isActive : Boolean


},{timestamps: true});

module.exports = mongoose.model('User', schema);

//Total Deleted Files are Account.js, Disscount.js and 
// Admin.js we have to include this files in the end. we have to include these files in the project.