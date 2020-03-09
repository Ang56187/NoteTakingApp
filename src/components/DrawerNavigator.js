import { createDrawerNavigator,  
          DrawerContentScrollView,
          DrawerItemList,
          DrawerItem, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React,{Component} from 'react';
import { StyleSheet,View,Text } from 'react-native';
import MainWrapper from '../scenes/MainWrapper';
import Animated from 'react-native-reanimated';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

function home({navigation}){
    return <MainWrapper/>
}


function customDrawerContent({progress,...rest}) {

  //animation for sliding out side drawer
  const translateX = Animated.interpolate(progress,{
    inputRange: [0, 1],
    outputRange: [-100, 10],
  });

  const scale = Animated.interpolate(progress,{
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const overallWidth = 230;
  const overallHeight = 500;


  return (
    <Animated.View 
      style={{ 
          transform: [{translateX},{scale}],
          backgroundColor: 'transparent' ,
          width: overallWidth, 
          height: overallHeight,
          padding: 0
          }}>
      <LinearGradient 
        colors={['#518FF9', '#F58080']}
        start = {[0,0.3]}
        width={overallWidth}
        height={overallHeight}
        style={styles.linearGradientStyle}>
        <DrawerContentScrollView 
          {...rest}
          contentContainerStyle = {styles.drawerScrollStyle}
        >
          <Text style={styles.headerTextStyle} >Library</Text>
          <DrawerItem
            label="Recent"
            icon = {() =>
                      <Icon 
                        name='md-funnel'
                        size= {30}
                        color='#ffffff'
                        style = {styles.iconStyle}
                      />
                    }
            activeBackgroundColor = "#597CE2"
            labelStyle = {styles.labelStyle}
            style = {styles.itemContainerStyle}
            focused = {true}
            onPress={() => {}}
          />
          <DrawerItem
            label="All"
            icon = {() =>
              <Icon 
                name='md-list'
                size= {30}
                color='#ffffff'
                style = {styles.iconStyle}
              />
            }
            activeBackgroundColor = "#597CE2"
            labelStyle = {styles.labelStyle}
            style = {styles.itemContainerStyle}
            focused = {false}
            onPress={() => {}}
          />
          <DrawerItem
            label="Favourites"
            icon = {() =>
              <Icon 
                name='md-star-outline'
                size= {30}
                color='#ffffff'
                style = {styles.iconStyle}
              />
            }
            activeBackgroundColor = "#597CE2"
            labelStyle = {styles.labelStyle}
            style = {styles.itemContainerStyle}
            focused = {false}
            onPress={() => {}}
          />
        </DrawerContentScrollView>
      </LinearGradient>
    </Animated.View>
  );
}

export default class DrawerNavigator extends React.Component{

    render(){
        return(
            <NavigationContainer>
            <Drawer.Navigator 
              initialRouteName="home"   
              drawerStyle={{
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                          }}
              drawerContent={props => customDrawerContent(props)}
            >
              <Drawer.Screen name="home" component={home} />
            </Drawer.Navigator>
          </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
  drawerScrollStyle: {
    alignItems: 'center'
  },
  linearGradientStyle:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    borderRadius: 20,
  },
  headerTextStyle: {
    fontSize: 35,
    color: '#ffffff',
    paddingBottom: 15
  },
  labelStyle:{color: 'white',fontSize: 18},
  itemContainerStyle:{borderRadius:20,width: 210},
  iconStyle:{marginLeft:10}
});  
