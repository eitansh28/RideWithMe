import { View, Text, Button } from 'react-native'
import React from 'react'

const S = ({navigation}) => {

    const move = () =>{
        navigation.navigate('Login')
    }
  return (
    <View>
      <Text>HomePage</Text>
        <Button title='move to Login' onPress={move}
        
        />
    </View>
  )
}

export default S