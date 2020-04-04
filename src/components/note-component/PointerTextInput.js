import React,{Component} from 'react';
import {View,StyleSheet,TextInput,TouchableOpacity,Animated} from 'react-native';
import {CheckBox,Button,Icon} from 'react-native-elements';
import { ThemeProvider } from '@react-navigation/native';


export default class PointerTextInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            textInput: this.props.ele.text,
            textInputHeight: new Animated.Value(50),
            animateBorderWidth: new Animated.Value(0)
        }

        this.animateXAsMount = new Animated.Value(0);

    }

    //check if component should update
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.ele.id !== this.props.ele.id || 
            nextProps.textInput!== this.state.textInput
            ) {
          return true;
        }
        return false;
      }

    //when component rendered
    componentDidMount(){
        Animated.timing(
            this.animateXAsMount,
            {
                toValue:0.5,
                duration:250,
                useNativeDriver: true
            }
        ).start(()=>{(this.props.editable ? this.props.afterAnimationComplete(): null)});
    }

    removeItem =()=>{
        Animated.timing(
            this.animateXAsMount,
            {
                toValue:1,
                duration:250,
                useNativeDriver: true
            }
        ).start(()=>{this.props.removeComponent(this.props.ele.id)});
    }

    handleTextInputHeight(e){
        const height = e.nativeEvent.contentSize.height;
        if(height < 300){
            return Animated.timing(this.state.textInputHeight,
                {duration: 250,toValue: height+10}).start()
        }
    }

    render(){

        const translateAnimate= this.animateXAsMount.interpolate({
            inputRange: [0,1],
            outputRange: [-this.props.width,this.props.width]
        });

        return(
            <Animated.View
                style={{
                    transform: [{translateX: translateAnimate}],
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                    margin: 0
                }}
            >
                <Animated.View
                    style={{
                        borderRadius: 20,
                        width: 15,
                        height: 15,
                        backgroundColor: '#ffffff',
                        margin: 13,
                        marginRight:16
                    }}
                />
                <Animated.View style={[styles.textInputViewStyle,{
                        width: (this.props.editable ? (this.props.width-70-20) : (this.props.width-37-20)),
                        height: this.state.textInputHeight,
                        padding: 5,
                        borderColor: (this.props.editable ? this.props.lighterBorderColor: null),
                        borderBottomWidth: (this.props.editable ? this.state.animateBorderWidth: 0),
                        marginRight: (!this.props.editable ? 10 : 0),
                        backgroundColor: this.props.lighterBackColor,
                    }]}>
                    <TextInput
                        multiline
                        style={StyleSheet.flatten([styles.textInputStyle,{
                            color: this.props.textColor,
                        }])}
                        onFocus = {()=>{
                            const ani1 = Animated.timing(this.state.animateBorderWidth,{duration:300,toValue:2});
                            const ani2 = Animated.timing(this.state.animateBorderWidth,{duration:300,toValue:1})
                            Animated.sequence([ani1,ani2]).start();
                        }}
                        onBlur = {()=>{
                            Animated.timing(this.state.animateBorderWidth,{duration:300,toValue: 0}).start();
                        }}
                        autoCorrect= {false}
                        onContentSizeChange={e=>{this.handleTextInputHeight(e)}}
                        onChangeText={text=> {
                            this.setState({textInput: text});
                            this.props.handleUpdateNoteText(this.props.ele.id,text);
                        }}
                        value = {this.state.textInput}
                        editable = {this.props.editable}
                    />
                </Animated.View>


                {this.props.editable ?
                    <TouchableOpacity 
                        style={{paddingHorizontal: 10,top: 10}}
                        onPress={this.removeItem}
                    >                 
                        <Icon
                            type='ionicon'
                            name= {"md-close"} 
                            size = {29} 
                            color = {'#ffffff'}
                        />
                    </TouchableOpacity> : null
                }
 
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    textInputViewStyle:{
        //style of box itself
        borderRadius: 5,
        marginTop: 5,
        marginBottom:5,
    },
    textInputStyle:{
        //style of text inserted
        fontSize: 17,
        fontFamily: 'sans-serif',
    },

  });  