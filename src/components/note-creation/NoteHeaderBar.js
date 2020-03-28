import React,{Component} from 'react';
import { StyleSheet,View,Text } from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

export default class NoteHeaderBar extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                {/* Go back to main page */}
                <Button
                    type = "clear" 
                    onPress={() =>{}}
                    icon = {
                    <Icon
                        name= {"md-arrow-back"} 
                        size = {35} 
                        style = {{color: 'white'}}
                    />  
                    }
                />
                {/* Text to be shown in mid, says Note creation */}
                <Text style={styles.textStyle}>Note creation</Text>
                {/* Save the note created */}
                <Button
                    type = "clear" 
                    onPress={() =>{this.props.handleSaveNote()}}
                    icon = {
                    <Icon
                        name= {"md-save"} 
                        size = {35} 
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
    },
    textStyle:{
        fontSize: 26,
        color: 'white',
        fontFamily: 'sans-serif-light'
    }
});