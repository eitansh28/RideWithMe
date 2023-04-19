

const { json } = require('express');
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
        console.error("Error adding documentsssssssss: ", e);
    }

}


// const searchRide = async (req,res,next) => {
//     console.log("i go to the server");
//     let db = firebase.firestore();
//     let a = []
//     try{
//         (await db.collection('travels').where('price', '==', 15).get().then()).forEach((doc) => {
//             a.push(doc.data())
//         } 
//         )
//         res.send({a})
//     }catch(e){
//         console.error("Error --- ", e);
//     }

// }
const searchRide = async (req,res,next) => {
    console.log("here22222")
    let db = firebase.firestore();
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        
        const toRadians = (degrees) => {
            return degrees * (Math.PI / 180);
          };
        
        const R = 6371; // Earth's radius in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
      };

      const travels = db.collection('travels');
      try {
        let origin = req.body.origin || "";
        let dest   =   req.body.destination || "";

        let match_rides = (await travels.get()).docs.map((doc)=>{
            return doc.data();
        }).filter((doc2)=>{
            //  console.log(doc2)
            // const {origin , destination} = doc_obj
            const orgdoc = JSON.parse(doc2.origin)
            const destdoc = JSON.parse(doc2.destination)
            const dist_org = calculateDistance(orgdoc.latitude,orgdoc.longitude ,origin.latitude,origin.longitude);
            const dist_dest= calculateDistance(destdoc.latitude,destdoc.longitude ,dest.latitude,dest.longitude);
            console.log(dist_org,dist_dest)
            return dist_org<2 && dist_dest<2

    
        })
        console.log(match_rides)
        res.send({match_rides})
   
      }catch{
        console.error("Error");
      }
};




module.exports = {
    postRide,
    searchRide
};