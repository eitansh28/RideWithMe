import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions, TextInput,TouchableOpacity, Modal } from 'react-native';
import { firebase } from "@react-native-firebase/auth";
import ImagePicker from "react-native-image-crop-picker";
import { IP } from '../components/constants';
import BackButton from "../components/BackButton";


const ProfileScreen = ({ user }) => {
  
  const { currentUser } = firebase.auth();
  const userId = currentUser.uid;
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("yarin@gmail.com");
  const [photoURL,setPhotoURL] = useState("https://www.pexels.com/collections/country-roads-dqyjhhs/");
  const [showModal,setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  

  const { width, height } = Dimensions.get('window');
  const pictureWidth = width;
  const pictureHeight = height * 0.4;

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch("http://"+IP+":1000/getUserDetails", {
          method: "POST", 
          headers: { Accept: "application/json",
           "Content-Type": "application/json" 
          },
          body: JSON.stringify({ id: userId })});

        const user_details = await res.json();
        setName(user_details.user_details.name);
        setAge(user_details.user_details.age);
        setGender(user_details.user_details.gender);
        setPhone(user_details.user_details.phone);
        setPhotoURL(user_details.user_details.photoURL);
        setImage(user_details.user_details.photoURL);
      } catch (error) {
        console.log("im error ", error);
      }
    };
    getUserDetails();
  }, [userId]);
  

  const saveChange = async () => {
    if (name && age){
      try {
        const res = await fetch("http://"+IP+":1000/updateUser", { 
          method: "POST", 
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            id: userId,
            name: name,
            age: age, 
            gender: gender,
            phone: phone,
            photoURL: photoURL,
          })});
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }
  }

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      path = image.path;
      setImage(image.path);
      setPhotoURL(image.path);
      currentUser.updateProfile({
        photoURL: image.path,
      });
    });
  };


  return (
    <View style={styles.container}>
      <BackButton/>
      <ImageBackground source={require('../components/pic6.jpg')} style={styles.backgroundImage}>
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
        <View style={{backgroundColor:'lightblue',opacity:0.8,marginTop:'10%'}}>
          <View style={styles.detailsRow}>
            <TextInput style={styles.detailsValue} value={name} onChangeText={setName} />
            <Text style={styles.detailsLabel}>Edit-Name:</Text>
            </View>
            <View style={styles.detailsRow}>
              <TextInput style={styles.detailsValue} value={age} onChangeText={setAge} />
              <Text style={styles.detailsLabel}>Edid-Age:</Text>
            </View>
            <View style={styles.detailsRow}>
              
              <TextInput style={styles.detailsValue} value={gender} onChangeText={setGender} />
              <Text style={styles.detailsLabel}>Edit-Gender:</Text>
            </View>
            <View style={styles.detailsRow}>
              <TextInput style={styles.detailsValue} value={phone} onChangeText={setPhone} />
              <Text style={styles.detailsLabel}>Edit-phone:</Text>
            </View>
            <View style={{flexDirection:'row',alignContent:'space-between',justifyContent:'space-evenly'}}>
              <TouchableOpacity style={styles.saveButton} onPress={saveChange}>
                <Text style={{color:'green',fontSize:18}}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={()=>setShowModal(false)}>
                <Text style={{color:'red',fontSize:18}}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={uploadImage}>
                <Text style={{color:'blue',fontSize:18}}>Update Picture</Text>
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
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    card: {
      backgroundColor: 'rgba(255, 240, 240, 0.8)',
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
      alignItems: 'center',
    
    },
    detailsLabel: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize:20,
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