import {StyleSheet, Dimensions, Platform} from 'react-native';
import theme from '../../config/theme';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    miniPlayerOuter : { backgroundColor : theme.PINK_COLOR, width : (SCREEN_WIDTH*100)/100, height : 52, marginBottom : 0.5, justifyContent : "center", alignItems : "center",borderTopLeftRadius:5, borderTopRightRadius : 5},
    miniPlayerList : { backgroundColor:theme.PINK_COLOR, flexDirection : "row"},
    miniPlayerImage : {borderRadius:8,width:(SCREEN_WIDTH*10)/100,height:(SCREEN_WIDTH*10)/100,marginLeft:2},
    miniPlayerBody : { maxWidth : (SCREEN_WIDTH*50)/100 }, 
    miniPlayerTitle : {color:"white",marginBottom:2,fontWeight:'bold'},
    miniPlayerArtist : {fontWeight:'bold'},
    miniPlayerButton : { color :theme.DEFAULT_COLOR ,fontSize:25 }
})