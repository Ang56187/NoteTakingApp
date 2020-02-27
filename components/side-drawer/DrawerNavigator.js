import React, {Component} from 'react';
import { createAppContainer} from '@react-navigation/native';
import { createDrawerContainer} from '@react-navigation/drawer';
import MainWrapper from '../MainWrapper';

const drawerNavigator = createDrawerNavigator({
    MainWrapper: {MainWrapper}
},
{
    initialRouteName: 'Home',
    drawerWidth: 300,
    drawerPosition: 'left',
}
);

const AppContainer = createAppContainer(drawerNavigator);

export default class DrawerNavigator extends React.Component{
    render(){
        return <AppContainer/>;
    }
}