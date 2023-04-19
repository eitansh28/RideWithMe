

const firebase = require('../db/firestore')
const postRide = async (req,res,next) => {
    console.log("post is ready");
    let db = firebase.firestore();

    try{
        let driver_id = req.body.driver_id || "";
        let driver_name = req.body.driver_name || "";
        let origin = req.body.origin || "";
        console.log(origin);
        // let string_origin = "latitude: "+origin.latitude+", longtitude: "+origin.longtitude;
        let destination = req.body.dest || "";
        let price = req.body.price || "";
        let seats = req.body.seats || "";
        let departureTime = req.body.date || "";
        await db.collection('travels')
        .doc().set({
            driver_id: `${driver_id}`,
            driver_name: `${driver_name}`,
            origin: `${JSON.stringify(origin)}`,
            destination: `${JSON.stringify(destination)}`,
            price: `${price}`,
            seats: `${seats}`,
            date: `${departureTime}`
        });
    }catch(e){
        console.error("Error adding document: ", e);
    }

}

const getRidesWithMe = async (req,res,next) => {
    console.log("RidesWithMe is ready");
    let db = firebase.firestore();
    try{
        let u_id = req.body.id || "";
        const rides_with_me = (await db.collection('travels').where("driver_id", "==", u_id).get()).docs.map((doc) => {
         // Extract the data from the Firestore document
        const data = doc.data();
        // Add the doc.id to the data object
        data.id = doc.id;
        // Return the data object
        return data;
        });
        console.log(rides_with_me);
        res.send({rides_with_me})
    } catch(e){
        console.error("Error getting user rides: ", e);
    }

}

module.exports = {
    postRide, getRidesWithMe
};