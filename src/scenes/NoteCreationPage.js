import React,{Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet,View } from 'react-native';
import Button from 'react-native-elements';

const backgroundColor = '#21B2F2';

export default class NoteCreationPage extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style = {styles.coloredView}>
                </View>
            </View>
        );
 
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      alignItems: 'stretch'
    },
    coloredView:{
        backgroundColor: backgroundColor,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
  });  