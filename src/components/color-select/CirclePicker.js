import React,{Component} from 'react';
import { StyleSheet,View,ScrollView,TouchableOpacity, Animated } from 'react-native';
import {Button} from 'react-native-elements';

const listOfColors = [
    '#4D4D4D', '#999999','#F44E3B', '#FE9200', '#FCDC00', 
    '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', 
    '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', 
    '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', 
    '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', 
    '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
]

export default class CirclePicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            focusedWhiteSize: new Animated.Value(0),
            focusedOpacity: new Animated.Value(0),
            clickedBtnKey: null
        }
    }

    expandFocusRadius = () =>{
        //needed to delay animation to allow ani to be played at buttons at the right
        const ani1 = Animated.timing(this.state.focusedOpacity,
            {duration: 100,toValue: 1})
        //
        const ani2 = Animated.timing(this.state.focusedWhiteSize,
            {duration: 80,toValue: 30});
        const ani3 = Animated.timing(this.state.focusedWhiteSize,
            {duration: 100,toValue: 23});
        return Animated.sequence([ani1,ani2,ani3]).start();
    }

    render(){

        this.expandFocusRadius()

        return(
            <ScrollView style = {{
                width: this.props.width-10,
                maxHeight: 80,
                backgroundColor: 'transparent',
                paddingBottom: 5,
                zIndex: 1
            }}
            horizontal = {true}
            >
                {
                    //loops thorugh each color in array to buttons
                    listOfColors.map((item,key)=>(
                            <TouchableOpacity
                                key = {key}
                                style = {{
                                    width: 40,
                                    height: 40,
                                    marginRight: 10,
                                    marginBottom: 10,
                                    borderRadius: 20,
                                    borderWidth: 0.5,
                                    borderColor: '#ffffff',
                                    backgroundColor: item,
                                    justifyContent: 'center'  
                                }}
                                disabled = {this.props.isColorViewOpen ? false : true}
                                onPress = {()=>{
                                    this.setState({clickedBtnKey: key});
                                    this.props.handleBackColor(item);
                                 }}
                                activeOpacity = {0.7}
                            >
                                <Animated.View 
                                    key={key}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        height: this.state.clickedBtnKey==key
                                                ? this.state.focusedWhiteSize : 0,
                                        width: this.state.clickedBtnKey==key
                                                ? this.state.focusedWhiteSize : 0,
                                        borderRadius:20,
                                        opacity: this.state.focusedOpacity,
                                        alignSelf: 'center'}}/>
                            </TouchableOpacity>
                    ))
                }    
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollStyle:{

    }
})