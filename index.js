// app
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// routes -----
const authRoute = require('./routes/auth');
// routes -----

// dotenv config -----
dotenv.config();
// dotenv config -----

// connect to database
mongoose.connect(process.env.DB_CONNECT, // using DB_CONNECT environment variable
    {useNewUrlParser: true}, () => console.log("Connected to database!"));

// MiddleWare
app.use(express.json());
// route MiddleWare
app.use('/api/user', authRoute);

app.listen(3000, () => console.log("Started on port 3000"));