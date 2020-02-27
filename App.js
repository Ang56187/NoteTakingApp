import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainWrapper from './components/MainWrapper'

export default function App() {
  return (
    <MainWrapper/>
  );
}


//test
// import * as React from 'react';
// import { View, Text,Button} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// //use navigation prop that passed to every screen component
// function HomeScreen({navigation}) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button 
//         title = "Go to details"
//         onPress=  {() => navigation.navigate("Detail")}
//       />
//     </View>
//   );
// }

// function DetailScreen({navigation}) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Button
//         title = "Go to home"
//         onPress=  {() => navigation.navigate("Home")}
//       />
//     </View>
//   );
// }

// //stacked
// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator headerMode= {"none"}> 
//         <Stack.Screen name="Home" component={HomeScreen}/> 
//         <Stack.Screen name="Detail" component={DetailScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
