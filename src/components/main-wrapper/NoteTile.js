import React from 'react';
import { StyleSheet,Text,TouchableOpacity,Animated,LayoutAnimation } from 'react-native';


export default class NoteTile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            positionX: 0,
            positionY:0
        }
        this.animateOpacity = new Animated.Value(0);
        this.animateScale = new Animated.Value(0);
        this.animateY = new Animated.Value(0);

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.item.id !== this.props.item.id) {
          return true;
        }
        return false;
      }
    
    componentDidMount(){
        const ani1 = Animated.timing(this.animateOpacity,{duration: 400+this.props.item.id*15, toValue:1,useNativeDriver: true});

        const ani2 = Animated.timing(this.animateScale,{duration:300+this.props.item.id*15, toValue: 1.05,useNativeDriver: true});
        const ani2A = Animated.timing(this.animateScale,{duration:200+this.props.item.id*15, toValue: 1,useNativeDriver: true});

        const ani3 = Animated.timing(this.animateY,{duration:300+this.props.item.id*15, toValue: 10,useNativeDriver: true});
        const ani3A = Animated.timing(this.animateY,{duration:200+this.props.item.id*15, toValue: 0,useNativeDriver: true});

        Animated.parallel([ani1,Animated.sequence([ani2,ani2A]),Animated.sequence([ani3,ani3A])]).start();
    }

    // //future use, in case delete feature implemented
    // componentWillUnmount(){
    //     const ani1 = Animated.timing(this.animateOpacity,{duration: 300, toValue:0,useNativeDriver: true});
    //     const ani2 = Animated.timing(this.animateScale,{duration:300, toValue: 0,useNativeDriver: true});

    //     Animated.parallel([ani1,ani2]).start(()=>{
    //         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //     });
    // }


    render(){
        return(
            //TODO
            //later change onPress after done note display page
            <TouchableOpacity 
                ref={note => this.touchNote = note}
                // onLayout = {(e)=>{
                //     this.setState({positionX:e.nativeEvent.layout.x,
                //         positionY:e.nativeEvent.layout.y})
                // }}
                activeOpacity={0.8}
                onPress={()=>{
                    this.touchNote.measure((fx, fy, width, height, px, py)=>{
                        // console.log("position y" + py)
                        // console.log("position x" + px)
                        this.props.setNotePosition(px,py);
                        setTimeout(()=>{
                            this.props.setAnimationType("goToNote");
                            this.props.navigation.navigate('noteCreation');
                        },60)
                    });
                }}
            >
                <Animated.View 
                    style={{
                        transform: [{scale: this.animateScale},{translateY: this.animateY}],
                        opacity: this.animateOpacity,
                        backgroundColor: this.props.item.backColor,
                        padding: 8,
                        margin: 5,
                        width: 170,//deviceWidth-20,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderRadius: 5
                    }}
                >
                    <Text style={styles.note}>{this.props.item.title}</Text>
                    <Text style={styles.noteDate}>{this.props.item.dateTime}</Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
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