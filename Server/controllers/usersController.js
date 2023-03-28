const express = require("express");
const { getUser } = require("../services/userDataServices");
const router = express.Router();

router.post("/getUserDetails", getUser);




module.exports = router;