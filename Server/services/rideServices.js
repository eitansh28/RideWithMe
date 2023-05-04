

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
        console.log(orgName,destName);
        const id1 = uuidv4();
        const id2 = uuidv4();
        //should calc the wieght using HERE API some trouble to sign up the get the API key
        myGraph.addVertex(id1,orgName,orgdoc.longitude,orgdoc.latitude,'org',doc.data().date);
        myGraph.addVertex(id2,destName,destdoc.longitude,destdoc.latitude,'dest',doc.data().date);
        const weight = myGraph.calculateDistance(myGraph.getVertexbyId(id1),myGraph.getVertexbyId(id2));
        console.log(weight,"dsadas");
        myGraph.addEdge(myGraph.getVertexbyId(id1),myGraph.getVertexbyId(id2),weight,'ride');
      
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

    try{
        let driver_id = req.body.driver_id || "";
        let driver_name = req.body.driver_name || "";
        let origin = req.body.origin || "";
<<<<<<< HEAD
        let originName = req.body.originName || "";
=======
        // let origin_name = req.body.origin_name || "";
>>>>>>> main
        console.log(origin);
        console.log(origin.latitude);
        // let string_origin = "latitude: "+origin.latitude+", longtitude: "+origin.longtitude;
        let destination = req.body.dest || "";
<<<<<<< HEAD
        let destinationName = req.body.destinationName || "";
=======
        // let destination_name = req.body.destination_name || "";
>>>>>>> main
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
      const id1 = uuidv4();
      const id2 = uuidv4();
      myGraph.addVertex(id1,originName,origin.longitude,origin.latitude,'org',departureTime);
      myGraph.addVertex(id2,destinationName,destination.longitude,destination.latitude,'dest',departureTime);
      //agian should called some func to calc the real drive wieght
      const weight = myGraph.calculateDistance(myGraph.getVertexbyId(id1),myGraph.getVertexbyId(id2));
      myGraph.addEdge(myGraph.getVertexbyId(id1),myGraph.getVertexbyId(id2),weight,'ride');
      myGraph.addAllCloseVertex(myGraph.getVertexbyId(id1));
      myGraph.addAllCloseVertex(myGraph.getVertexbyId(id2));
      
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

<<<<<<< HEAD
=======

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
>>>>>>> main
const searchRide = async (req,res,next) => {
    try {
      let origin = req.body.origin || "";
      let originName = req.body.originName || "";
      let dest   =   req.body.destination || "";
      let destName   =   req.body.destinationName || "";
      //should bring time drim client
      let time = req.body.departureTime;
      const id1 = uuidv4();
      const id2 = uuidv4();
      myGraph.addVertex(id1,originName,origin.longitude,origin.latitude,'start_point',time);
      myGraph.addVertex(id2,destName,dest.longitude,dest.latitude,'end_point',time);
      const shortest_path = myGraph.dijkstra(myGraph.getVertexbyId(id1),myGraph.getVertexbyId(id2),7,time);

      console.log(shortest_path)
      // res.send({shortest_path})
 
    }catch(e){
      console.error("Error",e);
    }
};

if (build_graph == false){
  buildGrapgh();
  build_graph = true;
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