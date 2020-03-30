import React,{Component,useState} from 'react';
import { StyleSheet,View,Text,StatusBar,Animated, TouchableNativeFeedbackBase } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderBar from '../components/main-wrapper/HeaderBar';
import ScrollViewNotes from '../components/main-wrapper/ScrollViewNotes';
import Constants from 'expo-constants';
import NoteList from '../objects/NotesList';
import Note from '../objects/Note';
import { createDrawerNavigator,useIsDrawerOpen } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import  * as SQLite from 'expo-sqlite';


//variables
var filteredNotes = [];

//wrapped around class component so it can actually receive hooks
//also onyl way to update noteTitles
//(due to only restricted to functions)

const MainWrapperHook = (props) => {  
    return <MainWrapper
        navigation={props.navigation} route={props.route}/>
}

const db = SQLite.openDatabase('db.db');

export default MainWrapperHook;

class MainWrapper extends React.Component{
    constructor(props){
        super(props);

        //setting the states to be passed down to its children
        this.state = {
            //states that button will set
            onClickedHamburgerBtn: false,
            onClickedSearchBtn: false,
            //state that triggers upon reaching end of scroll
            onEndScroll: false,
            //state that accumulate all notes to be sent to scroll view
            //search input,
            search: '',
            noteTitles: [],
            //for animation purposes
            animateX: new Animated.Value(50),
            animateBottomPad: new Animated.Value(10),

            //for interporation purposes (animate the add button)
            scrollIndex : 0,
            scaleX: new Animated.Value(20)
        }
        //new prop
        //bind creates new func to perform same as  both method handleButtonOnClick
        this.handleHamburgerBtnOnClick = this.handleHamburgerBtnOnClick.bind(this);
        this.handleSearchBtnOnClick = this.handleSearchBtnOnClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.expandButton = this.expandButton.bind(this);
        this.shrinkButton = this.shrinkButton.bind(this);

        //handle drawer toggle, changes state of hamburger btn
        const openDrawer = this.props.navigation.addListener('drawerOpen',e=>{
            this.setState({onClickedHamburgerBtn: true});
        });
        const closeDrawer = this.props.navigation.addListener('drawerClose',e=>{
            this.setState({onClickedHamburgerBtn: false});
        });  

        const switchToThisScreen = this.props.navigation.addListener('focus',()=>{
            // console.log("it works")
            //console log printed, means it worked,
            //now to make it update note list
            db.transaction(tx=>{
                tx.executeSql('select * from notes',[],
                (_,{rows:{_array}})=>{
                    var index = 1;
                    var dupeArr = [];
                    _array.forEach(e=>{
                        const year = e.dateTime.substring(0,4)
                        const month= e.dateTime.substring(5,7)
                        const day = e.dateTime.substring(8,10)
    
                        const hour = e.dateTime.substring(11,13)
                        const minute = e.dateTime.substring(14,16)
                        const second = e.dateTime.substring(17,19)
                        const date = (new Date(year,month,day,hour,minute,second).toLocaleString())
                        dupeArr.push(new Note(
                        index,e.title,"add later",date,false,
                        e.backColor,e.textColor));
                        index++;
                    })
                    this.setState({noteTitles: dupeArr});
                },
                (_,error)=>{console.log(error)})
            })
            console.log(this.state.noteTitles[27])
        })

    }

