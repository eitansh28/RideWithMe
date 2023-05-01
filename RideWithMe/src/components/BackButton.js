import React from 'react';
import { View, Button, TouchableOpacity, Image  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  // Function to handle back button press
  const handleBackPress = () => {
    navigation.goBack(); // Go back to previous screen
  };

  return (
    <View>
      <TouchableOpacity onPress={handleBackPress}>
      <Image
        source={require('../components/arrow.png')} // Replace with the path to your arrow image in the assets folder
        style={{ width: 30, height: 30 }} // Set the desired width and height of the arrow image
      />
    </TouchableOpacity>
    </View>
  );
};

export default BackButton;