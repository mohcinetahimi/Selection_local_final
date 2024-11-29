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


module.exports = mongoose.model('Admin', ConsultantSchema);
