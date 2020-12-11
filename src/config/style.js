import {StyleSheet, Dimensions} from 'react-native';
import theme from './theme';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    containerMain : {
        flex:1,        
        backgroundColor : theme.DEFAULT_COLOR,
        height : (SCREEN_HEIGHT * 100) / 100,  
        width  :(SCREEN_WIDTH * 100) / 100,     
        backgroundColor: 'transparent',
        justifyContent : "center",
        alignItems : "center"         
    },
    outerSignIn : {
      marginTop : (SCREEN_HEIGHT * 12) / 100
    },
    containerMainDiscover: {
      flex:1,        
      backgroundColor : theme.DEFAULT_COLOR,
      height : (SCREEN_HEIGHT * 100) / 100,  
      width  :(SCREEN_WIDTH * 100) / 100, 
  },
    containerInnerSignup : {
      width : (SCREEN_WIDTH * 80) / 100,  
      paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
      borderRadius:38,      
      backgroundColor : theme.WHITE_COLOR,
      marginTop:(SCREEN_HEIGHT * 12) / 100
    },
    containerInner : { 
        width : (SCREEN_WIDTH * 80) / 100,  
        height : (SCREEN_HEIGHT * 58) / 100,  
        paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
        borderRadius:38,      
        backgroundColor : theme.WHITE_COLOR,
        marginTop:(SCREEN_HEIGHT * 13) / 100
    },
    containerInnerSignIn : { 
      width : (SCREEN_WIDTH * 80) / 100,  
      height : (SCREEN_HEIGHT * 62) / 100,  
      paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
      borderRadius:38,      
      backgroundColor : theme.WHITE_COLOR,
      justifyContent : "flex-end"
  },
    containerInnerimg : { 
      height : (SCREEN_HEIGHT * 18) / 100,         
      alignItems:"center",
      marginTop:50,
      marginBottom:40        
    },    
    logoSignIn: {        
        width :"80%",
        height :"100%",        
        resizeMode: 'contain',
      },   
    inputItem: {
     marginBottom:15,
     height : (SCREEN_WIDTH * 12) / 100,   
    },
    
    footerSize:{
      backgroundColor:'transparent',
      borderTopWidth:0,
      height: 70,
      position:"relative"
    },
    footerIcon:{
      fontSize: (SCREEN_WIDTH * 5) / 100, 
      color: '#fff'
    },   
     bottomTextTermsConditionsSignIn : {
        flexDirection : "row",  
        height : (SCREEN_WIDTH * 20) / 100,
        justifyContent : "center",
        alignItems : "center"
      },
      bottomTextTermsConditions : {
        flexDirection : "row",  
        height : (SCREEN_WIDTH * 20) / 100,
        justifyContent : "center",
        alignItems : "center"              
      },
      buttonTermsConditions : {
        paddingRight : (SCREEN_WIDTH * 2) / 100,
        alignItems : "center",
      },      
      footerLinkText : {
        color : theme.WHITE_COLOR,
        height : 40,  
        paddingVertical : 10,
        paddingHorizontal : 6     
      },
      bottomLinks:{ 
        marginTop : 50,
        justifyContent : "center",
        alignItems:"center"
      },
      errorInput : {        
        color : "red",         
        position : "absolute",
        bottom : 0,
        left : 50        
    },

  //  MyAccount  
  containerInnerImage : {
    width : (SCREEN_WIDTH * 100) / 100,
    height : (SCREEN_HEIGHT * 20) / 100,
    paddingTop:30,
    alignItems:"center",
    justifyContent:"center"
  },
  imageEditMyAccount : {
    width : "100%",
    height : "100%",   
    borderRadius:100,
    resizeMode:'stretch',  
  },
  accountProfileImage  :{
    width : "100%",
    height : "100%", 
    borderRadius : 100
  },
imageOuterView:{
  width : (SCREEN_WIDTH * 35) / 100,
  height : (SCREEN_WIDTH * 35) / 100,
},
textTitleMyAccount : {
  width : (SCREEN_WIDTH * 100) / 100,
  height : (SCREEN_HEIGHT * 8) / 100, 
  paddingVertical :  (SCREEN_WIDTH * 5) / 100,  
},
titleMyAccount : {
    height : (SCREEN_HEIGHT * 8) / 100,
    width : (SCREEN_WIDTH * 100) / 100,
    fontWeight: "bold",
    fontSize:(SCREEN_WIDTH * 5) / 100,
    textAlign:"center",
},
inputItemMA: {
  marginBottom:15,
  height : (SCREEN_WIDTH * 15) / 100,   
 },
 textArea: {
  height: (SCREEN_WIDTH * 30) / 100,
  borderWidth: 1,
 },
 logOutButton: {
  marginHorizontal: 30,
  height : 50,
  backgroundColor:theme.DEFAULT_COLOR,
  borderRadius:20,
  marginBottom: 20,
  borderWidth : (SCREEN_WIDTH * 0.5) / 100,
  borderColor : theme.PINK_COLOR,
  justifyContent : "center"
 },
