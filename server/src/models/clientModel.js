const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email : {
        type: String
    },
    appointment: {
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    note: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['Francais', 'Anglais'],
        required: true
    },
    clients: [
        {
            fullName: {
                type: String,
                required: true
            }
        }
    ],
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    },
    phoneNumbers: {
        phone1: {
            type: String, // This can be either cellulaire or home
            required: true
        },
        phone2: {
            type: String // This can be either cellulaire or home
        }
    },
    freezer: {
        hasExtraFreezer: {
            type: Boolean,
            required: true
        },
        currentState: {
            type: String,
            required: true
        },
        hasSpaceForExtraFreezer: {
            type: Boolean,
            required: true
        }
    },
    weeklyBudget: {
        meat: {
            type: Number,
            required: true
        }
    },
    beenConsulted: {
        type: Boolean,
        default: false
    },
    commandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Command',
        default: null
    },
    consultantId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'consultant',
        default: null
    }
},{timestamps : true});

module.exports = mongoose.model('Client', ClientSchema);
