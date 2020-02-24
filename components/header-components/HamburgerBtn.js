import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

class HamburgerBtn extends React.Component{

    render(){
        //overall 
        return (
            <Button
                type = "clear" 
                // onPress={() => this.handleButtonOnClick()}
                // buttonStyle = {_styleButton}
                icon = {
                <Icon
                    name= {"md-menu"} 
                    size = {35} 
                    //style = {_styleIcon}
                /> 
            }
            />
        );
    }

}

  export default HamburgerBtn;