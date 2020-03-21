import React,{Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet,View,TextInput,Dimensions,ScrollView,Text,KeyboardAvoidingView, Animated , UIManager} from 'react-native';
import color from 'color';
import NoteHeaderBar from '../components/note-creation/NoteHeaderBar';
import NoteBottomBar from '../components/note-creation/NoteBottomBar';
import CheckBoxTextInput from '../components/note-component/CheckBoxTextInput'


const backgroundColor = '#21B2F2';
const deviceWidth = Math.round(Dimensions.get('window').width);

export default class NoteCreationPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            titleTextInput: '',
            titleTextInputHeight: new Animated.Value(50),
            showTitleError: false,
            textInput: '',
            textInputHeight: new Animated.Value(50),

            //for color background setting
            backColor: '#21B2F2',
            //for text color setting
            textColor: '#ffffff',
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        
        this.handleBackColor = this.handleBackColor.bind(this);
        this.handleTextColor = this.handleTextColor.bind(this);

    }

    // limit text input size if text exceed the intended size
    handleTitleTextInputHeight(e){
        const height = e.nativeEvent.contentSize.height;
        if(height < 100){
            return Animated.timing(this.state.titleTextInputHeight,
                {duration: 200,toValue: height+10}).start()
        }
    }

    handleTextInputHeight(e){
        const height = e.nativeEvent.contentSize.height;
        if(height < 300){
            return Animated.timing(this.state.textInputHeight,
                {duration: 200,toValue: height+10}).start()
        }
    }

    handleBackColor(color){
        this.setState({backColor: color});
    }

    handleTextColor(color){
        this.setState({textColor: color});
    }


    render(){
        //set as background color of textinput as lighter version of background color
        this.lighterBackColor = color(this.state.backColor).lighten(0.1);

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
                    {/* Vew to always keep textinput above keyboard, or else cant see */}
                    <KeyboardAvoidingView 
                        behavior="padding" 
                        keyboardVerticalOffset={40}  
                        style={{flex:1}}
                        enabled 
                    >
                        <ScrollView 
                            contentContainerStyle={styles.scrollStyle}
                            ref={(el)=>{this.scrollbar = el;}}
                        >
                            {/* label to show text "title" */}
                            <Text style={styles.textLabelStyle}>Title</Text>
                            {/* Text input for title */}
                            <Animated.View style={{ height: this.state.titleTextInputHeight }}>
                                <TextInput
                                    multiline
                                    maxLength = {100}
                                    // no choice to disable autocorrect, since it keep creating bugs on word count limit
                                    autoCorrect= {false}
                                    style={StyleSheet.flatten([styles.textInputStyle,{
                                        color: this.state.textColor,
                                        backgroundColor: this.lighterBackColor
                                    }])}
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
                                    onContentSizeChange = {e => {this.handleTitleTextInputHeight(e);}}
                                    value = {this.state.titleTextInput}
                                />
                            </Animated.View>

                            {/* Shown as error once reached max word count */}
                            {this.state.showTitleError ? 
                            <Text style={styles.errorTextStyle}>
                                Maximum characters for title is 100.
                            </Text> : null}
                            
                            {/* label to show text "Notes list" */}
                            <Text style={styles.textLabelStyle}>Note</Text>
                            {/* Text input for notes content(first part anyways) */}
                            <Animated.View style={{height: this.state.textInputHeight}}>
                                <TextInput
                                    multiline
                                    ref={(el)=>{this.firstNoteInput = el;}}
                                    style={StyleSheet.flatten([styles.textInputStyle,{
                                        color: this.state.textColor,
                                        backgroundColor: this.lighterBackColor
                                    }])}
                                    autoCorrect= {false}
                                    onChangeText={text=> {
                                        this.setState({textInput: text});
                                    }}
                                    onContentSizeChange = {e => {
                                        this.handleTextInputHeight(e);
                                    }}
                                    value = {this.state.textInput}
                                />
                            </Animated.View>

                            <CheckBoxTextInput 
                                width={deviceWidth} 
                                lighterBackColor={this.lighterBackColor}
                                textColor={this.state.textColor}
                            />

                        </ScrollView>
                    </KeyboardAvoidingView>

                    {/* bottom bar that allows for options for that note */}
                    <NoteBottomBar 
                        //sending props to child(prop drilling is bad lets not do it again)
                        handleBackColor={this.handleBackColor} 
                        handleTextColor={this.handleTextColor}
                        backColor={this.state.backColor}
                        textColor={this.state.textColor}
                    />
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
        paddingBottom: 300,
        width: deviceWidth,
        alignItems: 'center',
    },
    textInputStyle:{
        //style of box itself
        width: (deviceWidth-20),
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