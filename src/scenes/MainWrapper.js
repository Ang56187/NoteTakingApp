import React,{Component,useState} from 'react';
import { StyleSheet,View,Text,StatusBar,Animated } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderBar from '../components/main-wrapper/HeaderBar';
import ScrollViewNotes from '../components/main-wrapper/ScrollViewNotes';
import Constants from 'expo-constants';
import NoteList from '../objects/NotesList';
import Note from '../objects/Note';
import { createDrawerNavigator,useIsDrawerOpen } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
// import Animated, { Easing } from 'react-native-reanimated';

//variables
var filteredNotes = [];

//wrapped around class component so it can actually receive hooks
//(due to only restricted to functions)
const MainWrapperHook = (props) => {  

    return <MainWrapper
        navigation={props.navigation}/>
}

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
            noteTitles: new NoteList().noteList,
            //search input,
            search: '',
            //for animation purposes
            animateX: new Animated.Value(50),
            animateBottomPad: new Animated.Value(10),

            //for interporation purposes (animate the add button)
            scrollSize : 0,
            scaleX: new Animated.Value(20)
        }
        //new prop
        //bind creates new func to perform same as  both method handleButtonOnClick
        this.handleHamburgerBtnOnClick = this.handleHamburgerBtnOnClick.bind(this);
        this.handleSearchBtnOnClick = this.handleSearchBtnOnClick.bind(this);
        this.handleOnEndScroll = this.handleOnEndScroll.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleScrollSize = this.handleScrollSize.bind(this);
        this.handleScrollIndex = this.handleScrollIndex.bind(this);

        //handle drawer toggle, changes state of hamburger btn
        const openDrawer = this.props.navigation.addListener('drawerOpen',e=>{
            this.setState({onClickedHamburgerBtn: true});
        });
        const closeDrawer = this.props.navigation.addListener('drawerClose',e=>{
            this.setState({onClickedHamburgerBtn: false});
        });
    
    }

    //retrieve scroll values from scroll component (ScrollViewNotes)
    handleScrollSize(x){
        this.setState({scrollSize:x})
    }

    handleScrollIndex(x){
        this.setState({scrollIndex: x})
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
            search
        });
    }

    //set method upon reaching end of scroll
    handleOnEndScroll(x){
        this.setState({
            onEndScroll: x
        });
    }

    //for normal Animated
    expandButton = () =>{
        var ani1 = Animated.timing(this.state.animateBottomPad,
            {duration: 399,toValue: 0});
        var ani2 = Animated.timing(this.state.animateX,
            {toValue: 800,duration: 500});
        return Animated.sequence([ani1,ani2]);
    }

    shrinkButton = () =>{
        var ani1 = Animated.timing(this.state.animateBottomPad,
            {duration: 300,toValue: 10});
        var ani2 = Animated.timing(this.state.animateX,
            {toValue: 50,duration: 600});
        return Animated.sequence([ani2,ani1]);
    }

    //where actual components were rendered
    render(){
        //scrollIndex(0 is bottom, {whatever} is the top, depends on scroll size)
        //close to bottom
        if (this.state.scrollIndex <= 10 && !this.state.onClickedSearchBtn){
            this.shrinkButton().stop();
            this.expandButton().start();
        }
        //not close to bottom
        if (this.state.scrollIndex > 12 || this.state.onClickedSearchBtn){
            this.expandButton().stop();
            this.shrinkButton().start();
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
                    handleOnEndScroll = {this.handleOnEndScroll} 
                    handleScrollSize = {this.handleScrollSize}   
                    handleScrollIndex = {this.handleScrollIndex}
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
