import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import BackButton from '../components/BackButton';

const SearchMap = ({ route }) => {
  const { start, end, middle } = route.params; // Receive the props
  const [middleCoordinates, setMiddleCoordinates] = useState([]);

  useEffect(() => {
    const fetchMiddleCoordinates = async () => {
      try {
        const middleCoordinates = await Promise.all(
          middle.map(async (mid) => {
            const coordinates = await convertToCoordinates(mid);
            return coordinates;
          })
        );
        setMiddleCoordinates(middleCoordinates);
        console.log("MIDDLE COORDINATES: ", middleCoordinates);
      } catch (error) {
        console.log('Error fetching middle coordinates:', error);
      }
    };

    fetchMiddleCoordinates();
  }, [middle]);


    console.log("START: ", start);
    console.log("END: ", end);
    console.log("MIDDLE: ", middle);

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
      console.log("lat: ", lat);
      console.log("lng: ", lng);
      return { latitude: lat, longitude: lng };
    } catch (error) {
      console.log('Error converting location to coordinates:', error);
      return null; // Return null or handle the error as needed in your app
    }
  };
  

  if (!start || !end) {
    return (
      <View style={styles.container}>
        <BackButton/>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Use the latitude and longitude from the props
  const initialRegion = {
    latitude: start.latitude,
    longitude: start.longitude,
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
        {/* Marker for the start */}
        <Marker
          coordinate={{latitude: start.latitude,
            longitude: start.longitude}}
          title="Start"
          pinColor="blue"
        />
  
        {/* Marker for the end */}
        <Marker
          coordinate={{latitude: end.latitude,
            longitude: end.longitude}}
          title="End"
          pinColor="red"
        />

        {/* Markers for each middle location */}
        {middleCoordinates.map((coordinates, index) => (
          <Marker
            key={index}
            coordinate={{latitude: coordinates.latitude,
                longitude: coordinates.longitude}}
            title={`Middle ${index + 1}`}
            pinColor="green"
          />
        ))}
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

export default SearchMap;
