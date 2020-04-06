import  * as SQLite from 'expo-sqlite';
import React,{Component} from 'react';
import Constants from 'expo-constants';
import color from 'color';
import { StyleSheet,View,TextInput,Dimensions,ScrollView,Text, Animated , UIManager, LayoutAnimation} from 'react-native';
import  NoteDisplayHeaderBar from '../components/note-display/NoteDisplayHeaderBar'
import PointerTextInput from '../components/note-component/PointerTextInput'
import CheckBoxTextInput from '../components/note-component/CheckBoxTextInput'


const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);

export default class NoteDisplayPage extends React.Component{
    constructor(props){
        super(props);
        const {note} = this.props.route.params;
        this.state = {
            titleText: note.title,
            text: note.firstNote,

            //for color background setting
            backColor: note.backColor,
            lighterBackColor : new color(note.backColor).lighten(0.1),
            //for text color setting
            textColor: note.textColor,

            //for storing checkboxes/options/notifications/normal text..
            componentArr: note.content,
        }

    }

    render(){
        const {note} = this.props.route.params;

        return(
            <Animated.View style={styles.container}>
                <View style = {{
                            backgroundColor: this.state.backColor,
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                }}>
                    {/* The header with 2 buttons and text in middle */}
                    <NoteDisplayHeaderBar
                        navigation = {this.props.navigation}
                        route = {this.props.route}
                        note = {this.props.route.params.note}
                    />
                        <ScrollView 
                            contentContainerStyle={styles.scrollStyle}
                            ref={(el)=>{this.scrollbar = el;}}
                        >
                            {/* label to show text "title" */}
                            <Text style={styles.textLabelStyle}>Title</Text>
                            <Text style={[styles.textStyle,
                                {
                                    color: this.state.textColor,
                                    backgroundColor: this.state.lighterBackColor
                                }]}
                            > 
                                {this.state.titleText}
                            </Text>
                            
                            {/* label to show text "Notes list" */}
                            <Text style={styles.textLabelStyle}>Notes</Text>
                            <Text style={[styles.textStyle,
                                {
                                    color: this.state.textColor,
                                    backgroundColor: this.state.lighterBackColor
                                }]}
                            > 
                                {this.state.text}
                            </Text>

                            {this.state.componentArr.map(ele=>{
                                if(ele.type === 'checkbox'){
                                    return (
                                        <CheckBoxTextInput
                                            key= {ele.id}
                                            ele = {ele}
                                            width={deviceWidth} 
                                            lighterBackColor={this.state.lighterBackColor}
                                            textColor={this.state.textColor}
                                            editable = {false}
                                        />
                                    )
                                }
                                if(ele.type === 'pointer'){
                                    return (
                                        <PointerTextInput
                                            key= {ele.id}
                                            ele = {ele}
                                            width={deviceWidth} 
                                            lighterBackColor={this.state.lighterBackColor}
                                            textColor={this.state.textColor}
                                            editable={false}
                                        />
                                    )
                                }
                            })}
                        </ScrollView>
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 0,
      marginTop: Constants.statusBarHeight,
    },
    scrollStyle:{
        paddingBottom: 300,
        width: deviceWidth,
        alignItems: 'center',
    },
    textStyle:{
        //style of text
        width: deviceWidth-20,
        borderRadius: 5,
        fontSize: 17,
        fontFamily: 'sans-serif',
        padding: 5
    },
    textLabelStyle:{
        fontSize: 22,
        color: 'white',
        fontFamily: 'sans-serif-light',
        alignSelf: 'flex-start',
        marginLeft:20
    },
  });  