// import React, {useState, useEffect} from "react";
// import {ScrollView, View, Text, StyleSheet, Button ,Alert, TextInput, ImageBackground} from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import DateTimePickerModal from "react-native-modal-datetime-picker";

//   const SearchRide = () => {

//     const [from, setFrom] = useState("");
//     const [to, setTo] = useState("");
//     const [departureTime, setDepartureTime] = useState(null);
//     const [isDepartureTimePickerVisible, setDepartureTimePickerVisibility] = useState(true);
//     const [desiredArrivalTime, setDesiredArrivalTime] = useState(null);
//     const [isDesiredArrivalTimePickerVisible, setDesiredArrivalTimePickerVisibility] = useState(false);



//     const handleFromLocation = (data, details = null) => {
//         // Check if geometry is defined
//         if (data.geometry && data.geometry.location) {
//             // Extract latitude and longitude from the data parameter
//             const { lat, lng } = data.geometry.location;
    
//             // Set the location state
//             setFrom({ latitude: lat, longitude: lng });
//         }
//     };
    
//     const handleToLocation = (data, details = null) => {
//         // Check if geometry is defined
//         if (data.geometry && data.geometry.location) {
//             // Extract latitude and longitude from the data parameter
//             const { lat, lng } = data.geometry.location;
    
//             // Set the location state
//             setTo({ latitude: lat, longitude: lng });
//         }
//     };

//     const handleDepartureTimeConfirm = (date) => {
//         console.log("Date selected: ", date);
//         setDepartureTime(date);
//         setDepartureTimePickerVisibility(false);
//     }
    
//     const handleDepartureTimeCancel = () => {
//         console.log("Date selection cancelled.");
//         setDepartureTimePickerVisibility(false);
//     }

//     const handleDesiredArrivalTimeConfirm = (date) => {
//         console.log("Date selected: ", date);
//         setDesiredArrivalTime(date);
//         setDesiredArrivalTimePickerVisibility(false);
//     }
    
//     const handleDesiredArrivalTimeCancel = () => {
//         console.log("Date selection cancelled.");
//         setDesiredArrivalTimePickerVisibility(false);
//     }

//     function search() {
//         // should do in server:
//         // const departureTimestamp = firebase.firestore.Timestamp.fromDate(new Date(departureTime));
//         // const desiredArrivalTimestamp = firebase.firestore.Timestamp.fromDate(new Date(desiredArrivalTime));
        
//         // Cast the departure time to a Firebase Timestamp
//         // const departureTimestamp = firebase.firestore.Timestamp.fromDate(departureTime);
//     }

//     return(
//     <ImageBackground source={require('../components/pic2.jpg')} style={styles.background}>
//         <View style={styles.center}>
//             <GooglePlacesAutocomplete
//                 styles={styles.location}
//                 placeholder='Search'
//                 onPress={handleFromLocation}
//                 query={{
//                     key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
//                     language: 'en',
//                 }}
//             />
//             <GooglePlacesAutocomplete
//                 styles={styles.location}
//                 placeholder='To'
//                 onPress={handleToLocation}
//                 query={{
//                     key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
//                     language: 'en',
//                 }}
//             />
//             <Text>Departure Time: {departureTime ? departureTime.toString() : 'Not set'}</Text>
//             <Button title="Select Departure Time" onPress={() => setDepartureTimePickerVisibility(true)} />
//             <DateTimePickerModal
//                 isVisible={isDepartureTimePickerVisible}
//                 mode="datetime"
//                 onConfirm={handleDepartureTimeConfirm}
//                 onCancel={handleDepartureTimeCancel}
//             />
//             <Text>Desired Arrival Time: {desiredArrivalTime ? desiredArrivalTime.toString() : 'Not set'}</Text>
//             <Button title="Select Desired Arrival Time" onPress={() => setDesiredArrivalTimePickerVisibility(true)} />
//             <DateTimePickerModal
//                 isVisible={isDesiredArrivalTimePickerVisible}
//                 mode="datetime"
//                 onConfirm={handleDesiredArrivalTimeConfirm}
//                 onCancel={handleDesiredArrivalTimeCancel}
//             />
//             <Button
//                 title="Search"
//                 onPress={search}
//             />
//         </View>
//       </ImageBackground>
//     )
// }

