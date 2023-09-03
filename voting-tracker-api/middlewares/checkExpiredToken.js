// Generate a middleware for checking expired token
const jwt = require('jsonwebtoken');
const Citizen = require('../models/Citizen');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Token is missing!' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const citizen = await Citizen.findOne({ citizenshipId: decodedToken.citizenshipId });
    if (!citizen) {
        return res.status(404).json({ error: 'Citizen couldnt found!' });
    }
    if (citizen.hasVoted) {
        return res.status(404).json({ error: 'Citizen coulnt verified' });
    }
    if (decodedToken.exp < Date.now() / 1000) {
        return res.status(401).json({ error: 'Token expired!' });
    }
    next();
}
// Path: voting-dapp/voting-tracker-api/routes/Citizen.js
