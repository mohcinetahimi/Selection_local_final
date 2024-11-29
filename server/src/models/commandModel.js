const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commandSchema = new Schema({
    orderNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    clientName: {
        type: String,
    },
    consultantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultant', 
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    note: {
        type: String,
        default:""
    },
    object: {
        type: Schema.Types.Mixed 
    }
}, { timestamps: true });



module.exports = mongoose.model('Command', commandSchema);