// const styles = StyleSheet.create({
//     background: {
//       flex: 1,
//       resizeMode: 'cover',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     center: {
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     input: {
//       backgroundColor: 'pink',
//       width: "90%",
//       fontSize: 15,
//       padding: 8,
//       borderColor: "blue",
//       borderWidth: 0.2,
//       borderRadius: 10,
//     },
//     location: {
//         container: {
//             flex: 1,
//           },
//           textInputContainer: {
//             width: '100%',
//             backgroundColor: 'rgba(0,0,0,0)',
//             borderTopWidth: 0,
//             borderBottomWidth:0,
//           },
//           textInput: {
//             marginLeft: 0,
//             marginRight: 0,
//             height: 38,
//             color: '#5d5d5d',
//             fontSize: 16,
//           },
//           predefinedPlacesDescription: {
//             color: '#1faadb',
//           },
//     }
//   });

//   export default SearchRide















import React, {useState, useEffect} from "react";
import {ScrollView, View, Text, StyleSheet, Button ,Alert, TextInput, ImageBackground} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePickerModal from "react-native-modal-datetime-picker";

  const SearchRide = () => {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureTime, setDepartureTime] = useState(null);
    const [isDepartureTimePickerVisible, setDepartureTimePickerVisibility] = useState(false);



    const handleFromLocation = (data, details = null) => {
        // Check if geometry is defined
        if (data.geometry && data.geometry.location) {
            // Extract latitude and longitude from the data parameter
            const { lat, lng } = data.geometry.location;
    
            // Set the location state
            setFrom({ latitude: lat, longitude: lng });
        }
    };
    
    const handleToLocation = (data, details = null) => {
        // Check if geometry is defined
        if (data.geometry && data.geometry.location) {
            // Extract latitude and longitude from the data parameter
            const { lat, lng } = data.geometry.location;
    
            // Set the location state
            setTo({ latitude: lat, longitude: lng });
        }
    };

    const handleDepartureTimeConfirm = (date) => {
        console.log("Date selected: ", date);
        setDepartureTime(date);
        setDepartureTimePickerVisibility(false);
    }
    
    const handleDepartureTimeCancel = () => {
        console.log("Date selection cancelled.");
        setDepartureTimePickerVisibility(false);
    }

    const handleDesiredArrivalTimeConfirm = (date) => {
        console.log("Date selected: ", date);
        setDesiredArrivalTime(date);
        setDesiredArrivalTimePickerVisibility(false);
    }
    
    const handleDesiredArrivalTimeCancel = () => {
        console.log("Date selection cancelled.");
        setDesiredArrivalTimePickerVisibility(false);
    }

    function search() {
        // should do in server:
        // const departureTimestamp = firebase.firestore.Timestamp.fromDate(new Date(departureTime));
        // const desiredArrivalTimestamp = firebase.firestore.Timestamp.fromDate(new Date(desiredArrivalTime));
        
        // Cast the departure time to a Firebase Timestamp
        // const departureTimestamp = firebase.firestore.Timestamp.fromDate(departureTime);
    }

    return(
    <ImageBackground source={require('../components/pic3.jpg')} style={styles.background}>
        <Text style={styles.bold}>ride search</Text>
        <View style={styles.center}>
            <GooglePlacesAutocomplete
                styles={styles.location}
                placeholder='Search'
                onPress={handleFromLocation}
                query={{
                    key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
                    language: 'en',
                }}
            />
            <GooglePlacesAutocomplete
                styles={styles.location}
                placeholder='To'
                onPress={handleToLocation}
                query={{
                    key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
                    language: 'en',
                }}
            />
            <Text>Departure Time: {departureTime ? departureTime.toString() : 'Not set'}</Text>
            <Button title="Select Departure Time" onPress={() => setDepartureTimePickerVisibility(true)} />
            <DateTimePickerModal
                
                isVisible={isDepartureTimePickerVisible}
                mode="datetime"
                onConfirm={handleDepartureTimeConfirm}
                onCancel={handleDepartureTimeCancel}
            />
            {/* <Text>Desired Arrival Time: {desiredArrivalTime ? desiredArrivalTime.toString() : 'Not set'}</Text>
            <Button title="Select Desired Arrival Time" onPress={() => setDesiredArrivalTimePickerVisibility(true)} />
            <DateTimePickerModal
                isVisible={isDesiredArrivalTimePickerVisible}
                mode="datetime"
                onConfirm={handleDesiredArrivalTimeConfirm}
                onCancel={handleDesiredArrivalTimeCancel}
            /> */}
            <Button
                title="Search"
                onPress={search}
            />
        </View>
      </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    //   justifyContent: 'center',
      alignItems: 'center',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    bold: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        fontWeight: 'bold',
      },
    input: {
      backgroundColor: 'pink',
      width: "90%",
      fontSize: 15,
      padding: 8,
      borderColor: "blue",
      borderWidth: 0.2,
      borderRadius: 10,
    },
    location: {
        // container: {
        //     flex: 1,
        //   },
          textInputContainer: {
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth:0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
    }
  });

  export default SearchRide