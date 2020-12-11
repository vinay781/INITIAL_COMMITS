import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  cardComponentOuter : {marginHorizontal:5, backgroundColor:"#0A151F"},
  cardComponentCard : { elevation: 3,backgroundColor:"#0A151F", borderColor :"#0A151F"},
  cardComponentCardItem : { backgroundColor:"#0A151F"},
  cardComponentTitle : { color:"#fff", fontSize : 10, fontWeight:"bold"},
  cardComponentArtist : {  fontSize : 9, fontWeight:"bold"},
})