import React,{Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet,View,TextInput,Dimensions,ScrollView,Text } from 'react-native';
import {Button} from 'react-native-elements';
import NoteHeaderBar from '../components/note-creation/NoteHeaderBar';
import NoteBottomBar from '../components/note-creation/NoteBottomBar';


const backgroundColor = '#21B2F2';
const deviceWidth = Math.round(Dimensions.get('window').width);

export default class NoteCreationPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            titleTextInput: '',
            titleTextInputHeight: 50,
            showTitleError: false,
            textInput: '',
            textInputHeight: 50,

            //for color background setting
            backColor: '#21B2F2'
        }

        this.handleBackColor = this.handleBackColor.bind(this);
    }

    // limit text input size if text exceed the intended size
    handleTitleTextInputHeight(e){
        const height = e.nativeEvent.contentSize.height;
        this.setState({
            titleTextInputHeight: height > 100 ? 100 : height
        });
    }

    handleTextInputHeight(e){
        const height = e.nativeEvent.contentSize.height;
        this.setState({
            textInputHeight: height > 300 ? 300 : height
        });
    }

    handleBackColor(color){
        this.setState({backColor: color});
    }

    render(){
        
        return(
            <View style={styles.container}>
                <View style = {{
                            backgroundColor: this.state.backColor,
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                }}>
                    {/* The header with 2 buttons and text in middle */}
                    <NoteHeaderBar/>
                    <ScrollView contentContainerStyle={styles.scrollStyle}>
                        {/* label to show text "title" */}
                        <Text style={styles.textLabelStyle}>Title</Text>
                        {/* Text input for title */}
                        <TextInput
                            multiline
                            maxLength = {100}
                            placeholder = {"enter note title here.."}
                            // no choice to disable autocorrect, since it keep creating bugs on word count limit
                            autoCorrect= {false}
                            style={StyleSheet.flatten([styles.textInputStyle,{height: this.state.titleTextInputHeight}])}
                            onChangeText={text=> {
                                this.setState({ titleTextInput: text });
                                if(this.state.titleTextInput.length <= 100){
                                    this.setState({showTitleError:false})
                                }
                            }}
                            //detect error if key typed even if max char reached
                            onKeyPress = {e=>{
                                if(this.state.titleTextInput.length == 100){
                                    this.setState({showTitleError: true});                                   
                                    setTimeout(()=>{this.setState({showTitleError: false});},2500);
                            }}}
                            onContentSizeChange = {e => {this.handleTitleTextInputHeight(e)}}
                            value = {this.state.titleTextInput}
                        />

                        {/* Shown as error once reached max word count */}
                        {this.state.showTitleError ? 
                        <Text style={styles.errorTextStyle}>
                            Maximum characters for title is 100.
                        </Text> : null}
                        
                        {/* label to show text "Notes list" */}
                        <Text style={styles.textLabelStyle}>Notes list</Text>
                        {/* Text input for notes content(first part anyways) */}
                        <TextInput
                            multiline
                            placeholder = {"enter note text here.."}
                            style={StyleSheet.flatten([styles.textInputStyle,{height: this.state.textInputHeight}])}
                            autoCorrect= {false}
                            onChangeText={text=> {this.setState({textInput: text});}}
                            onContentSizeChange = {e => {this.handleTextInputHeight(e)}}
                            value = {this.state.textInput}
                        />
                        <Button containerStyle={{height:200,backgroundColor: 'blue'}}/>
                    </ScrollView>
                    {/* bottom bar that allows for options for that note */}
                    <NoteBottomBar handleBackColor={this.handleBackColor} backColor={this.state.backColor}/>
                </View>
            </View>
        );
 
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 0,
      marginTop: Constants.statusBarHeight,
    },
    scrollStyle:{
        paddingBottom: 60,
        width: deviceWidth,
        alignItems: 'center',
    },
    textInputStyle:{
        //style of box itself
        width: (deviceWidth-20),
        borderColor: 'white',
        borderWidth: 0.5,
        marginTop: 10,
        marginBottom:10,
        //style of text inserted
        fontSize: 20,
        fontFamily: 'sans-serif',
        color: 'white',
        padding: 10
    },
    textLabelStyle:{
        fontSize: 23,
        color: 'white',
        fontFamily: 'sans-serif-light',
        alignSelf: 'flex-start',
        marginLeft:20
    },
    errorTextStyle:{
        fontSize: 15,
        color: 'red',
        fontFamily: 'sans-serif'
    }
  });  