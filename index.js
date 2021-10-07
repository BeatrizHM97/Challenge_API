const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connect('mongodb://127.0.0.1:27017/challenge');

//User functions
const {
    userPost,
    login,
    userGet,
    userPatch,
    userDelete
} = require('./controllers/userController');

//Link functions
const {
    linkPost,
    linkGet,
    linkPatch,
    linkDelete
} = require('./controllers/linkController');

// It is necessary for the request body (POST and PUT methods)
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// It is necessary to load the data from the server on the web.
const cors = require('cors');
app.use(cors({
    domains: '*',
    methods: "*"
}));

// Listen to the user request
app.post("/api/users", userPost);
app.post("/api/users/login", login)
app.get("/api/users", userGet);
app.patch("/api/users", userPatch);
app.put("/api/users", userPatch);
app.delete("/api/users", userDelete);

// Listen to the user request
app.post("/api/links", linkPost);
app.get("/api/links", linkGet);
app.patch("/api/links", linkPatch);
app.put("/api/links", linkPatch);
app.delete("/api/links", linkDelete);

app.listen(3000, () => console.log('My Challenge app is listening on port 3000'));