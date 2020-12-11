import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  playlistComponentOuter: {marginVertical:5,paddingHorizontal:10}, 
  playlistComponentLeftImage: {borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100}, 
  playlistComponentTitle: {color:"white",marginBottom:2,fontWeight:'bold'},
  playlistComponentDate: {fontWeight:'bold'},
  playlistComponentRightIcon: { color :"#fff",fontSize: 15}
})