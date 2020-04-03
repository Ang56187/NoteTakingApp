import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainWrapper from './src/scenes/MainWrapper';
import DrawerNavigator from './src/components/DrawerNavigator'
import NoteDisplayPage from './src/scenes/NoteDisplayPage'
import  * as SQLite from 'expo-sqlite';

//essential sql commands
//1. show * from notes (show all rows in table)
//2. PRAGMA table_info(notes) (show all columns in table)

const db = SQLite.openDatabase('db.db');
//TODO, solve db problem,
export default function App() {
  db.transaction(tx => {
    db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => console.log('Foreign keys turned on')),
    //create notes list
    tx.executeSql('create table if not exists notes('+
      'id integer not null primary key,noteNum varchar(255),title MIDDLETEXT,firstNote LONGTEXT,dateTime DATETIME,'+
      'isFavourited integer,backColor varchar(255),textColor varchar(255))',[],(_,ResultSet)=>{},
      (_,error)=>{console.log(error)}),
    //create the text written in notes
    tx.executeSql('create table if not exists noteContent('+
      'contentID INTEGER NOT NULL PRIMARY KEY, noteType TEXT, isChecked integer,content LONGTEXT,'+
      'noteID INTEGER REFERENCES notes(id))',[],(_,ResultSet)=>{},
      (_,error)=>{console.log(error)})
    // tx.executeSql('select * from noteContent',[],(_,ResultSet)=>{console.log(ResultSet.rows)},
    // (_,error)=>{console.log(error)})
  });
  return (
    <DrawerNavigator/>
    // <NoteDisplayPage/>
  );
}