import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
   songComponentOuter:{ height:(SCREEN_HEIGHT*100)/100, backgroundColor : "transparent" }, 
   songComponentInner:{ marginTop: (SCREEN_WIDTH*30)/100, marginHorizontal:(SCREEN_WIDTH*5)/100, width:(SCREEN_WIDTH*90)/100, height:(SCREEN_HEIGHT*35)/100,alignItems:"center", backgroundColor:"#fff", borderRadius:20, shadowColor: "#000", shadowOffset: {width: 0,height: 10,},shadowOpacity: 0.53,shadowRadius: 13.97,elevation: 21 }, 
   songComponentTop:{ width : "100%"}, 
   songComponentButton:{ width : "15%"},
   songComponentBody:{ height:"80%", width: "100%", justifyContent : "center", alignContent : "center" }
})