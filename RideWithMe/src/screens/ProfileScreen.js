import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions, TextInput,TouchableOpacity,SafeAreaView, Modal } from 'react-native';
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { Picker } from "@react-native-picker/picker";
import ImagePicker from "react-native-image-crop-picker";


const ProfileScreen = ({ user }) => {

  const { currentUser } = firebase.auth();
  const userId = currentUser.uid;

  const [name, setName] = useState("Yarin");
  const [age, setAge] = useState("18");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("yarin@gmail.com");
  const [photoURL,setPhotoURL] = useState('https://www.shutterstock.com/image-photo/cool-grandma-showing-peace-sign-260nw-583662652.jpg');
  const [showModal,setShowModal] = useState(false);
//   const [image, setImage] = useState(currentUser.photoURL);

  const { width, height } = Dimensions.get('window');
  const pictureWidth = width;
  const pictureHeight = height * 0.4;

  useEffect(() => {
    console.log('hi');
    const getUserDetails = async () => {
      try {
        const res = await fetch("http://192.168.56.1:1000/getUserDetails", {
          method: "POST", 
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ id: currentUser.uid })
        });
        const user_details = await res.json();
        console.log(user_details);
        setName(user_details.user_details.name);
        setAge(user_details.user_details.age);
        setGender(user_details.user_details.gender);
        setPhotoURL(user_details.user_details.photoURL);
      } catch (error) {
        console.log("im here ", error);
      }
    };
    getUserDetails();
  }, [currentUser.uid]);
  

    // firestore().collection('users').doc(userId).get().then((doc)=>{
    //     setName(doc.data().name);
    //     setAge(doc.data().age);
    //     setGender(doc.data().gender);
    //     setPhotoURL(doc.data().photoURL);
    // })
  // },[]);

  const saveChanges = async () => {
    // Save changes to the Firestore database

    if (name && age && image) {
        uploadImageToStorage(image, `${currentUser.uid}`);
  
        const ref = firebase.storage().ref(`${currentUser.uid}`);
        const url = await ref.getDownloadURL();

    firestore().collection('users').doc(userId).update({
      id : currentUser.uid,
      name: name,
      age: age,
      gender: gender,
      email: email,
      photoURL: url,
    }, { merge: true })
      .then(() => {
        console.log('User data updated.');
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  }};

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      path = image.path;
      setImage(image.path);
      currentUser.updateProfile({
        photoURL: image.path,
      });
    });
  };

  const uploadImageToStorage = (path, imageName) => {
    let reference = storage().ref(imageName);
    let task = reference.putFile(path);

    task
      .then(() => {
        // 4
        console.log("Image uploaded to the bucket!");
      })
      .catch((e) => console.error("uploading image error => ", e));
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri:'https://images.pexels.com/photos/1590549/pexels-photo-1590549.jpeg?auto=compress&cs=tinysrgb&w=600' }} style={styles.backgroundImage}>
        <View style={styles.card}>
          <View style={[styles.photoContainer, { width: pictureWidth, height: pictureHeight,paddingTop:50 }]}>
            <Image source={{ uri: photoURL }} style={styles.profilePicture} />
            <TouchableOpacity  onPress={()=>setShowModal(true)}>
                <Image 
                source={{uri:'https://as2.ftcdn.net/v2/jpg/05/44/29/99/1000_F_544299988_zMBMn7clJywwQJ3Bb4jAhywvuQgdPkmA.jpg'}}
                style = {{width:50,height:50,borderRadius:100}}
                
                />
            </TouchableOpacity>
            <Modal
            transparent = {true}
            visible = {showModal}
            >
        <View style={{backgroundColor:'white',opacity:0.8,marginTop:'10%'}}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Edit-Name:</Text>
            <TextInput style={styles.detailsValue} value={name} onChangeText={setName} />
            
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Edit-Age:</Text>
              <TextInput style={styles.detailsValue} value={age} onChangeText={setAge} />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Edit-Gender:</Text>
              <TextInput style={styles.detailsValue} value={gender} onChangeText={setGender} />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Edit-Mail:</Text>
              <TextInput style={styles.detailsValue} value={email} onChangeText={setEmail} />
            </View>
            <View style={{flexDirection:'row',alignContent:'space-between',justifyContent:'space-evenly'}}>
              <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={{color:'red',fontSize:18}}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={()=>setShowModal(false)}>
                <Text style={{color:'red',fontSize:18}}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={()=>(uploadImage)}>
                <Text style={{color:'red',fontSize:18}}>Update Picture</Text>
              </TouchableOpacity>
            </View>
            </View>
            </Modal>
          </View>
          <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Name:   {name}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Age:   {age}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Gender:   {gender}</Text>
            </View>
            {/* <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Email:   {email}</Text>
            </View> */}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      marginHorizontal: '0%',
      marginVertical: '0%',
      borderRadius: 10,
      borderTopStartRadius:0,
      borderTopEndRadius:0,
      overflow: 'hidden',
      opacity:0.9,
    },
    photoContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      overflow: 'hidden',
    },
    profilePicture: {
      width: '100%',
      height: '100%',
    },
    detailsContainer: {
      flexDirection: 'column',
      marginVertical: '5%',
      paddingHorizontal: '10%',
    },
    name: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: '5%',
      
    },
    detailsRow: {
      flexDirection: 'row',
      marginBottom: '2%',
    
    },
    detailsLabel: {
      flex: 1,
      fontWeight: 'bold',
      fontSize:22,
    },
        input: {
      margin: 10,
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
    },
    detailsValue: {
      flex: 2,
      fontSize:18,
    },
  });
  
  export default ProfileScreen;