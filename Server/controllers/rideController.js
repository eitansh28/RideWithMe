const express = require("express");

const { 
    postRide, 
    getRidesWithMe, 
    searchRide, 
    askToJoin, 
    ridesRequests,
    getAskedToJoin,
    approveRequest, 
    rejectRequest,
    getPassengers,
    deleteRide,
    leaveRide,
    getRidesWithYou,
    getUserNotifications,
    addNotification,
    getUserName,
    getRideDetails,
    getDriverId,
    getNotificationSize,
    increaseNotificationSize,
    resetNotificationSize } = require("../services/rideServices");
const router = express.Router();

router.post("/postRide", postRide);
router.post("/getRidesWithMe", getRidesWithMe);
router.post("/searchRide", searchRide);
router.post("/askToJoin", askToJoin);
router.post("/ridesRequests", ridesRequests);
router.post("/approveRequest", approveRequest);
router.post("/rejectRequest", rejectRequest);
router.post("/getAskedToJoin", getAskedToJoin);
router.post("/getPassengers", getPassengers);
router.post("/getRidesWithYou", getRidesWithYou);
router.post("/deleteRide", deleteRide);
router.post("/leaveRide", leaveRide);
router.post("/getUserNotifications", getUserNotifications);
router.post("/addNotification", addNotification);
router.post("/getUserName", getUserName);
router.post("/getRideDetails", getRideDetails);
router.post("/getDriverId", getDriverId);
router.post("/getNotificationSize", getNotificationSize);
router.post("/increaseNotificationSize", increaseNotificationSize);
router.post("/resetNotificationSize", resetNotificationSize);

module.exports = router;