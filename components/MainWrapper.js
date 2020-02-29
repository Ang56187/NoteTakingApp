import React,{Component} from 'react';
import { StyleSheet,Text,View,FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderBar from './main-components/HeaderBar';
import ScrollViewNotes from './main-components/ScrollViewNotes';
import Constants from 'expo-constants';
import NoteList from '../objects/NotesList';


export default class MainWrapper extends React.Component{
    constructor(props){
        super(props);

        var notes = new NoteList();

        //setting the states to be passed down to its children
        this.state = {
            onClickedHamburgerBtn: false,
            onClickedSearchBtn: false,
            noteTitles: notes.noteList
        }
        //new prop
        //bind creates new func to perform same as  both method handleButtonOnClick
        this.handleHamburgerBtnOnClick = this.handleHamburgerBtnOnClick.bind(this);
        this.handleSearchBtnOnClick = this.handleSearchBtnOnClick.bind(this);
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

    render(){
        return(
            <View style={styles.container}>
                {/* custom component header with hamburger bar and search button (from HeaderBar.js)*/}
                <HeaderBar 
                    onClickedHamburgerBtn = {this.state.onClickedHamburgerBtn}
                    onClickedSearchBtn = {this.state.onClickedSearchBtn}
                    handleHamburgerBtnOnClick = {this.handleHamburgerBtnOnClick}
                    handleSearchBtnOnClick = {this.handleSearchBtnOnClick}
                />
                {/* custom scroll view with 2 columns (from ScrollViewNotes.js) */}
                <ScrollViewNotes
                    noteTitles = {this.state.noteTitles}    
                />
                {/* button to add new note */}
                <Button
                    type = {"clear"}
                    containerStyle={styles.addButtonView}
                    icon=
                    {<Icon
                    name= {"md-add"} 
                    size = {35} 
                    style={{color: 'white'}}
                    />}
                /> 
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
    },
    addButtonView:{
        position: 'absolute',
        bottom: 20,
        zIndex: 1,
        alignSelf: 'center',
        width: 55,
        backgroundColor:'#00BCD4',
        borderRadius: 70,
        borderWidth: 1,
        borderColor: '#00BCD4'
    }
  });  
