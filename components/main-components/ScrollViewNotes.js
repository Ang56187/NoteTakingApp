import React,{Component} from 'react';
import { StyleSheet,Text,View,FlatList } from 'react-native';


export default class ScrollViewNotes extends React.Component{
    render(){
        return(
            <FlatList 
            contentContainerStyle = {styles.scroll}
            data={this.props.noteTitles}
            numColumns={2}
            onEndReachedThreshold={0.03}
            onEndReached = {() => {console.log("end")}}
            renderItem={({ item }) => (
                <View 
                    style={{
                        backgroundColor: item.backColor,
                        padding: 10,
                        margin: 10,
                        width: 160,
                        elevation: 5  
                    }}
                >
                    <Text style={styles.note}>{item.title}</Text>
                    <Text style={styles.note}>{item.dateTime}</Text>
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
        paddingTop:50,
        paddingBottom: 70,
        alignItems: 'center',
        width: '100%'
    },    
    note:{
        fontSize: 17,
        color: 'white'
    }
});
