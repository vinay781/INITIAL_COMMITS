import {StyleSheet, Dimensions} from 'react-native';
import theme from "../../config/theme";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    downloadComponentIcon : { color :"#fff",fontSize: 20},
    downloadComponentOuter : { height:(SCREEN_HEIGHT*100)/100, backgroundColor : "transparent" },
    downloadComponentInner : { marginTop: (SCREEN_HEIGHT*30)/100, marginHorizontal:(SCREEN_WIDTH*5)/100,
    width:(SCREEN_WIDTH*90)/100,alignItems:"center",backgroundColor:"#fff",borderRadius:20,
    shadowColor: "#000",shadowOffset: { width: 0,height: 10},shadowOpacity: 0.53,shadowRadius: 13.97,elevation: 21},    
    downloadComponentClose : { width : "100%", flexDirection:"row-reverse"},
    downloadComponentTopButton : { width :(SCREEN_WIDTH*15)/100},
    downloadComponentTopIcon : { backgroundColor :"#fff", color:theme.PINK_COLOR ,fontSize: 25},
    downloadComponentImage : { width:100, height:100},
    downloadComponentBody : {width:(SCREEN_WIDTH*60)/100, marginTop : 15, alignItems:"center"},
    downloadComponentTextOne : { color: "#000", fontWeight: "bold", textAlign: "center", fontSize : (SCREEN_WIDTH*5)/100 },
    downloadComponentTextTwo : {fontWeight: "bold", textAlign: "center",color:theme.PINK_COLOR,fontSize:(SCREEN_WIDTH*4)/100},
    downloadComponentTextThree : { color : theme.PINK_COLOR, textDecorationLine: 'underline', marginTop : 5},
    downloadComponentBottom : { width : "100%", top : (SCREEN_HEIGHT*1)/100},
    downloadComponentBottomImage : {width:30,height:10, marginHorizontal : 5},
    submitButton:{marginVertical:20,marginHorizontal:20,height:50,backgroundColor:theme.PINK_COLOR,borderRadius:20},
    linkText:{color:theme.WHITE_COLOR,fontWeight:"bold"},
})