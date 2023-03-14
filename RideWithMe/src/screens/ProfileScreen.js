import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions, TextInput,TouchableOpacity } from 'react-native';
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const ProfileScreen = ({ user }) => {

  const { currentUser } = firebase.auth();
  const userId = currentUser.uid;

  const [name, setName] = useState("Yarin");
  const [age, setAge] = useState("18");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("yarin@gmail.com");
  const [photoURL,setPhotoURL] = useState('https://www.shutterstock.com/image-photo/cool-grandma-showing-peace-sign-260nw-583662652.jpg')

  const { width, height } = Dimensions.get('window');
  const pictureWidth = width;
  const pictureHeight = height * 0.4;

  useEffect(()=>{
    firestore().collection('users').doc(userId).get().then((doc)=>{
        setName(doc.data().name);
        setAge(doc.data().age);
        setGender(doc.data().gender);
        setPhotoURL(doc.data().photoURL);
    })
  },[]);

  const saveChanges = () => {
    // Save changes to the Firestore database
    firestore().collection('users').doc(userId).set({
      name: name,
      age: age,
      gender: gender,
      email: email
    }, { merge: true })
      .then(() => {
        console.log('User data updated.');
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri:'https://images.pexels.com/photos/1590549/pexels-photo-1590549.jpeg?auto=compress&cs=tinysrgb&w=600' }} style={styles.backgroundImage}>
        <View style={styles.card}>
          <View style={[styles.photoContainer, { width: pictureWidth, height: pictureHeight }]}>
            <Image source={{ uri: 'https://www.shutterstock.com/image-photo/cool-grandma-showing-peace-sign-260nw-583662652.jpg' }} style={styles.profilePicture} />
          </View>
          <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Name:</Text>
            <TextInput style={styles.detailsValue} value={name} onChangeText={setName} />
            
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Age:</Text>
              <TextInput style={styles.detailsValue} value={age} onChangeText={setAge} />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Gender:</Text>
              <TextInput style={styles.detailsValue} value={gender} onChangeText={setGender} />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Email:</Text>
              <TextInput style={styles.detailsValue} value={email} onChangeText={setEmail} />
            </View>
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
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
      opacity:0.8,
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
  
