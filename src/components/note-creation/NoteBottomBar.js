import React,{Component} from 'react';
import { StyleSheet,View,Dimensions,Animated,UIManager,LayoutAnimation } from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import CirclePicker from '../color-select/CirclePicker'
import AddTextInputPicker from '../note-creation/AddTextInputPicker'


const deviceWidth = Math.round(Dimensions.get('window').width);

export default class NoteBottomBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewHeight: new Animated.Value(51),
            viewOpacity: new Animated.Value(0),
            viewY: new Animated.Value(0),
            viewX: new Animated.Value(0),
            disabled: false,
            isColorViewOpen: false,
            isAddViewOpen: false
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    expandView(expandedHeight){
        var ani1 = Animated.timing(this.state.viewHeight,
            {duration: 500,toValue: expandedHeight+15});
        var ani1A = Animated.timing(this.state.viewHeight,
            {duration: 300,toValue: expandedHeight});
        var ani2 = Animated.timing(this.state.viewY,
            {duration: 600,toValue:50+15});
        var ani2A = Animated.timing(this.state.viewY,
            {duration: 300,toValue:50});
        return Animated.parallel([Animated.sequence([ani1,ani1A]),
                                    Animated.sequence([ani2,ani2A])]);
    }

    
    shrinkView(){
        var ani1 = Animated.timing(this.state.viewHeight,
            {duration: 600,toValue: 51});
        var ani2 = Animated.timing(this.state.viewY,
            {duration: 600,toValue:-110});
        return Animated.parallel([ani1,ani2]);
    }

    changeViewOpacity(x,duration){
        return Animated.timing(this.state.viewOpacity,{duration:duration,toValue: x})
    }

    changeViewX(x,duration){
        let aniValue;
        if(x == 0){
            aniValue = x-5;
        }
        else{
            aniValue = x+5;
        }

        var ani1 = Animated.timing(this.state.viewX,{duration:duration,toValue: aniValue });
        var ani2 =  Animated.timing(this.state.viewX,{duration:duration,toValue: x});
        return Animated.sequence([ani1,ani2]);
    }

    render(){

        return(
            <Animated.View 
                style={StyleSheet.flatten([
                    styles.container,
                    {
                        backgroundColor: this.props.backColor,
                        overflow: 'hidden',
                        minHeight: this.state.viewHeight,
                        borderTopWidth: 0.5,
                        borderColor: 'white',
                    }])}
            >

                    <Animated.View style={StyleSheet.flatten([
                        styles.container,
                        {
                            bottom: this.state.viewY,
                            left: this.state.viewX,
                            opacity: this.state.viewOpacity,
                            flexDirection: 'column',
                        }])}>
                            { this.state.isColorViewOpen ?
                                <CirclePicker 
                                    //sending props to child(prop drilling is bad lets not do it again)
                                    width={deviceWidth} 
                                    backColor={this.props.backColor}
                                    textColor={this.props.textColor}
                                    handleBackColor={this.props.handleBackColor}
                                    handleTextColor={this.props.handleTextColor}
                                    isColorViewOpen = {this.state.isColorViewOpen}
                                /> 
                            : this.state.isAddViewOpen ?
                                <AddTextInputPicker
                                    width={deviceWidth}
                                    backColor = {this.props.backColor}
                                    addComponent = {this.props.addComponent}
                                /> 
                            : null } 


                    </Animated.View>

                
                <View style = {styles.container}>
                    {/*Add new types of notes*/}
                    <Button
                        type = "clear"
                        disabled = {this.props.disabled}
                        onPress={() =>{
                            //switch from add view to color picker view
                            if(this.state.isColorViewOpen && !this.state.isAddViewOpen){
                                //add view disappear
                                this.changeViewX(300,300).start();
                                this.changeViewOpacity(0,400).start(()=>{
                                    this.setState({isColorViewOpen: false,isAddViewOpen: true,viewX: new Animated.Value(-300)},
                                        ()=>{
                                            //color view appear
                                            this.changeViewX(0,300).start();
                                            this.changeViewOpacity(1,400).start()
                                        })
                                });
                            }   
                            else if(!this.state.isAddViewOpen){
                                this.setState({isAddViewOpen: true});
                                this.expandView(180).start();
                                this.changeViewOpacity(1,600).start();
                            }
                            else{
                                this.changeViewOpacity(0,600).start();
                                this.shrinkView().start(()=>{
                                    this.setState({isAddViewOpen: false});
                                });
                            }
                        }}
                        //
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
                        disabled = {this.state.disabled}
                        onPress={() =>{
                            //switch from color to add view picker view
                            if(!this.state.isColorViewOpen && this.state.isAddViewOpen){
                                //add view disappear
                                this.changeViewX(-300,300).start();
                                this.changeViewOpacity(0,400).start(()=>{
                                    this.setState({isAddViewOpen: false,isColorViewOpen: true,viewX: new Animated.Value(300)},
                                        ()=>{
                                            //color view appear
                                            this.changeViewX(0,300).start();
                                            this.changeViewOpacity(1,400).start()
                                        })
                                });
                            }   
                            else if(!this.state.isColorViewOpen){
                                this.setState({isColorViewOpen: true});
                                this.expandView(180).start();
                                this.changeViewOpacity(1,600).start();
                            }
                            else{
                                this.changeViewOpacity(0,600).start();
                                this.shrinkView().start(()=>{
                                    this.setState({isColorViewOpen: false});
                                });
                            }
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