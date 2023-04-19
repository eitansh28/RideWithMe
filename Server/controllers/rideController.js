const express = require("express");
const { postRide, getRidesWithMe } = require("../services/rideServices");
const router = express.Router();

router.post("/postRide", postRide);
router.post("/getRidesWithMe", getRidesWithMe);



module.exports = router;