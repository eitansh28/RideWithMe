const express = require("express");
const { postRide } = require("../services/rideServices");
const router = express.Router();

router.post("/postRide", postRide);




module.exports = router;