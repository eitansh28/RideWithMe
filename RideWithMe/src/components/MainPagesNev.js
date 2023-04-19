import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchRide from "../screens/SearchRide";
import PostRide from "../screens/PostRide";
import myRides from "../screens/MyRides";

const MainPagesNev = () => {
  const homeName = "Home";
  const searchName = "Search Ride";
  const postName= "Post Ride";
  const profileName = "Profile";
  const ridesName = "myRides";
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === searchName) {
            iconName = focused
              ? "search"
              : "search-outline";
          } else if (rn == postName) {
            iconName = focused ? "reader" : "reader-outline";
          } else if (rn == profileName) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          else if (rn == ridesName) {
            iconName = focused ? "car" : "car-outline";
          }
          
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 7, fontSize: 10 },
        style: { padding: 10, height: 70 },

      }}
    >
      <Tab.Screen
        name={homeName}
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={searchName}
        options={{ headerShown: false }}
        component={SearchRide}
      />
      <Tab.Screen
        name={postName}
        options={{ headerShown: false }}
        component={PostRide}
      />
      <Tab.Screen
        name={profileName}
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
       <Tab.Screen
        name={ridesName}
        options={{ headerShown: false }}
        component={myRides}
      />
    </Tab.Navigator>
  );
};

export default MainPagesNev;