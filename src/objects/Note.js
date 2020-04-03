export default class Note {
    constructor(id,title,firstNote,dateTime,isFavourited,backColor,textColor){
        this._id=id;
        this._title=title;
        this._firstNote=firstNote;
        this._dateTime=dateTime;
        this._isFavourited=isFavourited;
        this._backColor=backColor;
        this._textColor = textColor;
    }

    //id setter getter
    get id(){
        return this._id;
    }
    set id(x){
        this._id=x;
    }

    //title setter getter
    get title(){
        return this._title;
    }
    set title(x){
        this._title=x;
    }

    //content setter getter
    get firstNote(){
        return this._firstNote;
    }
    set firstNote(x){
        this._firstNote=x;
    }

    //dateTime setter getter
    get dateTime(){
        return this._dateTime;
    }
    set dateTime(x){
        this._dateTime=x;
    }

    //isFavourited setter getter
    get isFavourited(){
        return this._isFavourited;
    }
    set isFavourited(x){
        this._isFavourited=x;
    }

    //backColor setter getter
    get backColor(){
        return this._backColor;
    }

    set backColor(x){
        if(typeof x === 'string'){
            this._backColor = x;
        }
    }

    //setColor setter getter
    get textColor(){
        return this._textColor;
    }

    set textColor(x){
        if(typeof x === 'string'){
            this._textColor = x;
        }
    }

    get content(){
        return this._content;
    }

    set content(x){
        this._content=x;
    }
}