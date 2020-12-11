import {StyleSheet} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({
   albumViewComponentOuter : {marginVertical:5,paddingHorizontal:10},
   albumViewComponentLeft : {borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100},
   albumViewComponentTitle : {color:"white",marginBottom:2,fontWeight:'bold'},
   albumViewComponentContent : {fontWeight:'bold'},
   albumViewComponentRight : {flexDirection:"row",justifyContent:"space-between",width:(SCREEN_WIDTH*12)/100},
   albumViewComponentIcon : { color :"#fff",fontSize: 20},
});