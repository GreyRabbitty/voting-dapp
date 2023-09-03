const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
// const https = require('https');
// const fs = require('fs');

// Configure basic authentication credentials
const authConfig = {
    unauthorizedResponse: 'Unauthorized',
    db: process.env.DB_HOST
};

// Connect to MongoDB
mongoose.connect("mongodb+srv://" + authConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// Cors
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Success");
});

// Imports 
const citizens = require('./routes/Citizen');
const voting = require('./routes/Voting');

//Routers
app.use('/cdata', citizens);
app.use('/vdata', voting);



// Start the server
app.listen(process.env.PORT || 80, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// Start the server with HTTPS - Currently using HTTP

// https.createServer(
//     // Provide the private and public key to the server by reading each
//     // file's content with the readFileSync() method.
//     {
//         key: fs.readFileSync("key.pem"),
//         cert: fs.readFileSync("cert.pem"),
//     },
//     app
// ).listen(process.env.PORT, () => {
//     console.log("server is runing at port", process.env.PORT);
// });
