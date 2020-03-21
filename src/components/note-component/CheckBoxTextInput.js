import React,{Component} from 'react';
import {View,StyleSheet,TextInput,TouchableOpacity,Animated} from 'react-native';
import {CheckBox,Button,Icon} from 'react-native-elements';
import { ThemeProvider } from '@react-navigation/native';



export default class CheckBoxTextInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isChecked: false,
            textInput: '',
            textInputHeight: new Animated.Value(50)
        }

    }

    handleTextInputHeight(e){
        const height = e.nativeEvent.contentSize.height;
        if(height < 300){
            return Animated.timing(this.state.textInputHeight,
                {duration: 250,toValue: height+10}).start()
        }
    }

    render(){
        return(
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                    margin: 0
                }}
            >
                <CheckBox
                    size={32}
                    checked= {this.state.isChecked}
                    onPress = {()=>{this.setState({isChecked : ! this.state.isChecked})}}
                    containerStyle = {{padding: 0,top: 8}}
                    iconType = 'ionicon'
                    checkedIcon = 'md-checkbox'
                    uncheckedIcon = 'md-square-outline'
                    uncheckedColor = {'#ffffff'}
                    checkedColor = {"#ffffff"}
                />

                <Animated.View style={{height: this.state.textInputHeight}}>
                    <TextInput
                        multiline
                        style={StyleSheet.flatten([styles.textInputStyle,{
                            width: (this.props.width-70-20),
                            minHeight: 50,
                            color: this.props.textColor,
                            backgroundColor: this.props.lighterBackColor,
                            paddingHorizontal: 5,
                            left: -5
                        }])}
                        autoCorrect= {false}
                        onContentSizeChange={e=>{this.handleTextInputHeight(e)}}
                        onChangeText={text=> {
                            this.setState({textInput: text});
                        }}
                        value = {this.state.textInput}
                    />
                </Animated.View>


                <TouchableOpacity style={{paddingHorizontal: 10,top: 10}}>                 
                    <Icon
                        type='ionicon'
                        name= {"md-close"} 
                        size = {35} 
                        color = {'#ffffff'}
                    />
                </TouchableOpacity>
 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInputStyle:{
        //style of box itself
        borderColor: 'white',
        borderRadius: 5,
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom:5,
        //style of text inserted
        fontSize: 17,
        fontFamily: 'sans-serif',
        padding: 10
    },

  });  