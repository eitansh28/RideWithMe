import { View, Text,StyleSheet,Keyboard, Button, FlatList } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';

const AllPaths = ({UseRides, user_location}) => {
    const navigation = useNavigation();
    let count_rides = 0;
    let km = 0;
    let time = 0;
    let price = 0;
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [middle, setMiddle] = useState([]);
    

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

    useEffect(()=>{
      const update_coor = () => {
        try {
          for (const ride in UseRides){
            if(UseRides[ride].vertex && UseRides[ride].vertex.type == "start_point"){
              let lat = UseRides[ride].vertex.lat;
              let lng = UseRides[ride].vertex.lng;
              setStart({ latitude: lat, longitude: lng });
            }if(UseRides[ride].vertex && UseRides[ride].vertex.type == "end_point"){
              let lat = UseRides[ride].vertex.lat;
              let lng = UseRides[ride].vertex.lng;
              setEnd({ latitude: lat, longitude: lng });
            }if(UseRides[ride].edge && UseRides[ride].edge.type == "ride"){
              let mid = UseRides[ride].edge.dest;
              setMiddle((prevMiddle) => [...prevMiddle, mid]);
            }
          }

          setMiddle((prevMiddle) => prevMiddle.slice(0, prevMiddle.length - 1));

          console.log("START: ", start);
          console.log("END: ", end);
          console.log("MIDDLE: ", middle);

        } catch (error) {
          console.error('Error parsing locations: ', error);
          // Show an error message if there's an issue with parsing the locations
          // You can handle this error based on your app's requirements
        }
      }
      update_coor();
    }, [UseRides]);

    function move_to_map() {
      // Navigate to the Map component and pass driverLocation and destinationLocation as props
      navigation.navigate('SearchMap', {
        start: start,
        end: end,
        middle: middle
      });
    }

      console.log("UseRides: ", UseRides)
      console.log("user_location: ", user_location)

    return (
    
      <View style = {{flex:0.5,backgroundColor:'white',borderRadius:10,margin:10, padding:20,fontSize: 30}}>
      <Text style={{fontSize:20}}> number of rides: {count_rides}</Text>
      <Text style={{fontSize:20}}> kilometers: {km}</Text>
      <Text style={{fontSize:20}}> total approx time: {parseInt(time_in_min)} minutes</Text>
      <Text style={{fontSize:20}}> total price: {price}</Text>
      <View style={theStyle.separator}></View>
      <Button color ="blue" title="view the full path" onPress={movetofullpath} />
      <Button color ="green" title="Map" onPress={move_to_map} />
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