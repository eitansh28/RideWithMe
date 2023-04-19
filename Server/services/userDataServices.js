
const firebase = require('../db/firestore');
let db = firebase.firestore();



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
        let name = req.body.name || "";
        let age = req.body.age || "";
        let gender = req.body.gender || "";
        let phone = req.body.phone || "";
        // let photoURL = req.body.photoURL || "";
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


    }catch(err){
        console.log('Error addUser details: ', err)
    }
};


module.exports = {
    getUser,
    addUser
};