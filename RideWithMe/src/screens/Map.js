import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import BackButton from '../components/BackButton';
import { IP } from '../components/constants';

const Map = ({ route }) => {
  const { driverLocation, destinationLocation, travel_doc_id } = route.params; // Receive the props
  const [passengers, setPassengers] = useState([]);

  const convertToCoordinates = async (locationString) => {
    console.log("IM HEREeeeeeeeeeeeeeeeeeeeeeee")
    try {
      const apiKey = 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0';
      const encodedLocation = encodeURIComponent(locationString);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch coordinates from Google Maps API.');
      }
  
      const data = await response.json();
  
      if (data.results.length === 0) {
        throw new Error('No results found for the location.');
      }
  
      const { lat, lng } = data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } catch (error) {
      console.log('Error converting location to coordinates:', error);
      return null; // Return null or handle the error as needed in your app
    }
  };
  

  useEffect(() => {
    const getPassengers = async () => {
      try {
        const res = await fetch("http://"+IP+":1000/getPassengers", {
          method: "POST", 
          headers: { 
            Accept: "application/json",
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({ travel_doc_id: travel_doc_id })
        });
  
        const responseJson = await res.json();

        if (responseJson.passengers_data) {
          const updatedPassengers = await Promise.all(
            responseJson.passengers_data.map(async (passenger) => {
              const { from_where } = passenger;
              const coordinates = await convertToCoordinates(from_where);
              return { ...passenger, coordinates };
            })
          );
  
          setPassengers(updatedPassengers);
        } else {
          console.log("No passengers data found.");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getPassengers();
  }, [travel_doc_id]);
  

  console.log("PASSENGERS");
  console.log(passengers);
  console.log("PASSENGERS");

  if (!driverLocation || !destinationLocation) {
    return (
      <View style={styles.container}>
        <BackButton/>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Use the latitude and longitude from the props
  const initialRegion = {
    latitude: driverLocation.latitude,
    longitude: driverLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={MapView.PROVIDER_GOOGLE}
        showsUserLocation={true}
      >
        {/* Markers for each passenger */}
        {passengers.map((passenger, index) => (
          <Marker
            key={index}
            coordinate={passenger.coordinates}
            title={`Passenger ${index + 1}`}
            pinColor="green" // Set a different color for passenger markers (e.g., green)
          />
        ))}
        {/* Marker for the driver */}
        <Marker
          coordinate={{
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
          }}
          title="Driver"
          pinColor="blue"
        />
  
        {/* Marker for the destination */}
        <Marker
          coordinate={{
            latitude: destinationLocation.latitude,
            longitude: destinationLocation.longitude,
          }}
          title="Destination"
          pinColor="red"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;
