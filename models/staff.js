const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


//create a staff schema
const staffSchema = new Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    role:String  
});

//will add on fields for username and password, makes them unique and give us additional methods to use
staffSchema.plugin(passportLocalMongoose);


//compile and export
module.exports = mongoose.model('User', staffSchema);