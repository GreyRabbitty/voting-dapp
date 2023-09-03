const { Router } = require('express');
const app = Router();
require('dotenv').config();
const Cart = require('../models/Citizen');
const jwt = require('jsonwebtoken');

exports.updateStatus = async (req, res) => {
    return res.status(404).json({ error: 'Citizen couldnt found!' });
};

exports.cancelVote = async (req, res) => {
    return res.status(404).json({ error: 'Citizen coulnt verified' });
};