    //check if component should update
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextState.noteTitles.length !== this.state.noteTitles.length) {
    //         return true;
    //     }
    //     return false;
    // }

    componentDidMount(){
        db.transaction(tx=>{
            tx.executeSql('select * from notes',[],
            (_,{rows:{_array}})=>{
                var index = 1;
                var dupeArr = [];
                _array.forEach(e=>{
                    const year = e.dateTime.substring(0,4)
                    const month= e.dateTime.substring(5,7)
                    const day = e.dateTime.substring(8,10)

                    const hour = e.dateTime.substring(11,13)
                    const minute = e.dateTime.substring(14,16)
                    const second = e.dateTime.substring(17,19)
                    const date = (new Date(year,month,day,hour,minute,second).toLocaleString())
                    dupeArr.push(new Note(
                    index,e.title,"add later",date,false,
                    e.backColor,e.textColor));
                    index++;
                })
                this.setState({noteTitles: dupeArr});
            },
            (_,error)=>{console.log(error)})
        })
    }


    //set method for buttons click
    handleHamburgerBtnOnClick(){
        this.setState({
            onClickedHamburgerBtn : ! this.state.onClickedHamburgerBtn
        })
    }

    handleSearchBtnOnClick(){
        this.setState({
            onClickedSearchBtn : ! this.state.onClickedSearchBtn
        }) 
    }
    
    //set method for filling in search input words
    handleSearch= search =>{ 
        //filter if something typed in search bar
        if(search !== ""){
            //assign filtered
            filteredNotes = this.state.noteTitles.filter(item=>{
                const lowerCaseItem = item.title.toLowerCase();
                const filter = search.toLowerCase();

                //check if search word exists as note title
                //if yes, added to filteredNotes
                return lowerCaseItem.includes(filter);
            });
        }
        else{
            filteredNotes = this.state.noteTitles;
        }
  
        this.setState({
            noteTitles: filteredNotes,
            search
        });
    }

    //for normal Animated
    expandButton = () =>{
        var ani1 = Animated.timing(this.state.animateBottomPad,
            {duration: 300,toValue: 0});
        var ani2 = Animated.timing(this.state.animateX,
            {toValue: 800,duration: 400});
        return Animated.sequence([ani1,ani2]);
    }

    shrinkButton = () =>{
        var ani1 = Animated.timing(this.state.animateBottomPad,
            {duration: 250,toValue: 10});
        var ani2 = Animated.timing(this.state.animateX,
            {toValue: 50,duration: 400});
        return Animated.sequence([ani2,ani1]);
    }

    //where actual components were rendered
    render(){

        const {noteTitles} = this.state;
        //if empty,refresh

        if (noteTitles === null || noteTitles.length === 0) {
            return null;
          }

        // open drawer when click btn
        if(this.state.onClickedHamburgerBtn){
            this.props.navigation.openDrawer();
        }
        
        return(
            <View style={styles.container}>
                <StatusBar/>
                {/* custom component header with hamburger bar and search button (from HeaderBar.js)*/}
                <HeaderBar 
                    onClickedHamburgerBtn = {this.state.onClickedHamburgerBtn}
                    onClickedSearchBtn = {this.state.onClickedSearchBtn}
                    handleHamburgerBtnOnClick = {this.handleHamburgerBtnOnClick}
                    handleSearchBtnOnClick = {this.handleSearchBtnOnClick}
                    search = {this.state.search}
                    handleSearch = {this.handleSearch}
                />
                {/* custom scroll view with 2 columns (from ScrollViewNotes.js) */}
                <ScrollViewNotes
                    noteTitles = {this.state.noteTitles}
                    expandButton = {this.expandButton}
                    shrinkButton = {this.shrinkButton}
                    onClickedSearchBtn ={this.state.onClickedSearchBtn}
                />
                {/* button to add new note */}
                <Animated.View 
                    style = 
                     {{ 
                        position: 'absolute',
                        bottom: this.state.animateBottomPad,
                        zIndex: 1,
                        alignSelf: 'center',
                        width: this.state.animateX,
                        backgroundColor:'#00BCD4',
                        borderRadius: 70,
                        borderWidth: 1,
                        borderColor: '#00BCD4',
                        elevation: 5
                }}>
                    <Button
                        type = {"clear"}
                        icon=
                        {<Icon
                        name= {"md-add"} 
                        size = {35} 
                        style={{color: 'white'}}
                        />}
                        onPress = {()=>{
                            this.props.navigation.navigate('noteCreation')
                        }
                        }
                    /> 
                </Animated.View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      alignItems: 'stretch'
    }
  });  
