import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    myPlaylistComponentOuter : {marginVertical:5,paddingHorizontal:10},
    myPlaylistComponentLeftImage : {borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100},
    myPlaylistComponentBodyTitle : {color:"white",marginBottom:2,fontWeight:'bold'},
    myPlaylistComponentBodyArtist : {fontWeight:'bold'},
    myPlaylistComponentRight :{flexDirection:"row-reverse",justifyContent:"space-between",width:(SCREEN_WIDTH*12)/100},
    myPlaylistComponentRightIcon :{ color :"#fff",fontSize: 20}
});