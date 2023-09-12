const mongoose = require("mongoose");

const Citizen = new mongoose.Schema({
    name: { type: String, require: true },
    surname: { type: String, require: true },
    citizenshipId: { type: String, require: true },
    secret: { type: String, require: true },
    city: { type: String, default: '' },
    zipCode: { type: String, default: '' },
    hasVoted: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false }
});

module.exports = mongoose.model('Citizen', Citizen);

