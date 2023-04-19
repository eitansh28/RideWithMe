const firebase = require('../db/firestore')
const postRide = async (req,res,next) => {
    console.log("i go to the server");
    let db = firebase.firestore();

    try{
        let driver_name = req.body.driver_name || "";
        let origin = req.body.origin || "";
        let destination = req.body.dest || "";
        let price = req.body.price || "";
        let seats = req.body.seats || "";
        let departureTime = req.body.date || "";
        await db.collection('travels')
        .doc().set({
            name_of_the_driver: `${driver_name}`,
            origin: `${origin}`,
            destination: `${destination}`,
            price: `${price}`,
            seats: `${seats}`,
            date: `${departureTime}`
        });
    }catch(e){
        console.error("Error adding documentsssssssss: ", e);
    }

}


const searchRide = async (req,res,next) => {
    console.log("i go to the server");
    let db = firebase.firestore();
    let a = []
    try{
        (await db.collection('travels').where('price', '==', 15).get().then()).forEach((doc) => {
            a.push(doc.data())
        } 
        )
        res.send({a})
    }catch(e){
        console.error("Error --- ", e);
    }

}



module.exports = {
    postRide,
    searchRide
};