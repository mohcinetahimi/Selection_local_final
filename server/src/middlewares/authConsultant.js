const jwt = require('jsonwebtoken');
const Consultant = require('../models/consultantModel');
require("dotenv").config()






const verifyConsultant = async (req, res, next) => {
    const jwtSecret = process.env.JWT_SECRET;
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, jwtSecret);

        // Check if the decoded token has the required properties
        if (!decoded.consultantId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Find the consultant by ID
        const consultant = await Consultant.findById(decoded.consultantId);

        if (!consultant) {
            return res.status(401).json({ message: 'Consultant not found' });
        }

        // Attach consultant to the request object
        req.consultant = consultant;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {verifyConsultant};
