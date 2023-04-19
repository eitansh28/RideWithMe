const express = require("express");
const { postRide } = require("../services/rideServices");
const {searchRide} = require("../services/rideServices");
const router = express.Router();

router.post("/postRide", postRide);
router.post("/searchRide", searchRide);




module.exports = router;