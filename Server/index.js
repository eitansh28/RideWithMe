const express = require("express");
const firebase = require('firebase-admin');
const serviceAccount = require('./config/ridewithmedb-firebase-adminsdk-4hbmz-e6a64ac696.json');
const cors = require("cors");
const { firestore } = require("firebase-admin");



const app = express();
const PORT = 1000;
const corsOptions = {
    credentials: true,
};

app.use(express.json());
app.use(cors());


const userController = require('../Server/controllers/usersController');
const rideController = require('../Server/controllers/rideController');

app.use(userController);
app.use(rideController)








app.listen(PORT, function() {
    console.log("Server is ready at " + PORT)
})