// calender
containerForm:{
  paddingHorizontal:(SCREEN_WIDTH*5)/100,
  paddingTop:15,
},
dropDownPicker : { 
  width: (SCREEN_WIDTH*80)/100,
},
inputTextra: {    
  backgroundColor:theme.WHITE_COLOR,
  borderRadius:15,
  paddingLeft : 20, 
  fontSize : 12,
  height : 100
},
inputLabel: {
  marginHorizontal:15,
  marginBottom: 8,
  fontSize : 14,
  fontWeight:"500"
},
errorInput : {        
  color : "red",         
  position : "absolute",
  bottom : 0,
  right : 12        
},
imageEditSchedule : {
  width : (SCREEN_WIDTH * 20) / 100,
  height : (SCREEN_HEIGHT * 10) / 100,        
  resizeMode: 'contain'
},
cameraItem:{
  alignItems:'flex-start'
},
submitButton: {
  marginVertical:20,
  marginHorizontal:20,
  height:50,
  backgroundColor:theme.PINK_COLOR,
  borderRadius:20
},
linkText : {
  color : theme.WHITE_COLOR,
  fontWeight : "bold",      
},
linkTextLo : {
  color : theme.PINK_COLOR,
  fontWeight : "bold",      
},
formInputs : { 
  paddingLeft : 20, 
  fontSize : 12
},

// -- calendar
calendar:{
width : (SCREEN_WIDTH * 100) / 100,
},
calendarComponent : {
width : (SCREEN_WIDTH * 100) / 100,   
paddingVertical : 0,
},
calendarInner:{
width : (SCREEN_WIDTH * 100) / 100,
},
timeInner:{
width : (SCREEN_WIDTH * 100) / 100,  
paddingHorizontal:(SCREEN_WIDTH * 10) / 100,
paddingTop: (SCREEN_HEIGHT * 2) / 100,
borderTopColor : "#ccc",
borderTopWidth : 1,  
},
timeButton:{
  borderRadius:20,
  width : (SCREEN_WIDTH * 24) / 100,
  marginLeft:(SCREEN_WIDTH * 2) / 100,
  marginBottom:(SCREEN_WIDTH * 2) / 100
},
timeButtonActive:{
  borderRadius:20,
  width : (SCREEN_WIDTH * 24) / 100,
  marginLeft:(SCREEN_WIDTH * 2) / 100,
  marginBottom:(SCREEN_WIDTH * 2) / 100,
  backgroundColor : theme.PURPLE_COLOR 
},
timeText : {
  color : "#000"
},
timeTextActive : {
  color : "#fff",
  fontWeight : "bold"
},
containerButton:{
  flexDirection:"row",
  marginVertical:(SCREEN_WIDTH * 2) / 100,
},
// --modal
maincontainerModal:{
  marginTop: (SCREEN_WIDTH*30)/100,
  marginHorizontal:(SCREEN_WIDTH*5)/100,
  width:(SCREEN_WIDTH*90)/100,
  height:(SCREEN_HEIGHT*35)/100, 
  alignItems:"center", 
  backgroundColor:theme.WHITE_COLOR,
  borderRadius:20,
  shadowColor: "#000",
shadowOffset: {
width: 0,
height: 10,
},
shadowOpacity: 0.53,
shadowRadius: 13.97,
elevation: 21,
},
containerInnerimgModal : { 
  width : "100%",  
  height : (SCREEN_HEIGHT*20)/100,         
  alignItems:"center",
  paddingVertical:5 
},    
logoSignInModal: {        
height : "100%", 
width : "100%",        
  resizeMode: 'contain',
},   
submitButtonModal: {
  marginVertical:5,
  backgroundColor:theme.PINK_COLOR,
  borderRadius:50,
  marginHorizontal:"20%"  
 },
 linkTextModal: {
  color : theme.WHITE_COLOR,
  fontWeight : "bold",      
},
containerInnerForgotPassword : { 
  width : (SCREEN_WIDTH * 80) / 100,  
  height : (SCREEN_HEIGHT * 58) / 100,  
  paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
  borderRadius:38,      
  backgroundColor : theme.WHITE_COLOR,
},

//===============change password =============//
containerInnerchangePassword : { 
  width : (SCREEN_WIDTH * 80) / 100,  
  height : (SCREEN_HEIGHT *70) / 100,  
  paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
  borderRadius:38,      
  backgroundColor : theme.WHITE_COLOR,
},
changePasswordButton:{
  height:45,
  marginHorizontal:20,
  backgroundColor:theme.PINK_COLOR,
  borderRadius:20
},
cancelChangePasswordButton:{
  height:45,
  marginTop:"5%",
  marginHorizontal:20,
  backgroundColor:theme.WHITE_COLOR,
  borderRadius:20,
  borderWidth:(SCREEN_WIDTH*0.5)/100,
  borderColor:theme.PINK_COLOR
},
homeSliderHeader : { height : 25, marginTop : 5 },
sliderHeaderLeft : { height : 25},
homeSeeAllButton : { color:"#ccc",fontWeight:"600",fontSize:(SCREEN_WIDTH*2)/100},

/* FullView */
imageOuterViewAlbums:{
  width : (SCREEN_WIDTH * 45) / 100,
  height : (SCREEN_WIDTH * 45) / 100
},
AlubmsImage :{
  width :  "100%",
  height :  "100%",
  //resizeMode: 'cover'
  borderRadius : 8
},
containerInnerImageAlbums : {
  width : (SCREEN_WIDTH  *112) / 100,
  height : (SCREEN_HEIGHT *52) / 100,
  paddingTop:25,
  alignItems:"center",
  justifyContent:"center",
},
textTitleAlbums : {
  width : (SCREEN_WIDTH  *100) / 100,
  paddingVertical : 10
},
titleAlbums : {
  fontWeight: "bold",
  fontSize:22,
  color:"white",
  textAlign:"center"
},
titleAlbumsviews:{
  marginVertical:7,
  fontWeight: "bold",
  fontSize:(SCREEN_WIDTH * 4) / 100,
  color:theme.DARK_GREY_COLOR,
  textAlign:"center"
}

});