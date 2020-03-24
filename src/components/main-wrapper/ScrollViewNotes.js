import React,{Component} from 'react';
import { StyleSheet,Text,View,ScrollView,Dimensions } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

const deviceWidth = Math.round(Dimensions.get('window').width);

export default class ScrollViewNotes extends React.Component{
    constructor(props){
       super(props);
       this.state ={
            scrollIndex: 0,
            scaleX: new Animated.Value(40),
       };

       this.scrollIndex;
       this.scrollY;
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

    sort(arr){

    }

    render(){

        //split to 2 array
        //concentrate all long titles to middle
        const newArr = this.props.noteTitles.sort(
            function(a,b){return a.title.length-b.title.length}
        );
        const indexToSplit = Math.round(this.props.noteTitles.length/2);
        const firstHalfArr = newArr.slice(0,indexToSplit);
        const secondHalfArr = newArr.slice(indexToSplit);

        secondHalfArr.sort(function(a,b){
            return b.title.length-a.title.length;
        })

        return(
            <ScrollView 
                scrollEventThrottle = {16}
                contentContainerStyle = {{      
                    zIndex: 0,
                    position: 'absolute',
                    top:0,
                    paddingTop:60,
                    paddingBottom: 60,
                    marginBottom: 100,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexWrap: 'wrap',
                    width: '100%'
                }}
                ref={el => this.list = el}
                onMomentumScrollBegin={ e =>{
                    this.scrollY = e.nativeEvent.contentSize.height- e.nativeEvent.layoutMeasurement.height ;
                    this.scrollIndex= this.scrollY-e.nativeEvent.contentOffset.y;
                    if(this.scrollIndex>11 || this.props.onClickedSearchBtn){
                        this.props.shrinkButton().start();
                        this.props.expandButton().stop();
                    }
                }}

                onMomentumScrollEnd = {e=>{
                    this.scrollY = e.nativeEvent.contentSize.height- e.nativeEvent.layoutMeasurement.height ;
                    this.scrollIndex= this.scrollY-e.nativeEvent.contentOffset.y;
                    if (this.scrollIndex<=10 && !this.props.onClickedSearchBtn){
                        this.props.expandButton().start();
                        this.props.shrinkButton().stop();
                    }
                }}
            >
                {/* one half list at left */}
                <View 
                    style={{
                        width: deviceWidth/2,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                > 
                    {
                        firstHalfArr.map(item=>{
                                return(
                                    <Animated.View 
                                        style={{
                                            backgroundColor: item.backColor,
                                            padding: 8,
                                            margin: 5,
                                            width: 170,//deviceWidth-20,
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            borderRadius: 5
                                        }}
                                    >
                                        <Text style={styles.note}>{item.title}</Text>
                                        <Text style={styles.noteDate}>{item.dateTime}</Text>
                                    </Animated.View>
                                )
                        })
                    }
                </View>

                {/* one half list at right */}
                <View
                    style={{
                        width: deviceWidth/2,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {
                        secondHalfArr.map(item=>{
                            return(
                                <Animated.View 
                                    style={{
                                        backgroundColor: item.backColor,
                                        padding: 8,
                                        margin: 5,
                                        width: 170,//deviceWidth-20,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        borderRadius: 5
                                    }}
                                >
                                    <Text style={styles.note}>{item.title}</Text>
                                    <Text style={styles.noteDate}>{item.dateTime}</Text>
                                </Animated.View>
                            )
                        })
                    }
                </View>
            </ScrollView>
            // <FlatList 
            //     scrollEventThrottle = {16}
            //     contentContainerStyle = {styles.scroll}
            //     data={this.props.noteTitles}
            //     numColumns={2}
            //     ref={el => this.list = el}
            //     onMomentumScrollBegin={ e =>{
            //         this.scrollY = e.nativeEvent.contentSize.height- e.nativeEvent.layoutMeasurement.height ;
            //         this.scrollIndex= this.scrollY-e.nativeEvent.contentOffset.y;
            //         if(this.scrollIndex>11 || this.props.onClickedSearchBtn){
            //             this.props.shrinkButton().start();
            //             this.props.expandButton().stop();
            //         }
            //     }}

            //     onMomentumScrollEnd = {e=>{
            //         this.scrollY = e.nativeEvent.contentSize.height- e.nativeEvent.layoutMeasurement.height ;
            //         this.scrollIndex= this.scrollY-e.nativeEvent.contentOffset.y;
            //         if (this.scrollIndex<=10 && !this.props.onClickedSearchBtn){
            //             this.props.expandButton().start();
            //             this.props.shrinkButton().stop();
            //         }
            //     }}

            //     renderItem={({ item }) => (
            //         <Animated.View 
            //             style={{
            //                 backgroundColor: item.backColor,
            //                 padding: 10,
            //                 margin: 10,
            //                 width: 160,
            //                 flexDirection: 'column',
            //                 justifyContent: 'space-between'
            //             }}
            //         >
            //             <Text style={styles.note}>{item.title}</Text>
            //             <Text style={styles.noteDate}>{item.dateTime}</Text>
            //         </Animated.View>
            //     )}
            //     keyExtractor={item=> item.id}
            // />
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
        marginBottom: 100,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        width: '100%'
    },    
    note:{
        fontSize: 18,
        color: 'white',
        fontFamily: 'sans-serif'
    },
    noteDate:{
        fontSize: 13,
        color: 'white',
        paddingTop: 20
    }
});
