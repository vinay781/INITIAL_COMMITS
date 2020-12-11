import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    freeMusicComponentOuter : {marginVertical:5,paddingHorizontal:10},
    freeMusicComponentLeftImage : {borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100},
    freeMusicComponentTitle : {color:"white",marginBottom:2,fontWeight:'bold'},
    freeMusicComponentArtist : {fontWeight:'bold'},
})
