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
            view1Height: 0,
            view2Height: 0
       };

       this.scrollIndex;
       this.scrollY;

        //split to 2 array
        //concentrate all long titles to middle
        this.newArr = this.props.noteTitles.sort(
            function(a,b){return a.title.length-b.title.length}
        );
        
        this.indexToSplit = Math.round(this.props.noteTitles.length/2);
        this.firstHalfArr = this.newArr.slice(0,this.indexToSplit);
        this.secondHalfArr = this.newArr.slice(this.indexToSplit);

        this.secondHalfArr.sort(function(a,b){
            return b.title.length-a.title.length;
        })

    }

    //mount all the notes
    componentDidMount(){
        //if right side view is taller than left side view
        //send over its note to left side to even the height out
        //TODO
        //most error prone,if something wrong with notes at main page, its here
        //TLDR
        //if exceed, right to left,
        //else from left to right
        if((this.state.view1Height-this.state.view2Height)>=-250){
            console.log('right to left')

            //get smallest title length element
            let smallest = this.secondHalfArr[0];
            this.secondHalfArr.forEach(e=>{
                if(e.title.length<=smallest.title.length){
                    smallest=e
                }
            })
            
            this.firstHalfArr.push(smallest)
            this.secondHalfArr.splice(this.secondHalfArr.indexOf(smallest.id),1)
        }
        else if((this.state.view1Height-this.state.view2Height)>=250){
            console.log('left to right')

            //get smallest title length element
            let smallest = this.firstHalfArr[0];
            this.firstHalfArr.forEach(e=>{
                if(e.title.length<=smallest.title.length){
                    smallest=e
                }
            })

            this.secondHalfArr.push(smallest)
            this.firstHalfArr.splice(this.firstHalfArr.indexOf(smallest.id),1)
        }
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

    handleOnLayout1 = (e)=>{
        this.setState({view1Height: e.nativeEvent.layout.height});
    }
    
    handleOnLayout2 = (e) => {
        this.setState({view2Height: e.nativeEvent.layout.height});
    }

    render(){

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
                    onLayout = {this.handleOnLayout1}
                > 
                    {
                        this.firstHalfArr.map(item=>{
                                return(
                                    <Animated.View 
                                        key={item.id}
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
                        alignItems: 'center',
                    }}
                    onLayout = {this.handleOnLayout2}
                >
                    {
                        this.secondHalfArr.map(item=>{
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
