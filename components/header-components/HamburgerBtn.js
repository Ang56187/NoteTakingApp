import React from 'react';
import { Button } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

const HamburgerBtn =() =>  {
    return (
        <Button icon = {
            <Icon
                name= {"md-menu"} 
                size = {40} 
                color = {"#ffffff"} 
                onPress={() => console.log('hello')}
            /> 
        }
        title = "Go commit die"
        />
        );
  }

  export default HamburgerBtn;