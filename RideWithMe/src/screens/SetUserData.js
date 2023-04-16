import {
    ScrollView,
    Text,
    StyleSheet,
    SafeAreaView,
    Pressable,
    TextInput,
    Image,
    LogBox,
    Button,
  } from "react-native";
  import React, { useState } from "react";
  import { Picker } from "@react-native-picker/picker";
  import ImagePicker from "react-native-image-crop-picker";
  import { firebase } from "@react-native-firebase/auth";
  import firestore from "@react-native-firebase/firestore";
  import storage from "@react-native-firebase/storage";
  
  LogBox.ignoreAllLogs();
  
  const SetUserData = ({ navigation }) => {
    const { currentUser } = firebase.auth();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("MALE");
    const [smoker, setSmoker] = useState("NO");
    const [allergies, setAllergies] = useState("");
    const [image, setImage] = useState(currentUser.photoURL);
  
    const uploadImageToStorage = (path, imageName) => { 
      let reference = storage().ref(imageName);
      let task = reference.putFile(path);
  
      task
        .then(() => {
          // 4
          console.log("Image uploaded to the bucket!");
        })
        .catch((e) => console.error("uploading image error => ", e));
    };
  
    const save = async () => {
      if (name && age && image) {
        uploadImageToStorage(image, `${currentUser.uid}`);
  
        const ref = firebase.storage().ref(`${currentUser.uid}`);
        const url = await ref.getDownloadURL();
        const intAge = parseInt(age, 10);
        if (isNaN(intAge)) {
            alert("age must be an integer!");
        }
        else {   
            if (intAge >= 18) {
                try {
                  const res = await fetch('http://192.168.56.1:1000/addUser', { 
                    method: "POST", 
                    headers: { Accept: "application/json", "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: currentUser.uid,
                      name: name,
                      age: age, 
                      gender: gender,
                      photoURL: url,
                      allergies: allergies,
                      smoker: smoker
                    })});
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
                  alert("We got your data successfully :)");
                  navigation.navigate({name:'Home', params:{username: name}});
            }
            else {
                alert("age must be 18 or above!");
            }
        }
      }
      else {   
          if (intAge >= 18) {
              try {
                const res = await fetch('http://192.168.56.1:1000/addUser', { 
                  method: "POST", 
                  headers: { Accept: "application/json", "Content-Type": "application/json" },
                  body: JSON.stringify({
                    id: currentUser.uid,
                    name: name,
                    age: age, 
                    gender: gender,
                    photoURL: url,
                    allergies: allergies,
                    smoker: smoker
                  })});
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
                alert("We got your data successfully :)");
                navigation.navigate({name:'Home', params:{username: name}});
          }
          else {
              alert("age must be 18 or above!");
          }
      }
    else {
      alert("you must fill all the tabs!");
    }
    
  };}


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

  return (
    <SafeAreaView style={theStyle.root}>
      <ScrollView style={theStyle.container}>
        <Image
          style={theStyle.images}
          source={{
            uri: image,
          }}
        ></Image>
        <Button 
          title="Upload Image"
          onPress={uploadImage}
        />
        <TextInput
          style={theStyle.input}
          placeholder="please enter your name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={theStyle.input}
          placeholder="please enter your age"
          value={age}
          onChangeText={setAge}
        />
        <Text>Gender</Text>
        <Picker
          label="Gender"
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
        </Picker>
        <Text>Smoker?</Text>
        <Picker
          label="Smoker"
          selectedValue={smoker}
          onValueChange={(itemValue) => setSmoker(itemValue)}
        >
          <Picker.Item label="NO" value= {false} />
          <Picker.Item label="YES" value= {true} />
        </Picker>
        <TextInput
          style={theStyle.input}
          placeholder="incase of allergies, please provide them"
          value={allergies}
          onChangeText={setAllergies}
        />
        <Button 
          title="save"
          onPress={save}
        />
      </ScrollView>
    </SafeAreaView>
  );
;

const theStyle = StyleSheet.create({
  root: {
    width: "100%",
    flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
  },
  input: {
    margin: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "#ADD8E6",
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 10,
  },
  images: {
    height: 100,
    width: 100,
    borderRadius: 15,
  },
});


export default SetUserData