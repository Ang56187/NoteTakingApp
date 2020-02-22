import React,{Component} from 'react';
import { Text,View } from 'react-native';
import HamburgerBtn from './HamburgerBtn';


const headerBar = () => {
    return(
        <View style = {{
            height: 50,
            flexDirection: 'row',
            backgroundColor: '#FF9797',
            opacity: 0.8,
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'space-',
        }}>
            <HamburgerBtn/>
            <Text style = {{color: "red"}}>dfg u!!</Text>
        </View>
    )
}

export default headerBar;
