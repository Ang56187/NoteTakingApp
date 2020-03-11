import React,{Component} from 'react';
import { StyleSheet,Text,View,FlatList } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';


export default class ScrollViewNotes extends React.Component{
    constructor(props){
       super(props);
       this.state ={
            scrollIndex: new Animated.Value(0),
            scaleX: new Animated.Value(40),
       };
    }

    //method check if it reached bottom of scroll
    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 6; // how far from the bottom
    return layoutMeasurement.height + contentOffset.y >= 
    contentSize.height - paddingToBottom;
    };

    //method check if it reached bottom of scroll
    isNotCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom =8; // how far from the bottom
    return layoutMeasurement.height + contentOffset.y <= 
    contentSize.height - paddingToBottom;
    };

    render(){
        let scrollY;
        let scrollSize = 0;

        return(
            <FlatList 
            contentContainerStyle = {styles.scroll}
            data={this.props.noteTitles}
            numColumns={2}
            ref={el => this.list = el}

            onScroll={ e =>{
                scrollY = e.nativeEvent.contentSize.height- e.nativeEvent.layoutMeasurement.height ;
                //send state to MainWrapper.js
                this.props.handleScrollIndex(scrollY-e.nativeEvent.contentOffset.y);
            }}

            renderItem={({ item }) => (
                <View 
                    style={{
                        backgroundColor: item.backColor,
                        padding: 10,
                        margin: 10,
                        width: 160,
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={styles.note}>{item.title}</Text>
                    <Text style={styles.noteDate}>{item.dateTime}</Text>
                </View>
            )}
            keyExtractor={item=> item.id}
            />
        );
    }
}

const styles = StyleSheet.create({
    scroll:{
        zIndex: 0,
        position: 'absolute',
        top:0,
        paddingTop:60,
        paddingBottom: 60,
        alignItems: 'center',
        width: '100%'
    },    
    note:{
        fontSize: 18,
        color: 'white'
    },
    noteDate:{
        fontSize: 13,
        color: 'white',
        paddingTop: 20
    }
});
