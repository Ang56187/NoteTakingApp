import React,{Component} from 'react';
import { Text,View,Animated,StyleSheet } from 'react-native';
import { Button,SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

class HeaderBar extends React.Component{

    state = {
        //for search bar
        animateWidth: new Animated.Value(0),

        //for button
        animateViewX: new Animated.Value(0),
        animateSearchOpacity: new Animated.Value(1)
    };

    //method to change styles of button and icon
    changeButton(ifClicked){
        var styleButton;
        if (ifClicked){
            styleButton = {
                backgroundColor : "#ffffff",
                borderRadius: 0 
            }
        }
        else{
            styleButton = {
                borderRadius: 0 
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
            const ani1 = Animated.timing(this.state.animateWidth,{toValue: 250,duration: 500,});
            return ani1.start();
        }
        else{
            const ani1 = Animated.timing(this.state.animateWidth,{toValue: 0,duration: 500,});
            return ani1.start();
        }
    }

    animateView = (x) =>{
        if(x){
            const ani1 = Animated.timing(this.state.animateViewX,{toValue: -52,duration: 500,});
            const ani2 = Animated.timing(this.state.animateSearchOpacity,{toValue: 0,duration: 800,});
            return Animated.parallel([ani2,ani1]).start();
        }
        else{
            const ani1 = Animated.timing(this.state.animateViewX,{toValue: 0,duration: 500,});
            const ani2 = Animated.timing(this.state.animateSearchOpacity,{toValue: 1,duration: 800,});    
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
        this.animateView(this.props.onClickedSearchBtn);

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
                maxHeight: 50
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
                    }}>
                    <SearchBar
                        placeholder="Search notes.."
                        platform = "android"
                        searchIcon = {false}
                        cancelIcon = {false}
                        ref={search => this.search = search}
                        value = {this.props.search}
                        onChangeText = {this.props.handleSearch}     
                        containerStyle = {{height: 40, justifyContent: 'center',borderRadius: 20}}           
                    />
                </Animated.View>

                {/* Search button at right */}
                {/* Once clicked, close button will be shown instead(if true) */}
                <View style={{alignSelf:'flex-end',flexDirection:'column',zIndex:0}}>
                    {/* Close button (move down once onClickSearchBtn is true)*/}
                    <Animated.View
                        style={{
                            bottom: this.state.animateViewX,
                        }}
                    >
                    <Button 
                            type = "clear" 
                            onPress={() => {   
                                this.props.handleSearchBtnOnClick();                        
                                this.search.cancel();       
                                this.search.clear();           
                            }}
                            ref={searchBtn => this.searchBtn = searchBtn}
                            icon = {
                            <Icon
                                name= {"md-close-circle-outline"} 
                                size = {35} 
                                style = {{color: '#ffffff'}}
                            /> 
                        }
                        /> 
                    </Animated.View>
 
                    {/* Search button (increase opacity once onClickSearchBtn is false)*/}
                    <Animated.View
                        style={{
                            opacity: this.state.animateSearchOpacity,
                        }}
                    >
                    <Button 
                            type = "clear" 
                            onPress={() => {   
                                this.props.handleSearchBtnOnClick();                        
                                this.search.cancel();       
                                this.search.clear();           
                            }}
                            ref={searchBtn => this.searchBtn = searchBtn}
                            icon = {
                            <Icon
                                name= {"md-search"} 
                                size = {35} 
                                style = {{color: '#ffffff'}}
                            /> 
                        }
                        /> 
                    </Animated.View>
                </View>
                
            </View>
        );            
    }
}

const styles = StyleSheet.create({
    iconStyle:{
        color : "#ffffff"
    },
});


export default HeaderBar;
