import  * as SQLite from 'expo-sqlite';
import React,{Component} from 'react';
import Constants from 'expo-constants';
import color from 'color';
import { StyleSheet,View,Dimensions,Text, Animated , UIManager, LayoutAnimation} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { StackActions } from '@react-navigation/native';
import {Button} from 'react-native-elements';

//TODO 
//add gesture support later

const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);

export default class NoteDisplayHeaderBar extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                {/* Go back to main page */}
                <Button
                    type = "clear" 
                    onPress={() =>{
                        this.props.setAnimationType('goToNote');
                        this.props.navigation.navigate('home');
                    }}
                    icon = {
                    <Icon
                        name= {"md-arrow-back"} 
                        size = {30} 
                        style = {{color: 'white'}}
                    />  
                    }
                />
                {/* Save the note created */}
                <Button
                    type = "clear" 
                    onPress={() =>{
                        this.props.setAnimationType('goToNoteEdit');
                        this.props.navigation.navigate('noteCreation',{
                            note: this.props.note,
                        });
                    }}
                    icon = {
                    <Icon
                        name= {"md-create"} 
                        size = {28} 
                        style = {{color: 'white'}}
                    />  
                    }
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
