// app
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// routes -----
const authRoute = require('./routes/auth');
const indexRoute = require('./routes/index');
const linksApiRoute = require('./routes/linksApi');
const linksRoute = require('./routes/links');
// routes -----

// dotenv config -----
dotenv.config();
// dotenv config -----

// connect to database
mongoose.connect(process.env.USER_DB_CONNECT, // using USER_DB_CONNECT environment variable
    {useNewUrlParser: true}, () => console.log("Connected to database!"));

// Setup MiddleWare
// view engine setup
app.set('view engine', 'ejs');

// continue setup
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// static dirs
app.use(express.static(__dirname + '/views/login'));
app.use(express.static(__dirname + '/views/register'));
app.use(express.static(__dirname + '/views/profile'));
app.use(express.static(__dirname + '/views/manage'));

// route MiddleWare
app.use('/api/user', authRoute);
app.use('/', indexRoute);
app.use('/api/links', linksApiRoute);
app.use('/links', linksRoute);


app.listen(3000, () => console.log("Started on port 3000"));