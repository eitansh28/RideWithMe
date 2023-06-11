
const firebase = require('../db/firestore');
let db = firebase.firestore();

// const auto1 = require('firebase/auth');
const a = firebase.auth();


const { auth1 } = require('firebase-admin');
const admin = require('firebase-admin');
const auth = admin.auth();


// const firebase1 = require('C:/Users/eitan/Desktop/final_project/RideWithMe/node_modules/@react-native-firebase/auth');
// import auth, { firebase1} from "@react-native-firebase/auth";
const serviceAccount = require('../config/ridewithmedb-firebase-adminsdk-4hbmz-e6a64ac696.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
},'ridewithmedb');

const au = admin.auth();


// const auth = firebase1.auth();
const { auth2 } = require('firebase-admin/auth');
// require('firebase/auth');
// const admin = require("firebase-admin");
// const auth = firebase.auth();






const getUser = async (req,res,next)=>{
    const users = db.collection('users');
    try{
        let u_id = req.body.id || "";
        const user_details = (await users.doc(u_id).get()).data();
        res.send({user_details})
    }catch(err){
        console.error('Error getting details: ', err);
    }
};

const addUser = async (req,res,next) =>{
    try{
        let id = req.body.id || "";
        if (id === "") {
            throw new Error("Invalid ID");
        }
        let name = req.body.name || "";
        let age = req.body.age || "";
        let gender = req.body.gender || "";
        let phone = req.body.phone || "";
        let photoURL = req.body.photoURL || "";
        let allergies = req.body.allergies || "";
        let smoker = req.body.smoker || "";

        await db.collection('users').doc(id).set({
            id: id,
            name:name,
            age: age,
            gender: gender,
            phone: phone,
            photoURL:photoURL,
            allergies:allergies,
            smoker:smoker,
        })

        res.status(200).json({ message: 'user insert details successfully' });
    }catch(err){
        console.log('Error addUser details: ', err);
        res.status(200).json({ message: 'user insert details failed' });
    }
};


const updateUser = async (req,res,next) =>{
    console.log("kkkk");
    try{
        let id = req.body.id || "";
        let name = req.body.name || "";
        let age = req.body.age || "";
        let gender = req.body.gender || "";
        let phone = req.body.phone || "";
        let photoURL = req.body.photoURL || "";
        await db.collection('users').doc(id).set({
            id: id,
            name:name,
            age: age,
            gender: gender,
            phone: phone,
            photoURL:photoURL,
        })
    }catch(err){
        console.log('Error updateUser details: ', err)
    }
};


const SignIn = async (req,res,next) =>{
    console.log("you got to login");
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    try {
        const userCredential = await au.signInWithEmailAndPassword({email, password});
        const user = userCredential.user;
        res.send({ success: true, message: 'Login successful', user: user });
        console.log("yesss");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.status(401).send({ success: false, message: errorMessage });
        console.log("nooooo");
      }
    // auto1.signInWithEmailAndPassword(email, password)
    // .then(() => {
    // //   const user = userCredential.user;
    //   const { user } = firebase.auth()
    //   res.send({ success: true, message: 'Login successful', user: user });
    //   console.log("yesss");
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   res.status(401).send({ success: false, message: errorMessage });
    //   console.log("nooooo");
    // });
}


const SignUp = async (req,res,next) =>{
    console.log("iiiiiiiiii");
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }
    try {
        const userRecord = await auth.createUser({
        email,
        password
        });
        console.log('User account created:', userRecord.toJSON());
        console.log('User account created:', userRecord.toJSON().uid);
        return res.status(201).send({ message: 'User account created', id: userRecord.toJSON().uid });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 'auth/email-already-exists') {
        return res.status(409).send({ message: 'Email already in use' });
        }
        return res.status(500).send({ message: 'Server error' });
    }
    }


module.exports = {
    getUser,
    addUser, 
    updateUser,
    SignIn, 
    SignUp,
};