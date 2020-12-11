import {StyleSheet,Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({    
    seeAllComponentOuter : {marginVertical:5,paddingHorizontal:10},
    seeAllComponentLeftImage : {borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100},
    seeAllComponentTitle : {color:"white",marginBottom:2,fontWeight:'bold'},
    seeAllComponentArtist : {fontWeight:'bold'},
    seeAllComponentRight : {flexDirection:"row-reverse",justifyContent:"space-between",width:(SCREEN_WIDTH*12)/100}
});