

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
        let originName = req.body.originName || "";
        console.log(origin);
        console.log(origin.latitude);
        // let string_origin = "latitude: "+origin.latitude+", longtitude: "+origin.longtitude;
        let destination = req.body.dest || "";
        let destinationName = req.body.destinationName || "";
        let price = req.body.price || "";
        let seats = req.body.seats || "";
        let departureTime = req.body.date || "";
        await db.collection('travels')
        .doc().set({
            driver_id: `${driver_id}`,
            driver_name: `${driver_name}`,
            origin: `${JSON.stringify(origin)}`,
            originName: `${originName}`,
            destination: `${JSON.stringify(destination)}`,
            destinationName: `${destinationName}`,
            price: `${price}`,
            seats: `${seats}`,
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
      

    }catch(e){
        console.error("Error adding document: ", e);
    }

}
// const searchRide = async (req,res,next) => {
//     console.log("here22222")
//     let db = firebase.firestore();
//       const travels = db.collection('travels');
//       try {
//         let origin = req.body.origin || "";
//         let dest   =   req.body.destination || "";

//         let match_rides = (await travels.get()).docs.map((doc)=>{
//             return doc.data();
//         }).filter((doc2)=>{
//             //  console.log(doc2)
//             // const {origin , destination} = doc_obj
//             const orgdoc = JSON.parse(doc2.origin)
//             const destdoc = JSON.parse(doc2.destination)
//             const dist_org = calculateDistance(orgdoc.latitude,orgdoc.longitude ,origin.latitude,origin.longitude);
//             const dist_dest= calculateDistance(destdoc.latitude,destdoc.longitude ,dest.latitude,dest.longitude);
//             console.log(dist_org,dist_dest)
//             return dist_org<2 && dist_dest<2

    
//         })
//         console.log(match_rides)
//         res.send({match_rides})
   
//       }catch{
//         console.error("Error");
//       }
// };

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
module.exports = {
    postRide,
    searchRide
};