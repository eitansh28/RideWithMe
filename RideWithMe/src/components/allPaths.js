import { View, Text,StyleSheet,Keyboard, Button, FlatList } from 'react-native'
import React,{useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'
import SearchRidesRowDisplay from "./SearchRidesRowDisplay";
import { useNavigation } from '@react-navigation/native';

const allPaths = ({UseRides, user_location}) => {
    console.log("?????/????",user_location)
    const navigation = useNavigation();
    let counter = 0;
    let time = 0;
    let price = 0;
    const [isVisible, setIsVisible] = useState(false);
    for (const ride in UseRides){
        console.log(ride);
    }
    const get_path_length = ()=>{
        for (const ride in UseRides){
            if(UseRides[ride].edge && UseRides[ride].edge.type == "ride"){
                counter++;
                time += parseInt(UseRides[ride].edge.weight);
                price += parseInt(UseRides[ride].edge.price);
            }
        }
    }
    get_path_length();

    const movetofullpath = () => {
        navigation.navigate('movetofullpath', {
            screen : 'movetofullpath',       
            params : {UseRides: UseRides, user_location:user_location},
          });
      };

    return (
    
      <View style = {{flex:0.5,backgroundColor:'white',borderRadius:10,margin:10, padding:20,fontSize: 30}}>
    
      <Text style={{fontSize:22}}> number of rides: {counter}</Text>
      <Text style={{fontSize:22}}> total approximation time: {time}</Text>
      <Text style={{fontSize:22}}> total price: {price}</Text>
      <View style={theStyle.separator}></View>
      <Button color ="green" title="view the full path" onPress={movetofullpath} />
    </View>
  )
}
const theStyle = StyleSheet.create({
  separator: {
    width: 1,
    height: '8%',
  },
    input: {
      margin: 10,
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
    },
  });


export default allPaths