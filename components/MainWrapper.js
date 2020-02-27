import React,{Component} from 'react';
import { StyleSheet,Text,View,FlatList } from 'react-native';
import HeaderBar from './header-components/HeaderBar';
import Constants from 'expo-constants';


class MainWrapper extends React.Component{
    constructor(props){
        super(props);
        //create new prop and set state as false

        var a;
        var arr=[];
        for (a=0;a<100;a++){
            arr[a] = {
                id: a+'-32',
                title: a
            }
            
        }

        this.state = {
            onClickedHamburgerBtn: false,
            onClickedSearchBtn: false,
            noteTitles: arr
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
            <HeaderBar 
                onClickedHamburgerBtn = {this.state.onClickedHamburgerBtn}
                onClickedSearchBtn = {this.state.onClickedSearchBtn}
                handleHamburgerBtnOnClick = {this.handleHamburgerBtnOnClick}
                handleSearchBtnOnClick = {this.handleSearchBtnOnClick}
            />
            <FlatList 
                contentContainerStyle = {styles.scroll}
                data={this.state.noteTitles}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.viewInScroll}>
                        <Text style={styles.note}>{item.title}</Text>
                    </View>
                )}
                keyExtractor={item=> item.id}
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
    scroll:{
        alignItems: 'center',
        width: '100%'
    },    
    viewInScroll:{
        backgroundColor: '#FF3434',
        alignItems: 'center',
        padding: 10,
        margin: 15,
        height: 50,
        width: 150
    },
    note:{
    }
  });  

export default MainWrapper;