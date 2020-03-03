import React,{Component} from 'react';
import { Text,View,Animated } from 'react-native';
import { Button,SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

class HeaderBar extends React.Component{

    state = {
        animateWidth: new Animated.Value(0),
        animateOpacity: new Animated.Value(0),
    };

    //method to change styles of button and icon
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

    //method to animate  search bar
    animateSearch = (x) =>{
        if(x){
            var ani1 = Animated.timing(this.state.animateWidth,{toValue: 240,duration: 500,});
            var ani2 = Animated.timing(this.state.animateOpacity,{toValue: 1,duration: 400,});
            return Animated.parallel([ani1,ani2]).start();
        }
        else{
            var ani1 = Animated.timing(this.state.animateWidth,{toValue: 0,duration: 500,});
            var ani2 = Animated.timing(this.state.animateOpacity,{toValue: 0,duration: 400,});
            return Animated.parallel([ani1,ani2]).start();
        }

    }

    render(){
        //set variables for styles to change 
        var _styleHamburgerBtn = this.changeButton(this.props.onClickedHamburgerBtn);
        var _styleHamburgerIcon = this.changeIcon(this.props.onClickedHamburgerBtn);

        var _styleSearchBtn = this.changeButton(this.props.onClickedSearchBtn);
        var _styleSearchIcon = this.changeIcon(this.props.onClickedSearchBtn);


        this.animateSearch(this.props.onClickedSearchBtn);

        if(!this.props.onClickedSearchBtn){
            
        }

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
                {/* Menu button at left */}
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
                {/* Hidden search bar unless pressed search button */}
                <Animated.View 
                    style=
                    {{width: this.state.animateWidth,
                    opacity: this.state.animateOpacity
                    }}>
                    <SearchBar
                        placeholder="Search notes.."
                        platform = "android"
                        searchIcon = {false}
                        cancelIcon = {false}
                        ref={search => this.search = search}
                        value = {this.props.search}
                        onChangeText = {this.props.handleSearch}     
                        containerStyle = {{height: 40, justifyContent: 'center'}}           
                    />
                </Animated.View>

                <Button 
                    type = "clear" 
                    onPress={() => {                        
                        this.props.handleSearchBtnOnClick(); 
                        this.search.cancel();       
                        this.search.clear();       
                    }}
                    ref={searchBtn => this.searchBtn = searchBtn}
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
