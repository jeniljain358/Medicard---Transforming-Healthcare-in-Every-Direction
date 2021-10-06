const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new Schema({
    name: { type: String,required: true },
    email: { type: String,required: true, unique:true },
    password: { type: String,required: true, minlength:6 },
    age: Number,
    contact: Number,
    allergies: String,
    aadhar: { type: String,required: true, unique:true,minlength:12 },

});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);
