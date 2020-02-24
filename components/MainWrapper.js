import React,{Component} from 'react';
import { StyleSheet,Text,View } from 'react-native';
import HeaderBar from './header-components/HeaderBar'
import StatusBarBackground from './StatusBarBackground'

class MainWrapper extends React.Component{
    constructor(props){
        super(props);
        //create new prop and set state as false
        this.state = {
            onClicked: false
        }
        //new prop
        //bind creates new func to perform same as method handleButtonOnClick
        this.handleButtonOnClick = this.handleButtonOnClick.bind(this);
    }

    //set method for button click
    handleButtonOnClick(){
        this.setState({
            onClicked : ! this.state.onClicked
        }) 
    }

    render(){
        //set variables for styles to change 

        
        return(
            <View style={styles.container}>
            <StatusBarBackground style={{backgroundColor:'midnightblue'}}/>
            <HeaderBar 
                onClicked = {this.state.onClicked}
                handleButtonOnClick = {this.handleButtonOnClick}
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