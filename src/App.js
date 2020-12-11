import React, { useEffect } from 'react';
import { BackHandler, Alert } from "react-native";
import Routes from './Routes';
import SplashScreen from 'react-native-splash-screen';
import { Root } from 'native-base';

async function handleBackPress(){
  Alert.alert(
    'Exit App',
    'Exiting the application?', 
    [{
      text: 'Cancel',      
      style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => {BackHandler.exitApp()}
      }, ], 
      {
        cancelable: false
      }
  )  
  return true;
}  

const App = () => {
useEffect(()=>{
  SplashScreen.hide()
  BackHandler.addEventListener("handleBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener(
        "handleBackPress",
        handleBackPress
      );
    };
}, [handleBackPress]);

  return(
    <Root>
      <Routes/>      
    </Root>
  )
}
export default App;