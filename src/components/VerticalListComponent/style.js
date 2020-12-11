import {StyleSheet,Dimensions} from 'react-native';
import theme from '../../config/theme';
const SCREEN_WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({    
    albumContainer : { marginHorizontal:5, backgroundColor:"#0A151F" },
    verticalListComponentInner : {marginHorizontal:18,marginTop:15},
    verticalListComponentRow : {flexDirection:"row", width:(SCREEN_WIDTH*100)/100},
    verticalListComponentColumn : {flexDirection:"column",paddingHorizontal:5, width:(SCREEN_WIDTH*70)/100},
    verticalListComponentTitle : {color:"white",fontWeight:"bold",color:"#ccc",marginTop:5},
    verticalListComponentPost : {color:theme.DARK_GREY_COLOR,fontSize:15,marginTop:5,fontSize:10 }
});