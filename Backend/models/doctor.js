const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const doctorSchema = new mongoose.Schema({
    name: {type: String,required: true},
    gender: {type: String,required: true},
    degree: {type: String,required: true},
    contact: {type: Number,required: true},
    email: { type: String,required: true, unique:true },
    specialization: {type: String,required: true},
    clinic_add: {type: String,required: true},
    cert: { type: String, required: true },
    votes:{type: Number}
});

doctorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Doctor', doctorSchema);
