import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const Login = () => {
  const {params} = useRoute();
  const message = params.text;
  return (
    <View>
      <Text>{message}</Text>
    </View>
  )
}

export default Login