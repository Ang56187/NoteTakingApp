import React,{Component} from 'react';
import { StyleSheet,View,ScrollView,TouchableNativeFeedback, Animated,Text } from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import color from 'color';


export default class AddTextInputPicker extends React.Component{
    render(){
        return(
            <View style = {{flexDirection: 'column',justifyContent: 'center',overflow:'hidden'}}>
 
                {/* for adding pointer button */}
                <View
                    style={styles.outerBtnView}
                > 
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(color(this.props.backColor).darken(0.3), true)}
                        onPress = {()=>{this.props.addComponent('pointer')}}
                    >
                        <View
                            style={styles.innerBtnView}
                        >
                            <Icon
                                name= {"md-add"} 
                                size = {35} 
                                style = {{color: 'white'}}
                            /> 
                            <Text style= {styles.textStyle}
                            >
                                Pointer
                            </Text>
                            <View
                                style={{
                                    borderRadius: 20,
                                    width: 15,
                                    height: 15,
                                    backgroundColor: '#ffffff',
                                    margin: 10,
                                }}
                            />

                        </View>   
                    </TouchableNativeFeedback>
                </View>

                {/* For adding checkbox */}
                <View
                    style={styles.outerBtnView}
                > 
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(color(this.props.backColor).darken(0.5), true)}
                        onPress = {()=>{this.props.addComponent('checkbox')}}
                    >
                        <View
                            style={styles.innerBtnView}
                        >
                            <Icon
                                name= {"md-add"} 
                                size = {35} 
                                style = {{color: 'white'}}
                            /> 
                            <Text style= {styles.textStyle}
                            >
                                Checkbox
                            </Text>
                            <Icon
                                name= {"md-checkbox"} 
                                size = {29} 
                                style = {{color: 'white'}}
                            /> 

                        </View>   
                    </TouchableNativeFeedback>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    outerBtnView:{
        width: 300,
        backgroundColor: 'transparent',
        borderRadius: 20,
        height: 45
    },
    innerBtnView:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 300,
        borderRadius: 20,
        height: 45,
        paddingHorizontal: 10,
    },
    textStyle:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'sans-serif-light'
    }
});