import Note from './Note'

var d = new Date();

//TODO
//later change notes to be retrieved from db
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
        this._noteList = [first,second,third,fourth,fifth,sixth,
        eighth,ninth,tenth,eleventh,twelveth,thirdteenth,
        fourteenth,fifthteenth];
    }

    get noteList(){
        return this._noteList;
    }
    
}