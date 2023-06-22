

const { json } = require('express');
const firebase = require('../db/firestore')
const Graph = require('../rideAlgo/Graph')
const { v4: uuidv4 } = require('uuid');
let build_graph = false;
const myGraph = new Graph();


const buildGrapgh = async () =>{
    let db = firebase.firestore();
    try{
      const travel_data = (await db.collection('travels').get()).docs.forEach((doc)=>{
        const orgdoc = JSON.parse(doc.data().origin);
        const destdoc = JSON.parse(doc.data().destination);
        const orgName = doc.data().originName;
        const destName = doc.data().destinationName;
        const price = doc.data().price;
        const idd = doc.id; 
        const driver_name = doc.data().driver_name;
        const id1 = uuidv4();
        const id2 = uuidv4();
        const freeSeats = doc.data().seats;
        //should calc the wieght using HERE API some trouble to sign up the get the API key
        myGraph.addVertex(id1,idd,orgName,orgdoc.longitude,orgdoc.latitude,'org',doc.data().date);
        vertex = myGraph.getVertexbyId(id1);
        vertex.freeSeats = freeSeats;
        myGraph.addVertex(id2,idd,destName,destdoc.longitude,destdoc.latitude,'dest',doc.data().date);
        const weight = myGraph.calculateDistance(myGraph.getVertexbyId(id1),myGraph.getVertexbyId(id2));

        const update_date = new Date(myGraph.getVertexbyId(id1).time);
        update_date.setMinutes(update_date.getMinutes() + (weight/1.33)); //80 km in hour
        
        myGraph.getVertexbyId(id2).time = update_date.toISOString();

        myGraph.addEdge(myGraph.getVertexbyId(id1),myGraph.getVertexbyId(id2),weight,'ride',price,driver_name);
        
      })
      for(let key in myGraph.vertices){
        const vertex = myGraph.vertices[key];
        myGraph.addAllCloseVertex(vertex);
      }
    }catch(e){
      console.error('somthing went wrong with reading travels collection',e)
    }
}


const postRide = async (req,res,next) => {
    console.log("post is ready");
    let db = firebase.firestore();
    let send = "";
    try{
        let driver_id = req.body.driver_id || "";
        let driver_name = req.body.driver_name || "";
        let origin = req.body.origin || "";
        let originName = req.body.originName || "";
        let destination = req.body.dest || "";
        let destinationName = req.body.destinationName || "";
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
            originName: `${originName}`,
            destination: `${JSON.stringify(destination)}`,
            destinationName: `${destinationName}`,
            price: `${price}`,
            seats: `${seats}`,
            phone: `${phone}`,
            date: `${departureTime}`
        });
    //   const id1 = uuidv4();
    //   const id2 = uuidv4();
    //   myGraph.addVertex(id1,1,originName,origin.longitude,origin.latitude,'org',departureTime);
    //   myGraph.addVertex(id2,1,destinationName,destination.longitude,destination.latitude,'dest',departureTime);
    //   //agian should called some func to calc the real drive wieght
    //   const weight = myGraph.calculateDistance(myGraph.getVertexbyId(id1),myGraph.getVertexbyId(id2));
    //   myGraph.addEdge(myGraph.getVertexbyId(id1),myGraph.getVertexbyId(id2),weight,'ride');
    //   myGraph.addAllCloseVertex(myGraph.getVertexbyId(id1));
    //   myGraph.addAllCloseVertex(myGraph.getVertexbyId(id2));
      
        // Create asked_to_join subcollection
        await docRef.collection('asked_to_join').add({});
        // Create passengers subcollection
        await docRef.collection('passengers').add({});
        // Create answered subcollection
        await docRef.collection('answered').add({});

        res.send({send});
    }catch(e){
        console.error("Error adding documents: ", e);
    }

}

const searchRide = async (req,res,next) => {
    console.log("search ride!");
    try {
      let origin = req.body.origin || "";
      let originName = req.body.originName || "";
      let dest  =  req.body.destination || "";
      let destName  =  req.body.destinationName || "";
      let how_many = req.body.passengersNum || "";
      //should bring time drim client
      let time = req.body.departureTime;
      const id1 = uuidv4();
      const id2 = uuidv4();
      myGraph.addVertex(id1,1,originName,origin.longitude,origin.latitude,'start_point',time);
      myGraph.addVertex(id2,1,destName,dest.longitude,dest.latitude,'end_point',time);
      const shortest_paths = myGraph.dijkstra(myGraph.getVertexbyId(id1),myGraph.getVertexbyId(id2),7,time,how_many);

      res.send({shortest_paths})
 
    }catch(e){
      console.error("Error",e);
    }
};

if (build_graph == false){
  buildGrapgh();
  build_graph = true;
}

