import React,{Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet,View,TextInput,Dimensions,ScrollView,Text,
    KeyboardAvoidingView, Animated , UIManager, LayoutAnimation} from 'react-native';
import color from 'color';
import NoteHeaderBar from '../components/note-creation/NoteHeaderBar';
import NoteBottomBar from '../components/note-creation/NoteBottomBar';
import CheckBoxTextInput from '../components/note-component/CheckBoxTextInput'
import PointerTextInput from '../components/note-component/PointerTextInput'

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
            lighterBackColor : new color('#21B2F2').lighten(0.1),
            lighterBorderColor: new color('#21B2F2').lighten(0.6),
            //for text color setting
            textColor: '#ffffff',

            //for storing checkboxes/options/notifications/normal text..
            componentArr: [],
            disabled: false
        }

        this.addNewEle = false;
        //starts index of components at 0
        this.index = 0;

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        
        this.handleBackColor = this.handleBackColor.bind(this);
        this.handleTextColor = this.handleTextColor.bind(this);
        this.addComponent = this.addComponent.bind(this);
        this.removeComponent = this.removeComponent.bind(this);
        this.handleUpdateNoteText = this.handleUpdateNoteText.bind(this);
        this.afterAnimationComplete = this.afterAnimationComplete.bind(this);
    }

    //for adding/removing components

    //callback after animation to add component is done
    afterAnimationComplete = () =>{
        //add arr index by 1
        this.index+=1;
        //button not disabled anymore
        this.setState({disabled: false});
    }

    addComponent = (eleType) =>{
            this.addNewEle = true

            //TODO
            //figure out how to save text too
            //newValue.type and text to be saved in note obj later as content
            const newValue = {id: this.index,type: eleType,text: ''}

            this.setState({
                //disable button so it wont create new component,
                //during progress of creating a new one
                //to avoid conflicting ids
                disabled: true,
                //add new one on top of pre-existing ones
                componentArr: [...this.state.componentArr,newValue]
            })
    }

    removeComponent = (id)=>{
        this.addNewEle = false;
        //remove the selected component through the id
        const newArray = [...this.state.componentArr];
        newArray.splice(newArray.findIndex(ele=>ele.id===id),1);

        //replace current array with new array
        this.setState({
                componentArr: newArray,
        },()=>{
            //animate that closing gap once middle component deleted
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            console.log('\n')
            // this.state.componentArr.forEach(e=>{console.log(e)})
        })    
    }



    // limit text input size if text exceed the intended size
    handleTitleTextInputHeight(e){
        const height = e.nativeEvent.contentSize.height;
        if(height < 100){
            return Animated.timing(this.state.titleTextInputHeight,
                {duration: 200,toValue: height+10}).start();
        }
    }

    handleTextInputHeight(e){
        const height = e.nativeEvent.contentSize.height;
        if(height < 300){
            return Animated.timing(this.state.textInputHeight,
                {duration: 200,toValue: height+10}).start(
                    ()=>{
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    }
                );
        }
    }

    //updates the note message in the componentArr array objects
    //by updating its text property
    //TODO
    //error here on generating duplicate of added ele without id and 
    handleUpdateNoteText(id,text){
        // //make shallow copy of item
        let components = [...this.state.componentArr]

        //set text on identical ids
        components.forEach(e=>{
                if(e.id === id){
                    e.text = text;
                }
            })

        //overwrite real array
        this.setState({componentArr: components});
    }

    //change color of the notes(background/text)
    handleBackColor(passedColor){
        //set as background color of textinput as lighter version of background color
        const lighterBackColor = passedColor == '#000000' ? '#404040'
                : new color(passedColor).lighten(0.1);
        const lighterBorderColor = passedColor == '#000000' ? 'white'
                : new color(passedColor).lighten(0.6);
        this.setState({backColor: passedColor,lighterBackColor: lighterBackColor,
            lighterBorderColor: lighterBorderColor});
    }

    handleTextColor(color){
        this.setState({textColor: color});
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
                                        backgroundColor: this.state.lighterBackColor,
                                        borderColor: this.state.lighterBorderColor,

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
                            <Text style={styles.textLabelStyle}>Notes</Text>
                            {/* Text input for notes content(first part anyways) */}
                            <Animated.View style={{height: this.state.textInputHeight}}>
                                <TextInput
                                    multiline
                                    ref={(el)=>{this.firstNoteInput = el;}}
                                    style={StyleSheet.flatten([styles.textInputStyle,{
                                        color: this.state.textColor,
                                        backgroundColor: this.state.lighterBackColor,
                                        borderColor: this.state.lighterBorderColor,
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

                            {this.state.componentArr.map(ele=>{
                                if(ele.type === 'checkbox'){
                                    return (
                                        <CheckBoxTextInput
                                            key= {ele.id}
                                            ele = {ele}
                                            afterAnimationComplete = {this.afterAnimationComplete}
                                            handleUpdateNoteText = {this.handleUpdateNoteText}
                                            removeComponent = {this.removeComponent}
                                            width={deviceWidth} 
                                            lighterBackColor={this.state.lighterBackColor}
                                            lighterBorderColor ={this.state.lighterBorderColor}
                                            textColor={this.state.textColor}
                                            editable = {true}
                                        />
                                    )
                                }
                                if(ele.type === 'pointer'){
                                    return (
                                        <PointerTextInput
                                            key= {ele.id}
                                            ele = {ele}
                                            afterAnimationComplete = {this.afterAnimationComplete}
                                            handleUpdateNoteText = {this.handleUpdateNoteText}
                                            removeComponent = {this.removeComponent}
                                            width={deviceWidth} 
                                            lighterBackColor={this.state.lighterBackColor}
                                            lighterBorderColor ={this.state.lighterBorderColor}
                                            textColor={this.state.textColor}
                                            editable={true}
                                        />
                                    )
                                }
                            })}


                        </ScrollView>
                    </KeyboardAvoidingView>

                    {/* bottom bar that allows for options for that note */}
                    <NoteBottomBar 
                        //sending props to child(prop drilling is bad lets not do it again)
                        handleBackColor={this.handleBackColor} 
                        handleTextColor={this.handleTextColor}
                        backColor={this.state.backColor}
                        textColor={this.state.textColor}
                        addComponent = {this.addComponent}
                        //disable button when in progress of adding component
                        disabled = {this.state.disabled}
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
        borderRadius: 5,
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom:5,
        //style of text inserted
        fontSize: 17,
        fontFamily: 'sans-serif',
        padding: 5
    },
    textLabelStyle:{
        fontSize: 20,
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