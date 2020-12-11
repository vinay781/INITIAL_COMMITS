import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
   downloadListComponentOuter : {marginVertical:5,paddingHorizontal:10},
   downloadListComponentLeftImage:{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100},
   downloadListComponentTitle:{color:"white",marginBottom:2,fontWeight:'bold'},
   downloadListComponentArtist:{fontWeight:'bold'},
   downloadListComponentRight:{flexDirection:"row"},
   downloadListComponentRightIcon:{ color :"#fff",fontSize: 20}
})