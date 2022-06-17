const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const axios = require("axios");
const geo = require('./utils/geocoder')

const indexRoute = require('./routes/index')

dotenv.config({ path: './config/config.env' });

//CONNECT TO MONGODB
connectDB();

const app = express();

//BODY PARSER
app.use(express.json());

//ROUTE
app.use('/roferstores', indexRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`listening on ${PORT}`)
});


