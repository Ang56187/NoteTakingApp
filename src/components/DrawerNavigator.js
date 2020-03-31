import { createDrawerNavigator,  
          DrawerContentScrollView,
          DrawerItem, } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions,useRoute } from '@react-navigation/native';
import React,{Component} from 'react';
import { StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import MainWrapperHook from '../scenes/MainWrapper';
import NoteCreationPage from '../scenes/NoteCreationPage';
import Animated from 'react-native-reanimated';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import  * as SQLite from 'expo-sqlite';
import Note from '../objects/Note';
import { normalize } from 'react-native-elements';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


//create custom side drawer (including animation and contents in it)
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
          {/* Text on top of drawer, the first item on top */}
          <Text style={styles.headerTextStyle} >Library</Text>
          {/* Drawer items that filters or sort notes to be shown */}
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
          {/* Set line seperation between settings btn and drawer items */}
          <View
            style = {styles.lineStyle} 
          />
          {/* Own seperate button to settings page */}
          <TouchableOpacity 
              style = {{
              marginTop: 15,
              borderWidth: 1,
              borderColor: 'white',
              alignItems : 'center',
              borderRadius: 20,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              borderRadius: 20,
              width: 200,
              height: 50,
              margin: 10
            }}
          >
            <Icon 
              name='md-settings'
              size= {30}
              color='#ffffff'
              style = {styles.iconStyle}
            />
            <Text style={{
                  color: 'white',
                  fontSize: 20,
                  marginLeft:30,
                  fontFamily: 'sans-serif-light'
            }}>Settings</Text>
          </TouchableOpacity>
        </DrawerContentScrollView>
      </LinearGradient>
    </Animated.View>
  );
}


export default class DrawerNavigator extends React.Component{
    constructor(props){
      super(props);
      this.state={
        notePositionX: 0,
        notePositionY: 0
      }
    }

    //method to add main page component
    home = ({navigation,route}) => {
      return <MainWrapperHook 
                navigation = {navigation} route={route}
            />
    }

    noteCreation=({navigation,route})=>{
      return <NoteCreationPage navigation={navigation} route={route}/>
    }


    mainPage=({navigation})=>{
      return(
        <Drawer.Navigator 
          drawerStyle={{
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                      }}
          drawerContent={props => customDrawerContent(props)}
        //temporary disable swipe first
        //later find solution to disable gesture on note creation page
        //TODO
        >
          <Drawer.Screen name="home" component={this.home}/>
          {/* <Drawer.Screen name="noteCreation" component={this.noteCreation} /> */}
        </Drawer.Navigator>
      )
    }

    getRoute= ({route})=>{
      return route;
    }

    render(){ 
      const { route } = this.props;
      const goToNoteCreationAni = ({ current,layouts }) => {
        const translateY = current.progress.interpolate({
          inputRange: [0,1],
          outputRange: [800,0],
        });

        const animateRadius = current.progress.interpolate({
          inputRange: [0,1],
          outputRange: [300,0],
        });

        return {
          cardStyle: {
            transform: [{scale: current.progress},{translateY}],
            opacity: current.progress,
            borderRadius: animateRadius,
            overflow: 'hidden'
        },
        }
        
      };

      return(
        // mode='modal'
        <NavigationContainer>
          <Stack.Navigator 
            headerMode="none" 
            initialRouteName='home'
          >
            <Stack.Screen 
              name="home" 
              component={this.mainPage}
              initialRouteName={{ transition: '' }}
            />
            <Stack.Screen 
              name="noteCreation" 
              component={this.noteCreation}
              options={{ cardStyleInterpolator: (goToNoteCreationAni) }}
            />
          </Stack.Navigator>
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
    paddingBottom: 15,
    fontFamily: 'sans-serif-light'
  },
  labelStyle:
  {
    color: 'white',
    fontSize: 20,
    fontFamily: 'sans-serif-light'
  },
  itemContainerStyle:
  {
    borderRadius:20,
    width: 210,
  },
  iconStyle:{
    marginLeft:10
  },
  lineStyle: {
    width: 200,
    height: 1,
    opacity: 0.5,
    backgroundColor: 'white',
    marginTop: 140
  }
});  
