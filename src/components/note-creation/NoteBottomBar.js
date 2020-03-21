import React,{Component} from 'react';
import { StyleSheet,View,Dimensions,Animated,UIManager } from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import CirclePicker from '../color-select/CirclePicker'

const deviceWidth = Math.round(Dimensions.get('window').width);

export default class NoteBottomBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewHeight: new Animated.Value(51),
            viewOpacity: new Animated.Value(0),
            viewX: new Animated.Value(0),
            isColorViewOpen: false
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    expandView(){
        var ani1 = Animated.timing(this.state.viewHeight,
            {duration: 800,toValue: 170});
        var ani2 = Animated.timing(this.state.viewOpacity,
            {duration: 600,toValue:1});
        var ani3 = Animated.timing(this.state.viewX,
            {duration: 700,toValue:50});
        return Animated.parallel([ani1,ani2,ani3]);
    }

    
    shrinkView(){
        var ani1 = Animated.timing(this.state.viewHeight,
            {duration: 800,toValue: 51});
        var ani2 = Animated.timing(this.state.viewOpacity,
            {duration: 600,toValue:0});
        var ani3 = Animated.timing(this.state.viewX,
            {duration: 700,toValue:-110});
        return Animated.parallel([ani1,ani2,ani3]);
    }

    handleIsViewOpen(){
        this.setState({isColorViewOpen: !this.state.isColorViewOpen});
    }

    render(){

        if(this.state.isColorViewOpen){
            this.expandView().start();
        }
        else{
            this.shrinkView().start();
        }

        return(
            <Animated.View 
                style={StyleSheet.flatten([
                    styles.container,
                    {
                        backgroundColor: this.props.backColor,
                        overflow: 'hidden',
                        height: this.state.viewHeight,
                        borderTopWidth: 0.5,
                        borderColor: 'white',
                    }])}
            >
                <Animated.View style={StyleSheet.flatten([
                    styles.container,
                    {
                        bottom: this.state.viewX,
                        opacity: this.state.viewOpacity,
                        flexDirection: 'column'
                    }])}>
                    <CirclePicker 
                        //sending props to child(prop drilling is bad lets not do it again)
                        width={deviceWidth} 
                        backColor={this.props.backColor}
                        textColor={this.props.textColor}
                        handleBackColor={this.props.handleBackColor}
                        handleTextColor={this.props.handleTextColor}
                        isColorViewOpen = {this.state.isColorViewOpen}
                    />
                </Animated.View>
                
                <View style = {styles.container}>
                    {/*Add new types of notes*/}
                    <Button
                        type = "clear" 
                        onPress={() =>{
                        }}
                        icon = {
                        <Icon
                            name= {"md-add"} 
                            size = {35} 
                            style = {{color: 'white'}}
                        />  
                        }
                    />
                    {/* Change settings of note(color,font etc)*/}
                    <Button
                        type = "clear" 
                        onPress={() =>{this.handleIsViewOpen();
                        }}
                        containerStyle ={{width: 35}}
                        icon = {
                        <Icon
                            name= {"md-more"} 
                            size = {35} 
                            style = {{color: 'white'}}
                        />  
                        }
                    />
                </View>
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        // set to most bottom
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textStyle:{
        fontSize: 26,
        color: 'white',
        fontFamily: 'sans-serif-light'
    }
});