const express = require("express");
const { getUser,addUser } = require("../services/userDataServices");
const router = express.Router();

router.post("/getUserDetails", getUser);
router.post("/addUser", addUser);




module.exports = router;