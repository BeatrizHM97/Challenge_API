const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connect('mongodb://127.0.0.1:27017/challenge');

// It is necessary for the request body (POST and PUT methods)
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// It is necessary to load the data from the server on the web.
const cors = require('cors');
app.use(cors({
    domains: '*',
    methods: "*"
}));

app.listen(3000, () => console.log('My Challenge app is listening on port 3000'));