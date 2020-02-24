import React,{Component} from 'react';
import { Text,View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

class HeaderBar extends React.Component{

    render(){
        //set variables for styles to change 
        var _styleButton;
        var _styleIcon;
        if (this.props.onClicked){
            _styleButton = {
                backgroundColor : "#ffffff" 
            }
            _styleIcon = {
                color : "#FF9797"
            }
        }
        else{
            _styleButton = {
            }
            _styleIcon = {
                color : "#ffffff"
            }
        }

        return(
            <View style = {{
                height: 50,
                flexDirection: 'row',
                backgroundColor: '#FF9797',
                opacity: 0.8,
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Button
                    type = "clear" 
                    onPress={() => this.props.handleButtonOnClick()}
                    buttonStyle = {_styleButton}
                    icon = {
                    <Icon
                        name= {"md-menu"} 
                        size = {35} 
                        style = {_styleIcon}
                    /> 
                }
                />
                <Text style = {{color: "red"}}>dfg u!!</Text>
            </View>
        );            
    }
}


export default HeaderBar;
