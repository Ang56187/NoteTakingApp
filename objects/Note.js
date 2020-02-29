export default class Note {
    constructor(id,title,content,dateTime,isFavourited,backColor){
        this._id=id;
        this._title=title;
        this._content=content;
        this._dateTime=dateTime;
        this._isFavourited=isFavourited;
        this._backColor=backColor;
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
    get content(){
        return this._content;
    }
    set content(x){
        this._content=x;
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
}