
const firebase = require('../db/firestore');




const getUser = async (req,res,next)=>{
    let db = firebase.firestore();
    const users = db.collection('users');
    try{
        let u_id = req.body.id || "";
        const user_details = (await users.doc(u_id).get()).data();
        res.send({user_details})
    }catch(err){
        console.error('Error getting details: ', err);
    }
};
module.exports = {getUser};