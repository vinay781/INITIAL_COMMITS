import {StyleSheet, Dimensions} from 'react-native';
import theme from "../../config/theme";
const SCREEN_WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({
   profileComponent : {marginHorizontal:18,marginTop:15,paddingBottom:4},
   profileComponentRow : {flexDirection:"row", width:(SCREEN_WIDTH*100)/100},
   profileComponentRowImage : {borderRadius:10,height:(SCREEN_WIDTH*22)/100, width:(SCREEN_WIDTH*22)/100,marginHorizontal:5},
   profileComponentRowBody : {flexDirection:"column",paddingHorizontal:5, width:(SCREEN_WIDTH*70)/100},
   profileComponentTitle : {color:"white",fontWeight:"bold" ,color:"#ccc",marginTop:5},
   profileComponentDescription : {color:theme.DARK_GREY_COLOR,fontSize:11 },
   profileComponentTopButton : {width:"20%",borderWidth:1,alignItems:"center",justifyContent:"center", borderRadius:5,borderColor:theme.DARK_GREY_COLOR,flexDirection:"row"},
   profileComponentDiamondIcon : {fontSize:10, color: '#326799'},
   profileComponentTopText : {color:theme.DARK_GREY_COLOR},
   profileComponentBottomLine : { marginHorizontal : 15},
   logOutButton: {
      marginHorizontal: 30,
      height : 50,
      backgroundColor:theme.DEFAULT_COLOR,
      borderRadius:20,
      marginBottom: 20,
      borderWidth : (SCREEN_WIDTH * 0.5) / 100,
      borderColor : theme.PINK_COLOR,
      justifyContent : "center",
      alignSelf: 'center'
     },
     linkTextLo : {
      color : theme.PINK_COLOR,
      fontWeight : "bold",      
    },
    errorInput : {        
      color : "red",         
      position : "absolute",
      bottom : 0,
      left : 10        
   }
})