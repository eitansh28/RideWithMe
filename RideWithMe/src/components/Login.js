import React, {useState} from "react";
import {View, Text, StyleSheet, Button ,Alert, TextInput, ImageBackground} from 'react-native';


  const Login = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [user, setUser] = useState();
    
    function connect_user() {
      alert("!יאללה מתן תן בראש");
    }

    return(
    <ImageBackground source={require('./pic2.jpg')} style={styles.background}>
      <View style={styles.center}>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter desired password"
        value={pass}
        onChangeText={setPass}
      />         
      <Button
        title="Login"
        onPress={(connect_user)}
      />
      </View>
      </ImageBackground>
      
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: 'pink',
      width: "90%",
      fontSize: 20,
      padding: 8,
      borderColor: "blue",
      borderWidth: 0.2,
      borderRadius: 10,
    },
  });

  export default Login;