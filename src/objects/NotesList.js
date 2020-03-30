import Note from './Note'
import  * as SQLite from 'expo-sqlite';
import React,{Component,useState} from 'react';

var d = new Date();
const db = SQLite.openDatabase('db.db');

//TODO
//later change notes to be retrieved from db

//Update: 29/03/2020, this object no longer used
//update the state directly to obtain sql queries instead
//due to callbacks making it hard to assign value to variable
var first = new Note(1,"Hewwodfsdfl;kl;k;lkdsfdsf \nadasdw\nQWE werewsdd","e33",d.toDateString(),true,"#7B1FA2","#ffffff");
var second = new Note(2,"Owo","e33",d.toDateString(),true,"#C2185B","#ffffff");
var third = new Note(3,"Uwu","e33",d.toDateString(),true,"#D32F2F","#ffffff");
var fourth = new Note(4,"werasdasdawdasdadadawd \nadawdadwd","e33",d.toDateString(),true,"#1976D2","#ffffff");
var fifth = new Note(5,"tiny fam\nsleep tight pupper or i willl kill ya buddy\n daaskdhakwd0","e33",d.toDateString(),true,"#0097A7","#ffffff");
var sixth = new Note(6,"Dickbutt lmao dfsdlfjsdlkfjlef","e33",d.toDateString(),true,"#00796B","#ffffff");
var seventh = new Note(7,"Why are you running fam","e33",d.toDateString(),true,"#455A64","#ffffff");
var eighth = new Note(8,"Go to sleep\n go to sleep\ngot to sleep","e33",d.toDateString(),true,"#E65100","#ffffff");
var ninth = new Note(9,"werasdasdawdasdadadawd \nadawdadwd","e33",d.toDateString(),true,"#BF360C","#ffffff");
var ninth = new Note(9,"Hewwerwo","e33",d.toDateString(),true,"#1A237E","#ffffff");
var tenth = new Note(10,"Hewwwo","e33",d.toDateString(),true,"#880E4F","#ffffff");
var eleventh = new Note(11,"Hewwwo","e33",d.toDateString(),true,"#E65100","#ffffff");
var second = new Note(2,"Owocjdajdad\nassssssdawd\nassssssdwa\naddddawdasdawd\ndadasdwdaw","e33",d.toDateString(),true,"#C2185B","#ffffff");
var twelveth = new Note(12,"wer","e33",d.toDateString(),true,"#455A64","#ffffff");
var thirdteenth = new Note(13,"Hewwerwo","e33",d.toDateString(),true,"#004D40","#ffffff");
var fourteenth = new Note(14,"werasdasdawdasdadadawd \nadawdadwd","e33",d.toDateString(),true,"#01579B","#ffffff");
var fifthteenth = new Note(15,"werasdasdawdasdadadawd","e33",d.toDateString(),true,"#0D47A1","#ffffff");


export default class NoteList{
    constructor(){
        
        var dupeArr = [];

        this._noteList = [];

        var index =1;
        db.transaction(tx=>{
            tx.executeSql('select * from notes',[],
            (_,{rows:{_array}})=>{
                _array.forEach(e=>{
                    dupeArr.push(new Note(
                        e.id,e.title,"add later",this.convertDate(e.dateTime),false,
                        e.backColor,e.textColor));
                    index++;
                })
                this._noteList=dupeArr;
            },
            (_,error)=>{console.log(error)})
        })
        setTimeout(()=>{console.log(this._noteList)},1000)

        //this._noteList = [first,second,third]

        // ,fourth,fifth,sixth,
        // eighth,ninth,tenth,eleventh,twelveth,thirdteenth,
        // fourteenth,fifthteenth];
        // this._noteList=dupeArr;
    }

    convertDate(date){
        const year = date.substring(0,4)
        const month= date.substring(5,7)
        const day = date.substring(8,10)

        const hour = date.substring(11,13)
        const minute = date.substring(14,16)
        const second = date.substring(17,19)
        return (new Date(year,month,day,hour,minute,second).toLocaleString())
    }

    set noteList(x){
        this._noteList = x
    }

    get noteList(){
        return this._noteList;
    }
    
}