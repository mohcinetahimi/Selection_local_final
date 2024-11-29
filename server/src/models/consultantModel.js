const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const ConsultantSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        postalCode: {
            type: String
        }
    },
    yearsOfExperience: {
        type: Number
    },
    certifications: [String], 
    clients: [
        {
            clientId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Client'
            },
            commandId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Command' 
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


ConsultantSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});


ConsultantSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const  Consultant = mongoose.model('Consultant', ConsultantSchema);
module.exports = Consultant;

