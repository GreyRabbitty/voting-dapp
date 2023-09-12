const { Router } = require('express');
const app = Router();
require('dotenv').config();
const Citizen = require('../models/Citizen');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

// Path: voting-dapp/voting-tracker-api/controllers/Citizen.js
// Citizen checks if he/she is registered with this endpoint
exports.check = async (req, res) => {
    // Get data from request body
    const { citizenshipId, name, surname, secret } = req.body; // Secret is based on last 2 char of mother's maiden name


    if (!citizenshipId || !name || !surname || !secret) {
        return res.status(400).json({ error: 'Data is missing!' });
    }
    // Check if citizen exists on database with mongoose based on their citizenshipId

    Citizen.findOne({ citizenshipId: req.body.citizenshipId })
        .then(async (citizen) => {
            if (citizen) {
                // Check the values with the database
                if (citizen.name === req.body.name && citizen.surname === req.body.surname && citizen.secret === req.body.secret) {
                    // Checks if the citizen has voted before
                    if (citizen.hasVoted == true) {
                        return res.status(400).send('Citizen has already voted!');
                    }
                    // Checks if the citizen is banned
                    if (citizen.isBanned == true) {
                        return res.status(400).send('Citizen is banned!');
                    }
                    // Checks if the citizen has a city and zipcode
                    if (citizen.city == '' || citizen.zipCode == '') {
                        return res.status(400).send('Citizen doesnt have a city or zipcode!');
                    }
                    // Create a token for the citizen
                    const token = jwt.sign(
                        {
                            citizenshipId: citizen.citizenshipId,
                            name: citizen.name,
                            surname: citizen.surname,
                            city: citizen.city,
                            zipCode: citizen.zipCode,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '10m'
                        }
                    );
                    return res.status(200).json({ token: token });
                } else {
                    return res.status(401).send('Credentails are wrong!');
                }

            } else {
                return res.status(400).send('Citizen doesnt exist');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

// Path: voting-dapp/voting-tracker-api/controllers/Citizen.js
// Citizen verifies the city and zipCode with this endpoint, if they are correct, citizen can vote
exports.verify = async (req, res) => {
    const { citizenshipId, validationOfPlaceOfResidence } = req.body;
    // find the citizen based on cizienshipId with async way
    const citizen = await Citizen.findOne({ citizenshipId: citizenshipId });
    // if citizen doesnt exist, return error
    if (!citizen) {
        return res.status(400).send('Citizen doesnt exist!');
    }
    // if citizen has voted before, return error
    if (citizen.hasVoted == true) {
        return res.status(400).send('Citizen has already voted!');
    }
    // if citizen is banned, return error
    if (citizen.isBanned == true) {
        return res.status(400).send('Citizen is banned!');
    }

    if (validationOfPlaceOfResidence == true) {
        // Return a new token sending citizen data with it
        const token = jwt.sign(
            {
                citizenshipId: citizen.citizenshipId,
                name: citizen.name,
                surname: citizen.surname,
                city: citizen.city,
                zipCode: citizen.zipCode,
                secret: citizen.secret
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '300'
            }
        );
        return res.status(200).json({ token: token, citizenshipId });
    }
    else {
        // Update the user like he/she has voted before
        citizen.hasVoted = true;
        citizen.save();
        return res.status(200).send('The place of residence is not correct! Citizen updated as voted!');
    }
};
exports.get = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).send('Token doesnt exist!');
    }
    const token = authHeader.split(' ')[1]; // Assuming the header value is in the format 'Bearer <token>'

    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(400).json({ message: 'Token has expired' });
            } else {
                return res.status(401).json({ message: 'Invalid token' });
            }
        }
        // Token is valid
        return res.status(200).json(decoded);
    });
}
