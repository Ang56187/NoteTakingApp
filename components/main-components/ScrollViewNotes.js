import React,{Component} from 'react';
import { StyleSheet,Text,View,FlatList } from 'react-native';

export default class ScrollViewNotes extends React.Component{

    //method check if it reached bottom of scroll
    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0.2; // how far from the bottom
    return layoutMeasurement.height + contentOffset.y >= 
    contentSize.height - paddingToBottom;
    };

    //method check if it reached bottom of scroll
    isNotCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0.9; // how far from the bottom
    return layoutMeasurement.height + contentOffset.y <= 
    contentSize.height - paddingToBottom;
    };

    render(){
        var test = false;
        var counter = 0;

        return(
            <FlatList 
            contentContainerStyle = {styles.scroll}
            data={this.props.noteTitles}
            numColumns={2}
            ref={el => this.list = el}
            onScroll={(e)=>{
                if (this.isCloseToBottom(e.nativeEvent)) {
                    this.props.handleOnEndScroll(true);
                }
                // else if (this.isNotCloseToBottom(e.nativeEvent))
                // {this.props.handleOnEndScroll(false);}   
            }}

            onScrollEndDrag ={(e) =>{
              if (this.isNotCloseToBottom(e.nativeEvent))
                {this.props.handleOnEndScroll(false);}   
            }}

            renderItem={({ item }) => (
                <View 
                    style={{
                        backgroundColor: item.backColor,
                        padding: 10,
                        margin: 10,
                        width: 160,
                        elevation: 3 ,
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
