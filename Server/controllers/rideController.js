const express = require("express");
const { postRide, searchRide } = require("../services/rideServices");
const router = express.Router();

router.post("/postRide", postRide);
router.post("/searchRide", searchRide);




module.exports = router;