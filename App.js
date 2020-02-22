import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderBar from './components/header-components/HeaderBar'
import StatusBarBackground from './components/StatusBarBackground'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBarBackground style={{backgroundColor:'midnightblue'}}/>
      <HeaderBar/>
      <Text>Why are you running!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
