import React,{Component} from 'react';
import { Text,View } from 'react-native';
import { Button,SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

class HeaderBar extends React.Component{

    changeButton(ifClicked){
        var styleButton;
        if (ifClicked){
            styleButton = {
                backgroundColor : "#ffffff" 
            }
        }
        else{
            styleButton = {
            }
        }
        return styleButton;
    }

    changeIcon(ifClicked){
        var styleIcon;
        if (ifClicked){
            styleIcon = {
                color : "#FF9797"
            }
        }
        else{
            styleIcon = {
                color : "#ffffff"
            }
        }
        return styleIcon;
    }


    render(){
        //set variables for styles to change 
        var _styleHamburgerBtn = this.changeButton(this.props.onClickedHamburgerBtn);
        var _styleHamburgerIcon = this.changeIcon(this.props.onClickedHamburgerBtn);

        var _styleSearchBtn = this.changeButton(this.props.onClickedSearchBtn);
        var _styleSearchIcon = this.changeIcon(this.props.onClickedSearchBtn);

        var vak="dsa";
        return(
            <View style = {{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                width: '100%',
                flexDirection: 'row',
                backgroundColor: '#FF9797',
                opacity: 0.9,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Button 
                    type = "clear" 
                    onPress={() => this.props.handleHamburgerBtnOnClick()}
                    buttonStyle = {_styleHamburgerBtn}
                    icon = {
                    <Icon
                        name= {"md-menu"} 
                        size = {35} 
                        style = {_styleHamburgerIcon}
                    /> 
                }
                />
                <SearchBar
                    placeholder="Type Here..."
                    platform = "android"
                    searchIcon = {false}
                    cancelIcon = {false}
                    containerStyle ={{
                        width: 260,
                        height: 40,
                        justifyContent: 'center'
                    }}
                    value = {"asa"}
                    onChangeText = {console.log("e") }                
                    />
                <Button 
                    type = "clear" 
                    onPress={() => this.props.handleSearchBtnOnClick()}
                    buttonStyle = {_styleSearchBtn}
                    icon = {
                    <Icon
                        name= {"md-search"} 
                        size = {35} 
                        style = {_styleSearchIcon}
                    /> 
                }
                />
            </View>
        );            
    }
}


export default HeaderBar;
