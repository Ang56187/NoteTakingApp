import React,{Component} from 'react';
import { StyleSheet,View,Dimensions,Animated } from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

const deviceWidth = Math.round(Dimensions.get('window').width);

export default class NoteBottomBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewHeight: new Animated.Value(51),
            viewOpacity: new Animated.Value(0.5),
            isViewOpen: false
        }
    }

    expandView(){
        var ani1 = Animated.timing(this.state.viewHeight,
            {duration: 300,toValue: 140});
        var ani2 = Animated.timing(this.state.viewOpacity,
            {duration: 400,toValue:1});
        return Animated.parallel([ani1,ani2]);
    }

    
    shrinkView(){
        var ani1 = Animated.timing(this.state.viewHeight,
            {duration: 300,toValue: 51});
        var ani2 = Animated.timing(this.state.viewOpacity,
            {duration: 400,toValue:0.5});
        return Animated.parallel([ani1,ani2]);
    }

    handleIsViewOpen(){
        this.setState({isViewOpen: !this.state.isViewOpen});
    }

    render(){
        return(
            <View style={styles.container}>
                <Animated.View style={StyleSheet.flatten([
                    styles.container,
                    {
                        height: this.state.viewHeight,
                        borderTopWidth: 1,
                        borderColor: 'white',
                        opacity: this.state.viewOpacity}])}>

                </Animated.View>
                <View style = {styles.container}>
                    {/* Go back to main page */}
                    <Button
                        type = "clear" 
                        onPress={() =>{
                            this.handleIsViewOpen();
                            if(this.state.isViewOpen){
                                this.expandView().start();
                            }
                            else{
                                this.shrinkView().start();
                            }
                        }}
                        icon = {
                        <Icon
                            name= {"md-add"} 
                            size = {35} 
                            style = {{color: 'white'}}
                        />  
                        }
                    />
                    {/* Save the note created */}
                    <Button
                        type = "clear" 
                        onPress={() =>{}}
                        icon = {
                        <Icon
                            name= {"md-more"} 
                            size = {35} 
                            style = {{color: 'white'}}
                        />  
                        }
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        // set to most bottom
        position: 'absolute',
        bottom: 0,
        zIndex:2,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        //TODO
        //later change color here to use prop color from parent
        backgroundColor: '#21B2F2',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textStyle:{
        fontSize: 26,
        color: 'white',
        fontFamily: 'sans-serif-light'
    }
});