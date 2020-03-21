import React,{Component} from 'react';
import { StyleSheet,View,ScrollView,TouchableOpacity, Animated,UIManager } from 'react-native';
import {Button} from 'react-native-elements';

const listOfColors = [
    '#4D4D4D', '#999999','#F44E3B', '#FE9200', '#FCDC00',
    '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', 
    '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', 
    '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', 
    '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', 
    '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
]


export default class CirclePicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //for background color btn selection (no: 1)
            animateBackFontSize: new Animated.Value(22),
            animateBackMarginBottom: new Animated.Value(10),
            //for text color btn selection (no: 2)
            animateTextFontSize: new Animated.Value(17),
            animateTextMarginBottom: new Animated.Value(0),
            //for dashed line below the btn selection
            animateBackDashedLineBottom: new Animated.Value(3),
            animateTextDashedLineBottom: new Animated.Value(-10),
            //default select background, 2 for text
            selectionNo: 1,

            //for circle button color animation
            focusedWhiteSize: new Animated.Value(0),
            focusedOpacity: new Animated.Value(0),
            backgrounColorKey: null,
            textColorKey: null

        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    //disable the error that leaves first focused white circle on first clicked circle color button
    //even after clicking another color
    componentDidMount(){
        this.expandFocusRadius();
    }

    //create dashed lines of different color depending on color sent by para
    dashedLine=(color)=>{
        const dashedLine = [];
        //loop for dashed line dots
        for(var i= 0;i<=6;i++){
            dashedLine.push(
                <View 
                    key={i}
                    style={{
                        borderRadius: 20,
                        width: 4,
                        height: 4,
                        backgroundColor: color,
                    }}
                />
            )
        }
        return dashedLine;
    }

    //animate selection of circle color at scrollview
    expandFocusRadius = () =>{
        //needed to delay animation to allow aniamtion to be played at buttons at the right
        const ani1 = Animated.timing(this.state.focusedOpacity,
            {duration: 50,toValue: 1})
        const ani2 = Animated.timing(this.state.focusedWhiteSize,
            {duration: 100,toValue: 0});
        const ani3 = Animated.timing(this.state.focusedWhiteSize,
            {duration: 100,toValue: 29});
        const ani4 = Animated.timing(this.state.focusedWhiteSize,
            {duration: 200,toValue: 23});
        return Animated.sequence([ani1,ani2,ani3,ani4]).start();
    }

    // Animate selection between background or text color
    expandText = (fontSize,marginBottom,dashedLineBottomUp) =>{
        const ani1=Animated.timing(fontSize,
            {duration: 400,toValue: 25});
        const ani1A=Animated.timing(fontSize,
            {duration: 150,toValue: 22});

        const ani2=Animated.timing(marginBottom,
            {duration: 200,toValue: 15});       
        const ani2A=Animated.timing(marginBottom,
            {duration: 150,toValue: 1});
        const ani2B=Animated.timing(marginBottom,
            {duration: 600,toValue: 10});
        
        const ani3 = Animated.timing(dashedLineBottomUp,
            {duration: 300,toValue: 3});

        const ani1Combined = Animated.sequence([ani1,ani1A,ani3]);
        const ani2Combined = Animated.sequence([ani2,ani2A,ani2B]);
        return Animated.parallel([ani1Combined,ani2Combined]).start();
    }

    shrinkText = (fontSize,marginBottom,dashedLineBottomDown)=>{
        const ani1=Animated.timing(fontSize,
            {duration: 600,toValue: 17});
        const ani2=Animated.timing(marginBottom,
            {duration: 400,toValue: 0});  
        const ani3 = Animated.timing(dashedLineBottomDown,
            {duration: 1000,toValue: -10});
        return Animated.parallel([ani3,ani1,ani2]).start();
    }

    render(){

        //limit white color for text color only, background wont have white
        //due to it matching majority of UI color
        //maybe in future i might implement it
        if(this.state.selectionNo == 2 && !listOfColors.includes("#ffffff")){
            listOfColors.push("#ffffff");
        }
        else if (this.state.selectionNo == 1 && listOfColors.includes("#ffffff")){
            listOfColors.splice(listOfColors.indexOf("#ffffff"),1);
        }

        return(
            <View style={{flexDirection: 'column'}}>
                {/* First row(allow color select for background or text) */}
                <View
                    style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        width: 220,
                        height: 40,
                        borderRadius: 20,
                        margin: 10,
                        marginLeft: 0,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderWidth: (this.props.backColor == '#ffffff' ? 0.3 : 0)
                    }} 
                > 
                {/* background */}
                    <TouchableOpacity
                        style={StyleSheet.create([styles.colorTabStyle,{width: 140,flexDirection: 'column'}])}
                        onPress={()=>{
                            this.setState({selectionNo: 1});                            
                            this.shrinkText(this.state.animateTextFontSize,this.state.animateTextMarginBottom,
                                this.state.animateTextDashedLineBottom);
                            this.expandText(this.state.animateBackFontSize,this.state.animateBackMarginBottom,
                                this.state.animateBackDashedLineBottom);
                        }}
                    >
                        <Animated.Text
                            style={{
                                color: this.props.backColor,
                                fontFamily: 'sans-serif',
                                alignSelf: 'center',
                                marginBottom: this.state.animateBackMarginBottom,
                                fontSize: this.state.animateBackFontSize
                            }}
                        > 
                            Background
                        </Animated.Text>

                        {/* dashed line underneath text */}
                        <Animated.View style={
                            StyleSheet.flatten([styles.dashedLineStyle,{
                                position: 'absolute',
                                bottom: this.state.animateBackDashedLineBottom}])
                            }>
                            {this.dashedLine(this.props.backColor)}
                        </Animated.View>
                    </TouchableOpacity>

                    {/* Text */}
                    <TouchableOpacity
                        style={StyleSheet.flatten([styles.colorTabStyle,{
                            width: 70,
                            backgroundColor: (this.props.textColor==='#ffffff' ? '#b3b3b3' : null),
                            opacity: (this.props.textColor==='#ffffff' ? 0.8 : null)
                        }])}
                        onPress={()=>{
                            this.setState({selectionNo: 2});
                            this.shrinkText(this.state.animateBackFontSize,this.state.animateBackMarginBottom,
                                this.state.animateBackDashedLineBottom);
                            this.expandText(this.state.animateTextFontSize,this.state.animateTextMarginBottom,
                                this.state.animateTextDashedLineBottom);
                        }}
                    >
                        <Animated.Text
                            style={{
                                color: this.props.textColor,
                                fontFamily: 'sans-serif',
                                alignSelf: 'center',
                                marginBottom: this.state.animateTextMarginBottom,
                                fontSize: this.state.animateTextFontSize,
                            }}
                        > 
                            Text
                        </Animated.Text>

                        {/* dashed line underneath text */}
                        <Animated.View style={
                            StyleSheet.flatten([styles.dashedLineStyle,{
                                position: 'absolute',
                                bottom: this.state.animateTextDashedLineBottom}])
                            }>
                            {this.dashedLine(this.props.textColor)}
                        </Animated.View>
                    </TouchableOpacity>
                </View>

                {/* Second row(select color through the circle picker) */}
                <ScrollView style = {{
                    width: this.props.width-10,
                    maxHeight: 80,
                    backgroundColor: 'transparent',
                    paddingBottom: 5,
                    zIndex: 1
                }}
                horizontal = {true}
                >
                    {
                        //loops thorugh each color in array to buttons
                        listOfColors.map((item,key)=>(
                                <TouchableOpacity
                                    key = {key}
                                    ref = {this.colorBtn}
                                    style = {{
                                        width: 40,
                                        height: 40,
                                        marginRight: 10,
                                        marginBottom: 10,
                                        borderRadius: 20,
                                        borderWidth: 0.5,
                                        borderColor: '#ffffff',
                                        backgroundColor: item,
                                        justifyContent: 'center'  
                                    }}
                                    disabled = {this.props.isColorViewOpen ? false : true}
                                    onPress = {()=>{
                                        if(this.state.selectionNo == 1){
                                            this.setState({backgrounColorKey: key});
                                            this.props.handleBackColor(item);
                                        }
                                        else if(this.state.selectionNo == 2){
                                            this.setState({textColorKey: key});
                                            this.props.handleTextColor(item);
                                        }
                                        this.expandFocusRadius();
                                    }}
                                    activeOpacity = {0.7}
                                >
                                    <Animated.View 
                                        key={key}
                                        style={{
                                            backgroundColor: '#ffffff',
                                            height: (
                                                //if background color selected, then set size,
                                                //else if text color selected, then set size, 
                                                //else size is 0
                                                this.state.backgrounColorKey==key && this.state.selectionNo == 1
                                                    ? this.state.focusedWhiteSize : 
                                                    this.state.textColorKey==key && this.state.selectionNo == 2 ?
                                                    this.state.focusedWhiteSize : 0
                                                    ),
                                            width: (
                                                //if background color selected, then set size,
                                                //else if text color selected, then set size, 
                                                //else size is 0
                                                this.state.backgrounColorKey==key && this.state.selectionNo == 1
                                                    ? this.state.focusedWhiteSize : 
                                                    this.state.textColorKey==key && this.state.selectionNo == 2 ?
                                                    this.state.focusedWhiteSize : 0
                                                    ),
                                            borderRadius:20,
                                            opacity: this.state.focusedOpacity,
                                            alignSelf: 'center'}}/>
                                </TouchableOpacity>
                        ))
                    }    
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    colorTabStyle:{
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    dashedLineStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: 40
    }
})