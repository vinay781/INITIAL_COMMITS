import {StyleSheet, Dimensions} from 'react-native';
import theme from "../../config/theme";
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
   videoComponentOuter : {marginVertical:15,marginHorizontal:20},
   videoComponentImage : {height:(SCREEN_HEIGHT*18)/100, width: null, flex: 1 ,borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20},
   videoComponentCenter : {height: "26%", width:"13%",position: 'absolute',margin:1,left:"45%",top:"40%"},
   videoComponentIcon : { color :"#fff"},
   videoComponentBottom : {marginTop:10,marginHorizontal:10},
   videoComponentTitle : {color:theme.WHITE_COLOR,fontWeight:"bold", fontSize:14 }
})