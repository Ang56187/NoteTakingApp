import React,{Component} from 'react';
import { StyleSheet,View,Animated} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderBar from './main-components/HeaderBar';
import ScrollViewNotes from './main-components/ScrollViewNotes';
import Constants from 'expo-constants';
import NoteList from '../objects/NotesList';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

//variables
var filteredNotes = [];
const Drawer = createDrawerNavigator();


export default class MainWrapper extends React.Component{
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
            noteTitles: new NoteList().noteList,
            //search input,
            search: '',
            //for animation purposes
            animateX: new Animated.Value(50),
            animateBottomPad: new Animated.Value(10)
        }

        //new prop
        //bind creates new func to perform same as  both method handleButtonOnClick
        this.handleHamburgerBtnOnClick = this.handleHamburgerBtnOnClick.bind(this);
        this.handleSearchBtnOnClick = this.handleSearchBtnOnClick.bind(this);
        this.handleOnEndScroll = this.handleOnEndScroll.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
            filteredNotes = new NoteList().noteList.filter(item=>{
                const lowerCaseItem = item.title.toLowerCase();
                const filter = search.toLowerCase();

                //check if search word exists as note title
                //if yes, added to filteredNotes
                return lowerCaseItem.includes(filter);
            });
        }
        else{
            filteredNotes = new NoteList().noteList;
        }
  
        this.setState({
            noteTitles: filteredNotes,
            onEndScroll: false,
            search
        });
    }

    //set method upon reaching end of scroll
    handleOnEndScroll(x){
        this.setState({
            onEndScroll: x
        });
    }

    //set method for animation
    expandButton = () =>{
        var ani1 = Animated.timing(this.state.animateBottomPad,{toValue: 0,duration: 300,});
        var ani2 = Animated.timing(this.state.animateX,{toValue: 1000,duration: 500,});
        return Animated.sequence([ani1,ani2]).start();
    }

    shrinkButton = () =>{
        var ani1 = Animated.timing(this.state.animateBottomPad,{toValue: 10,duration: 300,});
        var ani2 = Animated.timing(this.state.animateX,{toValue: 50,duration: 600,});
        return Animated.sequence([ani2,ani1]).start();
    }



    render(){
        if (this.state.onEndScroll){
            this.expandButton();
        }
        else{
            this.shrinkButton();
        }

        return(
            <View style={styles.container}>
                <NavigationContainer>
                    {/* <Drawer.Navigator initialRouteName="Home">
                        <Drawer.Screen name="Home" component={HomeScreen} />
                        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
                    </Drawer.Navigator> */}
                </NavigationContainer>

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
                    handleOnEndScroll = {this.handleOnEndScroll}    
                />
                {/* button to add new note */}
                <Animated.View 
                    style = {{
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
