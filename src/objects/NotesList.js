import Note from './Note'

var d = new Date();

//TODO
//later change notes to be retrieved from db
var first = new Note(1,"Hewwodfsdfdsfdsf \nadasdw\nQWE werewsdd","e33",d.toDateString(),true,"#7B1FA2");
var second = new Note(2,"Owo","e33",d.toDateString(),true,"#C2185B");
var third = new Note(3,"Uwu","e33",d.toDateString(),true,"#D32F2F");
var fourth = new Note(4,"wer","e33",d.toDateString(),true,"#1976D2");
var fifth = new Note(5,"tgerer","e33",d.toDateString(),true,"#0097A7");
var sixth = new Note(6,"Hewwwo","e33",d.toDateString(),true,"#00796B");
var seventh = new Note(7,"Hewwwo","e33",d.toDateString(),true,"#455A64");
var eighth = new Note(8,"wer","e33",d.toDateString(),true,"#E65100");
var ninth = new Note(9,"Hewwerwo","e33",d.toDateString(),true,"#BF360C");
var ninth = new Note(9,"Hewwerwo","e33",d.toDateString(),true,"#1A237E");
var tenth = new Note(10,"Hewwwo","e33",d.toDateString(),true,"#880E4F");
var eleventh = new Note(11,"Hewwwo","e33",d.toDateString(),true,"#E65100");
var second = new Note(2,"Owo","e33",d.toDateString(),true,"#C2185B");
var twelveth = new Note(12,"wer","e33",d.toDateString(),true,"#455A64");
var thirdteenth = new Note(13,"Hewwerwo","e33",d.toDateString(),true,"#004D40");
var fourteenth = new Note(14,"Hewwwo","e33",d.toDateString(),true,"#01579B");
var fifthteenth = new Note(15,"Hewwwo","e33",d.toDateString(),true,"#0D47A1");


export default class NoteList{
    constructor(){
        this._noteList = [first,second,third,fourth,fifth,sixth,seventh,
        eighth,ninth,tenth,eleventh,twelveth,thirdteenth,fourteenth,fifthteenth];
    }

    get noteList(){
        return this._noteList;
    }
    
}