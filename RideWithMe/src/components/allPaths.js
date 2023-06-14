import { View, Text,StyleSheet,Keyboard, Button, FlatList } from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';

const AllPaths = ({UseRides, user_location}) => {
    const navigation = useNavigation();
    let count_rides = 0;
    let km = 0;
    let time = 0;
    let price = 0;
    

    const get_path_details = ()=>{
      const start_date = new Date(UseRides[1].vertex.time);
        for (const ride in UseRides){
            if(UseRides[ride].edge && UseRides[ride].edge.type == "ride"){
                count_rides++;
                km += parseInt(UseRides[ride].edge.weight);
                price += parseInt(UseRides[ride].edge.price);
                const update_date = new Date(UseRides[ride].vertex.time);
                update_date.setMinutes(update_date.getMinutes() + (UseRides[ride].edge.weight/1.33));
                time = update_date - start_date;
                time_in_min = Math.floor(time/(1000*60));
            }
        }
    }
    get_path_details();

    const movetofullpath = () => {
        navigation.navigate('movetofullpath', {
            screen : 'movetofullpath',       
            params : {UseRides: UseRides, user_location:user_location},
          });
      };

    return (
    
      <View style = {{flex:0.5,backgroundColor:'white',borderRadius:10,margin:10, padding:20,fontSize: 30}}>
      <Text style={{fontSize:20}}> number of rides: {count_rides}</Text>
      <Text style={{fontSize:20}}> kilometers: {km}</Text>
      <Text style={{fontSize:20}}> total approx time: {parseInt(time_in_min)} minutes</Text>
      <Text style={{fontSize:20}}> total price: {price}</Text>
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


export default AllPaths