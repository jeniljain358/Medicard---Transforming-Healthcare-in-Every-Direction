const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const documentSchema = new Schema({
    title:{ type: String, required: true },
    des: String,
    image: { type: String, required: true },
    date: { type: Date, default: Date.now },
    patient_id: {type: mongoose.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Document', documentSchema);
