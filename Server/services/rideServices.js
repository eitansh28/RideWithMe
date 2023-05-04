

const { json } = require('express');
const firebase = require('../db/firestore')
const postRide = async (req,res,next) => {
    console.log("post is ready");
    let db = firebase.firestore();

    try{
        let driver_id = req.body.driver_id || "";
        let driver_name = req.body.driver_name || "";
        let origin = req.body.origin || "";
        // let origin_name = req.body.origin_name || "";
        console.log(origin);
        // let string_origin = "latitude: "+origin.latitude+", longtitude: "+origin.longtitude;
        let destination = req.body.dest || "";
        // let destination_name = req.body.destination_name || "";
        let price = req.body.price || "";
        let phone = req.body.phone || "";
        let seats = req.body.seats || "";
        let departureTime = req.body.date || "";
        const travelsRef = db.collection('travels');
        const docRef = await travelsRef
        .add({
            driver_id: `${driver_id}`,
            driver_name: `${driver_name}`,
            origin: `${JSON.stringify(origin)}`,
            destination: `${JSON.stringify(destination)}`,
            price: `${price}`,
            seats: `${seats}`,
            phone: `${phone}`,
            date: `${departureTime}`
        });
        // Create asked_to_join subcollection
        await docRef.collection('asked_to_join').add({});
        // Create passengers subcollection
        await docRef.collection('passengers').add({});
        // Create answered subcollection
        await docRef.collection('answered').add({});

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
            const data = doc.data();
            // Add the doc.id to the data object
            data.id = doc.id;
            // Return the data object
            return data;
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


const getRidesWithMe = async (req,res,next) => {
    console.log("RidesWithMe is ready");
    let db = firebase.firestore();
    try{
        let u_id = req.body.id || "";
        const rides_with_me = (await db.collection('travels').where("driver_id", "==", u_id).get()).docs.map((doc) => {
         // Extract the data from the Firestore document
        const data = doc.data();
        // Add the doc.id to the data object
        data.doc_id = doc.id;
        // Return the data object
        return data;
        });
        console.log(rides_with_me);
        res.send({rides_with_me})
    } catch(e) {
        console.error("Error getting user rides: ", e);
    }
}

const askToJoin = async (req,res,next) => {
    console.log("ask to join is ready");
    let db = firebase.firestore();
    let send = "";
    try{
        let doc_id = req.body.doc_id || "";
        console.log("doc id: "+ doc_id);
        let user_id = req.body.user_id || "";
        let user_name = req.body.user_name || "";
        let from_where = req.body.from_where || "";

        const maindocRef = db.collection('travels').doc(doc_id);
        const maindocSnapshot = await maindocRef.get();
        const seats = maindocSnapshot.data().seats;

        if (seats > 0) {
            // check if the user has already been answered
            const docRef1 = await db.collection('travels').doc(doc_id).collection('answered');
            const querySnapshot1 = await docRef1.where('user_id', '==', user_id).get();       
            if (!querySnapshot1.empty) {
                console.log('user has already been answered');
                send = "you have already been answered"
            }
            // check if the user has already asked to join
            const docRef = await db.collection('travels').doc(doc_id).collection('asked_to_join');
            const querySnapshot = await docRef.where('user_id', '==', user_id).get();
            if (!querySnapshot.empty) {
                console.log('user found');
                const doc = querySnapshot.docs[0];
                const docData = doc.data();
                if (docData.from_where !== from_where) {
                    await doc.ref.update({
                        from_where: from_where
                    });
                    console.log(`Document with ID ${doc.id} updated`);
                    send = "from where updated";
                } else {
                    console.log(`Document with ID ${doc.id} existed`);
                    send = "already applied";
                }
                console.log(send);
                res.send({send});
            } else {
                // check if it's the driver itself
                const docRef = db.collection('travels').doc(doc_id);
                const docSnapshot = await docRef.get();
                const driver_id = docSnapshot.data().driver_id;
                if (driver_id == user_id) {
                    console.log("driver of this ride itself can't ask to join");
                    send = "you are the driver of this ride";
                } else {
                    // add the request
                    await db.collection('travels')
                    .doc(doc_id).collection('asked_to_join').add({
                        user_id: `${user_id}`,
                        user_name: `${user_name}`,
                        from_where: `${from_where}`
                    });
                    console.log(`Document added`);
                    send = "Your request has been made";
                }
                console.log(send);
                res.send({send});
            }
        } else {
            send = "ride is full";
            console.log(send);
            res.send({send});
        }
    } catch(e){
        console.error("Error adding document: ", e);
    }
}
  
const ridesRequests = async (req, res, next) => {
    console.log('rides requests ready!');
    let db = firebase.firestore();
    try{
        let u_id = req.body.id || "";
        const rides_requests = (await db.collection('travels').where("driver_id", "==", u_id).get()).docs.map(async (doc) => {
             // Extract the data from the Firestore document
            const data = doc.data();
            // Add the doc.id to the data object
            data.doc_id = doc.id;
            // Return the data object
            return data;
        });
        const rides_requests_data = await Promise.all(rides_requests);
        console.log(rides_requests_data);
        res.send({rides_requests_data});
    } catch(e) {
        console.error("Error getting user rides: ", e);
    }
};

const getAskedToJoin = async (req, res, next) => {
    let db = firebase.firestore();
    try{
        let travel_doc_id = req.body.travel_doc_id || "";
        const asked_to_join_docs = await db.collection('travels').doc(travel_doc_id).collection('asked_to_join').get();
        const asked_to_join_data = asked_to_join_docs.docs.filter((doc) => {
            // Filter out the empty documents
            const data = doc.data();
            return data.hasOwnProperty('from_where');
        }).map((doc) => {
            // Extract the data from the Firestore document
            const data = doc.data();
            // Add the doc.id to the data object
            data.doc_id = doc.id;
            // Return the data object
            return data;
        });
        res.send({asked_to_join_data});
    } catch(e) {
        console.error("Error getting asked_to_join data: ", e);
    }
};

  const approveRequest = async (req, res, next) => {
    console.log('approve request ready!');
    let db = firebase.firestore();
    try{
        let travel_doc_id = req.body.travel_doc_id || "";
        let asked_doc_id = req.body.asked_doc_id || "";
        let user_id = req.body.user_id || "";
        let user_name = req.body.user_name || "";
        let from_where = req.body.from_where || "";
        const travel = await db.collection('travels').doc(travel_doc_id).get();
        // 1. decrease seats by one
        await travel.ref.update({
            seats: travel.data().seats - 1 // decrease seats by one
        });
        // 2. delete this asked_to_join document
        await db.collection('travels').doc(travel_doc_id).collection('asked_to_join')
            .doc(asked_doc_id).delete();
        // 3. add the user to the passengers ride
        await db.collection('travels').doc(travel_doc_id).collection('passengers')
        .add({
            user_id: user_id,
            user_name: user_name,
            from_where: from_where
        });
        // 3. add the user to the answered collection
        await db.collection('travels').doc(travel_doc_id).collection('answered')
        .add({
            user_id: user_id
        });
    } catch(e) {
        console.error("Error getting user rides: ", e);
    }
  };

  const rejectRequest = async (req, res, next) => {
    console.log('reject request ready!');
    let db = firebase.firestore();
    try{
        let user_id = req.body.user_id || "";
        let travel_doc_id = req.body.travel_doc_id || "";
        let asked_doc_id = req.body.asked_doc_id || "";
        const travel = await db.collection('travels').doc(travel_doc_id).get();
        // 1. delete this asked_to_join document
        await db.collection('travels').doc(travel_doc_id).collection('asked_to_join')
            .doc(asked_doc_id).delete();
        // 2. add the user to the answered collection
        await db.collection('travels').doc(travel_doc_id).collection('answered')
        .add({
            user_id: user_id
        });
    } catch(e) {
        console.error("Error getting user rides: ", e);
    }
  };

  const getPassengers = async (req, res, next) => {
    let db = firebase.firestore();
    try{
        let travel_doc_id = req.body.travel_doc_id || "";
        const passengers_docs = await db.collection('travels').doc(travel_doc_id).collection('passengers').get();
        const passengers_data = passengers_docs.docs.filter((doc) => {
            // Filter out the empty documents
            const data = doc.data();
            return data.hasOwnProperty('user_id');
        }).map((doc) => {
            // Extract the data from the Firestore document
            const data = doc.data();
            // Add the doc.id to the data object
            data.doc_id = doc.id;
            // Return the data object
            return data;
        });
        res.send({passengers_data});
    } catch(e) {
        console.error("Error getting asked_to_join data: ", e);
    }
};

const getRidesWithYou = async (req, res, next) => {
    console.log('rides with you ready!');
    let db = firebase.firestore();
    let u_id = req.body.id || "";
    console.log(u_id);
    try {
        const mainSnapshot1 = await db.collection("travels").get();
        const rides = [];
        await Promise.all(mainSnapshot1.docs.map(async(doc) => {
            const res = await db.collection("travels").doc(doc.id).collection("passengers").where("user_id", "==", u_id).get()
            if(!res.empty) {
                const ride = doc.data();
                ride.doc_id = doc.id;
                rides.push(ride);
            }
        }));
        console.log(rides);
        res.send({rides});
    } catch (error) {
        console.error("Error getting documents: ", error);
        res.status(500).send({error: "Failed to get rides with you"});
    }
};

  

module.exports = {
    postRide, 
    getRidesWithMe, 
    searchRide, 
    askToJoin, 
    ridesRequests,
    getAskedToJoin,
    approveRequest, 
    rejectRequest,
    getPassengers,
    getRidesWithYou
};