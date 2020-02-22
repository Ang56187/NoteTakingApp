import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

//to prevent overlapping with the notification

const statusBarBackground = props => {
    return(
      <View style={[styles.statusBarBackground, props.style || {}]}> 
      </View>
    );
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 18 : 24, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: "white",
  }

})

export default statusBarBackground;
