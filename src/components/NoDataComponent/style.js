import {StyleSheet} from 'react-native';
import theme from "../../config/theme";
export const styles = StyleSheet.create({
   noDataComponent : {marginVertical:10},
   noDataComponentCard : { borderRadius: 20 ,paddingHorizontal:0},
   noDataComponentCardItem : { borderTopLeftRadius: 20, borderTopRightRadius: 20},
   noDataComponentCardItemTitle : {marginBottom: 10,color:theme.PURPLE_COLOR,fontWeight:"bold" },
   noDataComponentCardItemDesc : { borderBottomLeftRadius: 20, borderBottomRightRadius: 20,paddingHorizontal:0}
})
