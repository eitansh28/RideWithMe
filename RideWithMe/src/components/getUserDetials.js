import firestore from "@react-native-firebase/firestore";


export function  getUserDetails(useId){
   
    firestore().collection('users').doc(useId).get().then((doc)=> {
        
        return doc.data();
       
    
    } )

}