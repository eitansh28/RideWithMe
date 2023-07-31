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
      const shortest_paths = myGraph.dijkstra(myGraph.getVertexbyId(id1),myGraph.getVertexbyId(id2),6,time,how_many);

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
  const driverId = req.body.driver_id || '';
  try {
    const db = firebase.firestore();

    // Get the passengers of the ride
    const passengersCollection = await db
      .collection('travels')
      .doc(rideId)
      .collection('passengers')
      .get();

    // Iterate through the passengers
    for (const passengerDoc of passengersCollection.docs) {
      const passengerData = passengerDoc.data();
      const passengerId = passengerData.user_id;

      // Skip the iteration if passengerId is empty
      if (!passengerId) {
        continue;
      }

      // Add a notification for each passenger
      await addNotification({ body: { this_id: passengerId, other_id: driverId, message: " has decided to cancel the ride ", ride_id: rideId } });
    }

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

const addNotification = async (req, res, next) => {
  console.log('Add notification request received!');
  let db = firebase.firestore();
  try {
    let this_id = req.body.this_id || "";
    let other_id = req.body.other_id || "";
    let other_name = await getUserName(other_id);
    let notificationMessage = req.body.message || "";
    let ride_id = req.body.ride_id || "";
    let ride = await getRideDetails(ride_id);
    let ride_details = ride.ride_details;
    let timestamp = new Date(); // Add the current timestamp

    // Get the user's document in the "Notifications" collection
    const userNotificationsDoc = await db.collection('Notifications').doc(this_id).get();

    // Check if the user's document exists
    if (userNotificationsDoc.exists) {
      // Add the new notification to the "notifications" subcollection with the timestamp
      await userNotificationsDoc.ref.collection('notifications').add({
        message: other_name + " " + notificationMessage + " " + ride_details,
        timestamp: timestamp, // Add the timestamp field
      });

      // Increase the notification size
      await increaseNotificationSize({ body: { user_id: this_id } });

      res.send({ success: true });
    } else {
      res.send({ success: false, message: "User document not found" });
    }
  } catch (e) {
    console.error("Error adding notification: ", e);
    res.status(500).send("Server Error");
  }
};

const deleteNotification = async (req, res, next) => {
  console.log("delete Notifications is ready!");

  const noti_Id = req.body.noti_id || '';
  const user_Id = req.body.user_id || '';
  
  try {
    const db = firebase.firestore();
    // Delete the document directly using the noti_id as the document ID
    await db.collection('Notifications').doc(user_Id).collection('notifications').doc(noti_Id).delete();
    console.log(noti_Id);
    res.status(200).json({ message: 'notification deleted successfully' });

  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Failed to delete notification' });
  }
};

const getUserNotifications = async (req, res, next) => {
  console.log('Get user notifications ready!');
  let db = firebase.firestore();
  try {
    let u_id = req.body.id || "";

    // Get the user's document in the "Notifications" collection
    const userNotificationsDoc = await db.collection('Notifications').doc(u_id).get();

    // Check if the user's document exists
    if (userNotificationsDoc.exists) {
      // Get the notifications collection within the user's document and sort by timestamp
      const notificationsCollection = await userNotificationsDoc.ref.collection('notifications')
        .orderBy("timestamp", "desc")
        .get();

      const notificationsData = [];

      // Iterate through the notifications documents
      for (const doc of notificationsCollection.docs) {
        // Check if the notification is empty
        if (!doc.exists) {
          continue; // Skip empty notifications
        }

        // Extract the data from the Firestore document
        const data = doc.data();
        // Add the doc.id to the data object
        data.doc_id = doc.id;
        // Push the data object to the notificationsData array
        notificationsData.push(data);
      }

      res.send({ notifications_data: notificationsData });
    } else {
      res.send({ notifications_data: [] }); // Return an empty array if the user's document doesn't exist
    }
  } catch (e) {
    console.error("Error getting user notifications: ", e);
    res.status(500).send("Server Error");
  }
};


// const getUserNotifications = async (req, res, next) => {
//   console.log('Get user notifications ready!');
//   let db = firebase.firestore();
//   try {
//     let u_id = req.body.id || "";

//     // Get the user's document in the "Notifications" collection
//     const userNotificationsDoc = await db.collection('Notifications').doc(u_id).get();

//     // Check if the user's document exists
//     if (userNotificationsDoc.exists) {
//       // Get the notifications collection within the user's document
//       const notificationsCollection = await userNotificationsDoc.ref.collection('notifications').where("message", "!=", "").get();

//       const notificationsData = [];

//       // Iterate through the notifications documents
//       for (const doc of notificationsCollection.docs) {
//         // Extract the data from the Firestore document
//         const data = doc.data();
//         // Add the doc.id to the data object
//         data.doc_id = doc.id;
//         // Push the data object to the notificationsData array
//         notificationsData.push(data);
//       }

//       res.send({ notifications_data: notificationsData });
//     } else {
//       res.send({ notifications_data: [] }); // Return an empty array if the user's document doesn't exist
//     }
//   } catch (e) {
//     console.error("Error getting user notifications: ", e);
//     res.status(500).send("Server Error");
//   }
// };









//   const addNotification = async (req, res, next) => {
//     console.log('Add notification request received!');
//     let db = firebase.firestore();
//     try {
//       let this_id = req.body.this_id || "";
//       let other_id = req.body.other_id || "";
//       let other_name = await getUserName(other_id);
//       let notificationMessage = req.body.message || "";
//       let ride_id = req.body.ride_id || "";
//       let ride = await getRideDetails(ride_id);
//       let ride_details = ride.ride_details;
  
//       // Get the user's document in the "Notifications" collection
//       const userNotificationsDoc = await db.collection('Notifications').doc(this_id).get();
  
//       // Check if the user's document exists
//       if (userNotificationsDoc.exists) {

//         console.log("im inside");
//         // Add the new notification to the "notifications" subcollection
//         await userNotificationsDoc.ref.collection('notifications').add({
//           message: other_name + " " + notificationMessage + "" + ride_details
//         });
  
//         // Increase the notification size
//         await increaseNotificationSize({ body: { user_id: this_id } });

//         res.send({ success: true });
//       } else {
//         res.send({ success: false, message: "User document not found" });
//       }
//     } catch (e) {
//       console.error("Error adding notification: ", e);
//       res.status(500).send("Server Error");
//     }
//   };
  
  const getUserName = async (u_id) => {
    console.log('Get user info request received!');
    let db = firebase.firestore();
    try {
      // Get the user's document in the "users" collection
      const userDoc = await db.collection('users').doc(u_id).get();
  
      // Check if the user's document exists
      if (userDoc.exists) {
        // Retrieve the user's name from the document
        const userName = userDoc.data().name;
  
        return userName;
      } else {
        throw new Error("User document not found");
      }
    } catch (e) {
      console.error("Error getting user info: ", e);
      throw e;
    }
  };
  
  const getRideDetails = async (rideId) => {
    console.log('Get ride details request received!');
    let db = firebase.firestore();
    try {
      // Get the travel document with the specified rideId in the "travels" collection
      const travelDoc = await db.collection('travels').doc(rideId).get();
  
      // Check if the travel document exists
      if (travelDoc.exists) {
        // Retrieve the originName, destinationName, date, and driver_id fields from the document
        const originName = travelDoc.data().originName;
        const destinationName = travelDoc.data().destinationName;
        const date = travelDoc.data().date;
  
        const rideDetails = `from ${originName} to ${destinationName} on ${date}`;
        return { ride_details: rideDetails};
      } else {
        throw new Error("Travel document not found");
      }
    } catch (e) {
      console.error("Error getting ride details: ", e);
      throw e;
    }
  };
  
  
  const getDriverId = async (req, res, next) => {
    console.log('Get driver ID request received!');
    let db = firebase.firestore();
    try {
      let docId = req.body.doc_id || "";
      // Get the travel document with the specified doc_id in the "Travels" collection
      const travelDoc = await db.collection('travels').doc(docId).get();
  
      // Check if the travel document exists
      if (travelDoc.exists) {
        // Retrieve the driver_id field from the document
        const driverId = travelDoc.data().driver_id;
  
        res.send({ success: true, driver_id: driverId });
      } else {
        res.send({ success: false, message: "Travel document not found" });
      }
    } catch (e) {
      console.error("Error getting driver ID: ", e);
      res.status(500).send("Server Error");
    }
  };
  


  const getNotificationSize = async (req, res, next) => {
    console.log("get notification size is ready!")
    const userId = req.body.user_id || '';
    try {
      const db = firebase.firestore();
      // Get the user's document in the "Notifications" collection
      const userNotificationsDoc = await db.collection('Notifications').doc(userId).get();
      // Check if the user's document exists
      if (userNotificationsDoc.exists) {
        // Retrieve the value of the 'notification_size' field
        const notificationSize = userNotificationsDoc.data().notification_size;
        
        res.status(200).json({ notificationSize });
      } else {
        res.status(404).json({ message: 'User document not found' });
      }
    } catch (error) {
      console.error('Error getting notification size:', error);
      res.status(500).json({ message: 'Failed to get notification size' });
    }
  };
  

  const increaseNotificationSize = async (req, res, next) => {
    const userId = req.body.user_id || '';
    try {
      const db = firebase.firestore();
  
      // Get the user's document in the "Notifications" collection
      const userNotificationsDoc = db.collection('Notifications').doc(userId);
  
      // Atomically increment the 'notification_size' field by 1
      await userNotificationsDoc.update({ notification_size: firebase.firestore.FieldValue.increment(1) });
  
      res.status(200).json({ message: 'Notification size increased successfully' });
    } catch (error) {
      console.error('Error increasing notification size:', error);
      res.status(500).json({ message: 'Failed to increase notification size' });
    }
  };
  
const resetNotificationSize = async (req, res, next) => {
  console.log("reset notifications size is ready!")
  const userId = req.body.user_id || '';
  try {
    const db = firebase.firestore();

    // Get the user's document in the "Notifications" collection
    const userNotificationsDoc = db.collection('Notifications').doc(userId);

    // Set the 'notification_size' field to 0
    await userNotificationsDoc.update({ notification_size: 0 });

    res.status(200).json({ message: 'Notification size reset successfully' });
  } catch (error) {
    console.error('Error resetting notification size:', error);
    res.status(500).json({ message: 'Failed to reset notification size' });
  }
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
    deleteRide,
    getUserNotifications,
    addNotification,
    deleteNotification,
    getUserName,
    getRideDetails,
    getDriverId,
    getNotificationSize,
    increaseNotificationSize,
    resetNotificationSize
};