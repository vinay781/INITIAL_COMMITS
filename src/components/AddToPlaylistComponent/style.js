import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    addToPlaylistOuter : {marginVertical:5,paddingHorizontal:10},
    addToPlaylistLeft : {borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100},
    addToPlaylistTitle : {color:"white",marginBottom:2,fontWeight:'bold'},
    addToPlaylistDate : {fontWeight:'bold'},
    addToPlaylistIcon : { color :"#fff",fontSize: 15},
})