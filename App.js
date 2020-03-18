import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainWrapper from './src/scenes/MainWrapper';
import DrawerNavigator from './src/components/DrawerNavigator'
import NoteCreationPage from './src/scenes/NoteCreationPage'


export default function App() {
  return (
    // <DrawerNavigator/>
    <NoteCreationPage/>
  );
}