const getRidesWithMe = async (req,res,next) => {
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
        // console.log(rides_with_me);
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
        let pass_num = req.body.pass_num || "";

        const maindocRef = db.collection('travels').doc(doc_id);
        const maindocSnapshot = await maindocRef.get();
        const seats = maindocSnapshot.data().seats;

        if (seats >= pass_num) {
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
                        from_where: `${from_where}`,
                        pass_num: `${pass_num}`,
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
    try {
      let u_id = req.body.id || "";
      const ridesRequestsQuery = await db
        .collection('travels')
        .where('driver_id', '==', u_id)
        .get();
  
      const ridesRequestsData = [];
  
      // Iterate through the queried documents
      for (const doc of ridesRequestsQuery.docs) {
        const rideDocRef = db
          .collection('travels')
          .doc(doc.id)
          .collection('asked_to_join');
        
        // Get the documents count in the "asked_to_join" sub-collection
        const subCollectionSnapshot = await rideDocRef.get();
        const subCollectionSize = subCollectionSnapshot.size;
  
        if (subCollectionSize > 1) {
          // Extract the data from the Firestore document
          const data = doc.data();
          // Add the doc.id to the data object
          data.doc_id = doc.id;
          // Return the data object
          ridesRequestsData.push(data);
        }
      }
  
      res.send({ rides_requests_data: ridesRequestsData });
    } catch (e) {
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
        let pass_num = req.body.pass_num || "";
        const travel = await db.collection('travels').doc(travel_doc_id).get();
        // 1. decrease seats by one
        await travel.ref.update({
            seats: travel.data().seats - pass_num // decrease seats by one
        });
        // 2. delete this asked_to_join document
        await db.collection('travels').doc(travel_doc_id).collection('asked_to_join')
            .doc(asked_doc_id).delete();
        // 3. add the user to the passengers ride
        await db.collection('travels').doc(travel_doc_id).collection('passengers')
        .add({
            user_id: user_id,
            user_name: user_name,
            from_where: from_where,
            pass_num: pass_num
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
        res.send({rides});
    } catch (error) {
        console.error("Error getting documents: ", error);
        res.status(500).send({error: "Failed to get rides with you"});
    }
};

const deleteRide = async (req, res, next) => {
    console.log("delete ride is ready!");
  
    const rideId = req.body.ride_id || '';
    try {
      const db = firebase.firestore();
  
      // Delete the document directly using the ride_id as the document ID
      await db.collection('travels').doc(rideId).delete();
        
      res.status(200).json({ message: 'Ride deleted successfully' });
    } catch (error) {
      console.error('Error deleting ride:', error);
      res.status(500).json({ message: 'Failed to delete ride' });
    }
};

const leaveRide = async (req, res, next) => {
    console.log('leave ride is ready!');
  
    const db = firebase.firestore();
    const rideId = req.body.ride_id || '';
    const userId = req.body.user_id || '';
  
    // Get the reference to the "passengers" collection
    const passengersCollectionRef = db.collection('travels').doc(rideId).collection('passengers');

    // Query the documents with matching "user_id" field
    const query = passengersCollectionRef.where("user_id", "==", userId);

    // Delete the documents
    query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const seats = parseInt(doc.data().pass_num); // Get the value of the "seats" field
            const rideRef = db.collection('travels').doc(rideId); // Reference to the original "rideId" document

            // Update the "seats" field of the original document
            rideRef.update({
            seats: firebase.firestore.FieldValue.increment(seats)
            }).then(() => {
            // Document updated successfully
            console.log("Seats updated");
            }).catch((error) => {
            console.error("Error updating seats: ", error);
            });

            // Delete the passenger document
            doc.ref.delete();
        });
    }).catch((error) => {
        console.error("Error deleting documents: ", error);
    });
};


const deleteExpiredRecords = async () => {
    try {
      let db = firebase.firestore();
      const currentDate = new Date();
    //   console.log(currentDate.getUTCDate());
      const snapshot = await db.collection('travels');
      const all_travels = await snapshot.get();
      all_travels.forEach((doc) => {
        // console.log('Document ID:', doc.id);
        // console.log('Document Data:', doc.data().date);
        const rideDate = new Date(doc.data().date);
        if (rideDate < currentDate){
            db.collection('travels').doc(doc.id).delete();
        }
      });
    } catch (error) {
      console.error('Error deleting expired records:', error);
    }
  };
  
  const runScheduledTask = () => {
    const interval = setInterval(async () => {
      await deleteExpiredRecords();
    }, 24 * 60 * 60 * 1000); // Run once a day ---- hour/min/sec/miliisec
  };
  
  runScheduledTask();
  deleteExpiredRecords();
  

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
    getRidesWithYou,
    leaveRide,
    deleteRide
};