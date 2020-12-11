import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({
   favListComponentOuter : {paddingVertical:2, paddingHorizontal:10, backgroundColor:"#0A151F"},
   favListComponentLeftImage : {borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100},
   favListComponentBodyTitle : {color:"white",marginBottom:2,fontWeight:'bold'},
   favListComponentBodyArtist : {color :"#fff",fontWeight:'bold'},
   favListComponentRightIcon : { color :"#fff",fontSize: 15},
})