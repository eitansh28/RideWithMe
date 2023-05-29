const express = require("express");
const { getUser,addUser,updateUser, SignIn, SignUp } = require("../services/userDataServices");
const router = express.Router();

router.post("/getUserDetails", getUser);
router.post("/addUser", addUser);
router.post("/updateUser", updateUser);
router.post("/SignIn", SignIn);
router.post("/SignUp", SignUp);



module.exports = router;