import React,{Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet,View,TextInput,Dimensions,ScrollView,Text,
    KeyboardAvoidingView, Animated , UIManager, LayoutAnimation} from 'react-native';
import color from 'color';
import NoteHeaderBar from '../components/note-creation/NoteHeaderBar';
import NoteBottomBar from '../components/note-creation/NoteBottomBar';
import CheckBoxTextInput from '../components/note-component/CheckBoxTextInput'
import PointerTextInput from '../components/note-component/PointerTextInput'
import Note from '../objects/Note'
import  * as SQLite from 'expo-sqlite';
import { CommonActions, ThemeProvider } from '@react-navigation/native';


const backgroundColor = '#21B2F2';
const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);

const db = SQLite.openDatabase("db.db");

export default class NoteCreationPage extends React.Component{
    constructor(props){
        super(props);
        const {note} = this.props.route.params;
        this.state = {
            titleTextInput: (note!==null ?note.title:''),
            titleTextInputHeight: new Animated.Value(50),
            showTitleError: false,
            showTitleEmpty: false,
            textInput: (note!==null ?note.firstNote:''),
            textInputHeight: new Animated.Value(50),

            //for color background setting
            backColor: (note!==null ? note.backColor : "#21B2F2"),
            lighterBackColor : (note!==null ? new color(note.backColor).lighten(0.1) : new color("#21B2F2").lighten(0.1)),
            lighterBorderColor: (note!==null ? new color(note.backColor).lighten(0.6) : new color("#21B2F2").lighten(0.6)),
            //for text color setting
            textColor: (note!==null ? note.textColor : "#ffffff"),

            //for on focus animation
            animateTitleBorderWidth: new Animated.Value(0),
            animateBorderWidth: new Animated.Value(0),


            //for storing checkboxes/options/notifications/normal text..
            componentArr: (note!==null ? note.content : []),
            disabled: false,

            test: null
        }

        this.note = this.props.route.params.note;
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
        this.handleSaveNote = this.handleSaveNote.bind(this);

        const switchToThisScreen = this.props.navigation.addListener('focus',()=>{
            if( this.props.route.params.prevPage === "goToNoteCreation"){
                this.props.setAnimationType(this.props.route.params.prevPage);
            }
            else{
            }

        })

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
            const newValue = {id: this.index,type: eleType,text: '',isChecked: false}

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

    //animate on focus onto textinput
    handleExpandBorderWidth(expandWidth){
        const ani1 = Animated.timing(expandWidth,{duration: 300, toValue: 2});
        const ani2 = Animated.timing(expandWidth,{duration: 300, toValue: 1});
        return Animated.sequence([ani1,ani2]).start();
    }

    //animate on focus onto textinput
    handleShrinkBorderWidth(shrinkWidth){
        Animated.timing(shrinkWidth,{duration: 300, toValue: 0}).start();
    }

    //here is the section where contain function whose job is to ensure note were saved correctly
    addZero(x,isDate){
        if(isDate == null){
            isDate = true;
        }
        if(x>9999){
            x=x-9999
        }
        if(x<10 && isDate){
            x="0"+x;
        }
        else if(x<10 && !isDate){
            x= "000"+x
        } 
        else if(x<100 && !isDate){
             x= "00"+x
        }
        else if(x<1000 && !isDate){
            x= "0"+x
       }
        return x;
    }

    

    handleSaveNote(){
        if(this.state.titleTextInput == ""){
            this.setState({showTitleEmpty : true});
        }
        else if(this.note!== null){
            // console.log(this.state.titleTextInput)
            // console.log(this.state.textInput)
            //TODO
            //later when implement favourite feature be sure to alter this code
            db.transaction(tx=>{
                //1. update note first
                tx.executeSql('update notes set title = ?, '+
                'firstNote = ? , isFavourited = ? , backColor = ?, textColor = ?'+
                'where id = ? ',               
                [this.state.titleTextInput,this.state.textInput,0,this.state.backColor,this.state.textColor,this.note.id],
                //success
                (_,ResultSet)=>{console.log(ResultSet.rows);},
                //fail
                (_,error)=>{console.log(error)}
                )
                //TODO
                //changes need to be made here for optimization
                //once found out how to alter content one by one without deleting everything
                //2. delete every contents
                tx.executeSql('delete from noteContent where noteID = ?',[this.note.id],
                //success
                (_,ResultSet)=>{console.log(ResultSet)},
                //fail
                (_,error)=>{console.log(error)}
                ),
                //3. changes for contents in that note
                tx.executeSql('select id from notes where id = ?',[this.note.id],
                (_,{rows:{_array}})=>{
                    _array.forEach(e=>{
                        //execute once found out added id, added the checkboxes,pointers etc from dupeArr
                        this.state.componentArr.forEach(ele=>{
                            tx.executeSql('insert into noteContent (noteType,content,isChecked,noteID)'+
                            'values(?,?,?,?)',
                            [ele.type,ele.text,(ele.isChecked ? 1 : 0),e.id],
                            (_,{rows})=>{console.log(rows)},
                            (_,error)=>{console.log(error)})            
                        });
                    })
                },
                //fail
                (_,error)=>{console.log(error)})
            })
            //end db transaction
            this.props.setAnimationType("goToNote");
            setTimeout(()=>{this.props.navigation.navigate('home')},100);
        }
        else{   
            //heres the constructor of note
            //(id,title,content,dateTime,isFavourited,backColor,textColor)
            let index=0;
            const dupeArr = [...this.state.componentArr]
            //first, reorganize components so its id will be set according to array index element
            dupeArr.forEach(ele=>{
                ele.id=index;
                index++;
            })

            var today = new Date();
            var date = today.getFullYear()+'-'+this.addZero(today.getMonth())+'-'+this.addZero(today.getDate());
            var time = this.addZero(today.getHours()) + ":" + this.addZero(today.getMinutes()) + ":" + this.addZero(today.getSeconds());
            var dateTime = date+' '+time;

            //organize noteNum to (note list size,today date, minute, second)
            var noteNum = this.addZero(Math.floor((Math.random() * 9999) + 1),false).toString()+
                            this.addZero(today.getHours())+
                            this.addZero(today.getMinutes())+
                            this.addZero(today.getSeconds());
            // noteNum = '0014083920';
    
            //open database
            db.transaction(tx=>{
                tx.executeSql('insert into notes(noteNum,title,firstNote,dateTime,isFavourited,backColor,textColor)'+
                'values(?,?,?,?,?,?,?)',
                [noteNum,this.state.titleTextInput,this.state.textInput,dateTime,0,this.state.backColor,this.state.textColor],
                //success
                (_,ResultSet)=>{console.log(ResultSet)},(_,error)=>{console.log(error)}),
                tx.executeSql('select id from notes where noteNum = ?',[noteNum],
                (_,{rows:{_array}})=>{
                    _array.forEach(e=>{
                        //execute once found out added id, added the checkboxes,pointers etc from dupeArr
                        dupeArr.forEach(ele=>{
                            tx.executeSql('insert into noteContent (noteType,content,isChecked,noteID)'+
                            'values(?,?,?,?)',
                            [ele.type,ele.text,(ele.isChecked ? 1 : 0),e.id],
                            (_,{rows})=>{console.log(rows)},
                            (_,error)=>{console.log(error)})            
                        });
                    })
                },
                //fail
                (_,error)=>{console.log(error)})
            })
            //end db transaction
            this.props.navigation.navigate('home')
        }
    }

    render(){

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
                    <NoteHeaderBar 
                        handleSaveNote={this.handleSaveNote}
                        navigation={this.props.navigation}
                        route={this.props.route}
                    />
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
                            <Animated.View style={[styles.textInputViewStyle,{ 
                                height: this.state.titleTextInputHeight,
                                backgroundColor: this.state.lighterBackColor,
                                borderColor: this.state.lighterBorderColor,
                                borderBottomWidth: this.state.animateTitleBorderWidth,
                            }]}>

                                <TextInput
                                    multiline
                                    maxLength = {100}
                                    // no choice to disable autocorrect, since it keep creating bugs on word count limit
                                    autoCorrect= {false}
                                    style={StyleSheet.flatten([styles.textInputStyle,{
                                        color: this.state.textColor,
                                    }])}
                                    onFocus={()=>{
                                        this.handleExpandBorderWidth(this.state.animateTitleBorderWidth)
                                    }}
                                    onBlur={()=>{
                                        this.handleShrinkBorderWidth(this.state.animateTitleBorderWidth)
                                    }}
                                    onChangeText={text=> {
                                        this.setState({ titleTextInput: text });
                                        if(this.state.titleTextInput.length <= 100){
                                            this.setState({showTitleError:false})
                                        }
                                        if(this.state.titleTextInput.length>=0 && this.state.showTitleEmpty == true){
                                            this.setState({showTitleEmpty: false})
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
                            </Text> 
                            : null}

                            {this.state.showTitleEmpty ? 
                            <Text style={styles.errorTextStyle}>
                                Title must be filled in.*
                            </Text> 
                            : null}
                            
                            {/* label to show text "Notes list" */}
                            <Text style={styles.textLabelStyle}>Notes</Text>
                            {/* Text input for notes content(first part anyways) */}
                            <Animated.View style={[styles.textInputViewStyle,{
                                height: this.state.textInputHeight,
                                borderBottomWidth: this.state.animateBorderWidth,
                                borderColor: this.state.lighterBorderColor,
                                backgroundColor: this.state.lighterBackColor,
                                }]}>

                                <TextInput
                                    multiline
                                    ref={(el)=>{this.firstNoteInput = el;}}
                                    style={[styles.textInputStyle,{                                
                                        color: this.state.textColor,
                                    }]}
                                    onFocus={()=>{
                                        this.handleExpandBorderWidth(this.state.animateBorderWidth)
                                    }}
                                    onBlur={()=>{
                                        this.handleShrinkBorderWidth(this.state.animateBorderWidth)
                                    }}
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

                            {/* get pointers/checkboxes .etc added to note and load em out */}
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
            </Animated.View>
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
    textInputViewStyle:{
        width: (deviceWidth-20),
        borderRadius: 5,
        marginTop: 5,
        marginBottom:5,
        padding: 5
    },
    textInputStyle:{
        //style of text inserted
        fontSize: 17,
        fontFamily: 'sans-serif',
    },
    textLabelStyle:{
        fontSize: 22,
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