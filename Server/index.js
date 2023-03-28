const express = require("express");
const firebase = require('firebase-admin');
const serviceAccount = require('./config/ridewithmedb-firebase-adminsdk-4hbmz-e6a64ac696.json');
const cors = require("cors");
const { firestore } = require("firebase-admin");
// const { async } = require("@firebase/util");
const app = express();
const PORT = 1000;
const corsOptions = {
    credentials: true,
};

app.use(express.json());
app.use(cors());

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://ridewithmedb.firebaseio.com/',
});



app.post("/addUser", async (req, res) => {
    let db = firebase.firestore();
    const users = db.collection('users');
    try {
        let u_id = req.body.id || "";
        console.log(u_id)
        let u_name = req.body.name || "";
        let u_age = req.body.age || "";
        let u_gender = req.body.gender || "";
        let u_photoURL = req.body.photoURL || "";
        let u_allergies = req.body.allergies || "";
        let u_smoker = req.body.smoker || "";

        users.doc(u_id).set({
            id: `${u_id}`,
            name: `${u_name}`,
            age: `${u_age}`,
            gender: `${u_gender}`,
            photoURL: `${u_photoURL}`,
            allergies: `${u_allergies}`,
            smoker: `${u_smoker}`,
        })
        .then(() => {
            res.send('Document added successfully');
        })
        .catch((error) => {
            res.status(500).send(error);
        });
    } catch(err) {
        console.error("Error adding document: ", err);
    }
})

app.post("/getUserDetails", async (req, res) => {
    
    let db = firebase.firestore();
    const users = db.collection('users');
    try {
        let u_id = req.body.id || "";
        const user_details = (await users.doc(u_id).get()).data();
        console.log(user_details)
        res.send({ user_details })
    } catch(err) {
        console.error("Error getting details: ", err);
    }
})

app.get("/getUserD", async (req, res) => {
    console.log('iam here')
    let db = firebase.firestore();
    const users = db.collection('users');
    try {
        let user_details =[]
        firestore().collection('users').get().then((doc)=>{
            doc.forEach((doc2)=>{
                user_details.push(doc2.data());
                
        
            })
            
            res.send({user_details})
        })
     
    } catch(err) {
        console.error("Error getting details: ", err);
    }
})


app.listen(PORT, function() {
    console.log("Server is ready at " + PORT)
})