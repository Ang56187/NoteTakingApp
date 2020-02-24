import React,{Component} from 'react';
import { StyleSheet,Text,View } from 'react-native';
import HeaderBar from './header-components/HeaderBar'
import StatusBarBackground from './StatusBarBackground'

class MainWrapper extends React.Component{
    constructor(props){
        super(props);
        //create new prop and set state as false
        this.state = {
            onClickedHamburgerBtn: false,
            onClickedSearchBtn: false
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
            <StatusBarBackground style={{backgroundColor:'midnightblue'}}/>
            <HeaderBar 
                onClickedHamburgerBtn = {this.state.onClickedHamburgerBtn}
                onClickedSearchBtn = {this.state.onClickedSearchBtn}
                handleHamburgerBtnOnClick = {this.handleHamburgerBtnOnClick}
                handleSearchBtnOnClick = {this.handleSearchBtnOnClick}
            />
            <Text>Why are you running!</Text>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  });  

export default MainWrapper;