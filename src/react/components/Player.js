import React, { useState, useEffect } from "react";
import { Image,StyleSheet,Text,TouchableHighlight,TouchableOpacity,Modal,View,Slider, ViewPropTypes,Dimensions,Alert, AsyncStorage} from "react-native";
import { Icon, Thumbnail,Toast,Button} from 'native-base';
import TrackPlayer, { useTrackPlayerProgress, usePlaybackState, useTrackPlayerEvents, seekTo } from "react-native-track-player";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import CircularProgress from "../../components/CircularProgress";
import theme from "../../config/theme";
import { formatTime } from '../../config/helper';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function ProgressBar() {
  const progress = useTrackPlayerProgress();
  return (
    <View style={{     
      width: "75%",
      marginVertical: 20,
      flexDirection: "row",
      borderRadius:50,      
      justifyContent:"center"
    }}>
      <Text note style={{ color:"#fff", fontSize:10}}>{formatTime(progress.position)}</Text>
       <Slider style={{width:"100%"}} value={progress.position} maximumValue={progress.duration} onValueChange={(value)=>{TrackPlayer.seekTo(value)}} minimumTrackTintColor="#03a9f4" thumbTintColor="#03a9f4" maximumTrackTintColor={theme.PINK_COLOR}/>    
      <Text note style={{ color:"#fff", fontSize:10}}>{formatTime(progress.duration)}</Text>
    </View>    
  );
}
function ModalBar(props) {
  const progress = useTrackPlayerProgress();
  const {trackArtwork,trackTitle,trackArtist,trackPurchasable}=props
  const [modalVisible2, setModalVisible2] = useState(false);
  const [popupVisible2, setpopupVisible2] = useState(false)
  const [isChecked2, setIsChecked2] = useState(true)
  if(progress.position>=15 && trackPurchasable === 'true'){    
     if(isChecked2){
       setModalVisible2(true)
       setIsChecked2(false)
       TrackPlayer.seekTo(0)
       progress.position=0
       TrackPlayer.pause()
     }   
  }
  
  return (
    <View >
       <Modal
        animationType="slide"
        transparent={true}        
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{borderBottomWidth:1,width:"100%",flexDirection:"row",justifyContent:"space-between", alignContent:"center"}}>
              <Text note style={{textAlign:"left",paddingLeft:20,fontSize:20,fontWeight:"500"}}>Preview Song</Text>              
              <Icon name='close' type="MaterialCommunityIcons" onPress={() => { setModalVisible2(!modalVisible2),setIsChecked2(true)}} style={{ paddingRight:20}} />              
            </View>
            <View style={{flexDirection:"row",padding:15,paddingHorizontal:20,justifyContent:"space-between",}}>
              <View>
              <Thumbnail square source={{ uri: trackArtwork }} />
              </View>
              <View style={{ width:"65%", paddingHorizontal : 5}}>
              <Text >{trackTitle}</Text>
              <Text note numberOfLines={1}>{trackArtist}</Text>
              </View>               
            </View>
            <Text note style={{margin:10 }}>Want to Download or Listen to full Song? </Text>
            <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }} 
            onPress={()=>{Actions.jump('ourplans'),setModalVisible2(!modalVisible2),setIsChecked2(true)}}
            >
              <Text style={styles.textStyle}> Get Tunit Plus or Premium Now </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>  
    </View>
  );
}



function ControlButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

closePopup = async () => {
  await TrackPlayer.stop();  
}

export default function Player(props) {
  const progress = useTrackPlayerProgress();
  const { thisTrack } = props;  
  console.log("ISPurchasable>> ", thisTrack.isPurchasable)
  const playbackState = usePlaybackState();
  const [trackId, setTrackId] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState("");
  const [trackPurchasable, setTrackPurchasable] = useState(thisTrack.isPurchasable);
  const [isEnabled, setIsEnabled] = useState(false); 
  const [isChecked, setIsChecked] = useState(true); 
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [popupVisible, setpopupVisible] = useState(false);  
  const [isRepeat, setIsRepeat] = useState(true); 
  const [isRepeatMode, setIsRepeatMode] = useState(""); 

  if(isRepeat){        
    if(isRepeatMode==1){      
      Toast.show({
        text: "Repeat one",    
        textStyle : { color : "#000", textAlign : "center" },    
        duration: 3000,
        useNativeDriver: true,
        style: {  backgroundColor : "#fff" }     
      })    
      setIsRepeatMode(2)
    } else if( isRepeatMode == 2){    
      Toast.show({
        text: "Repeat All",    
        textStyle : { color : "#000", textAlign : "center" },    
        duration: 3000,
        useNativeDriver: true,
        style: {  backgroundColor : "#fff" }     
      })
      setIsRepeatMode("")
    } else {        
      setIsRepeatMode(1)      
    }     
    setIsRepeat(false); 
  }

  useTrackPlayerEvents(["playback-track-changed"], async event => {   
    setpopupVisible(true)
    if(event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      if(isRepeatMode == ""){
        const track = await TrackPlayer.getTrack(event.nextTrack);        
        const { id, title, artist, artwork } = track || {};
        setTrackId(id);
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);      
        setTrackPurchasable(isPurchasable);      
        trackChange(id);
      }
      else if(isRepeatMode == 1){
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const { id, title, artist, artwork } = track || {};
        setTrackId(id);
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);  
        setTrackPurchasable(isPurchasable);          
        trackChange(id);
      }
      else if(isRepeatMode == 2){
        setTrackId(trackId);
        setTrackTitle(trackTitle);
        setTrackArtist(trackArtist);
        setTrackArtwork(trackArtwork);   
        setTrackPurchasable(isPurchasable);         
        trackChange(trackId);
      }      
    }
  });

  const { style, onNext, onPrevious, onTogglePlayback, onFavoriteSong, addToPlaylist, onReset,onShuffle } = props;
 
  var prevButtonText =  <Icon name='banckward' type="AntDesign" style={{ color :"#03a9f4",fontSize:30 }}  />;
  var nextButtonText =  <Icon name='forward' type="AntDesign" style={{ color :"#03a9f4" ,fontSize:30}}  />;
  var middleButtonText =  <Icon name='play' type="AntDesign" style={{ color :"#03a9f4" ,fontSize:60}}  />;

  if(playbackState === TrackPlayer.STATE_PLAYING || playbackState === TrackPlayer.STATE_BUFFERING) {
    middleButtonText = <Icon name='pause' type="FontAwesome" style={{ color :"#03a9f4" ,fontSize:60 }}  />;
  }

  if(isChecked){
    AsyncStorage.getItem('usertoken').then(res => {          
      var formData = new FormData();       
      formData.append("token", res ); 
      formData.append("postid", thisTrack.id );
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/checkfavouriteByuser", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {               
        if(data.isfavorite=="1")
        {
          setIsEnabled(true);    
        }     
        else{
          setIsEnabled(false);    
        }    
        setIsChecked(false); 
      })    
    }); 
  }
  const toggleSwitch = async () => {   
    await AsyncStorage.getItem('usertoken').then(res => {        
      var formData = new FormData();    
      formData.append("token", res );       
      formData.append("postid", trackId );   
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/updatefavourites", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {          
        if(data.isfavourite == "1")
        {
          setIsEnabled(true);
          Alert.alert(
            "",
            data.msg,
            [{
              text: "OK",
              style: "cancel",               
              }                 
            ],
            { cancelable: true }
          )           
        }
        if(data.isfavourite == "0")
        {
          setIsEnabled(false);
          Alert.alert(
            "",
            data.msg,
            [{
              text: "OK",
              style: "cancel",               
              }                 
            ],
            { cancelable: true }
          )   
        }         
      })    
    });    
  }
  trackChange = async (id) => {       
    AsyncStorage.getItem('usertoken').then(res => {          
      var formData = new FormData();       
      formData.append("token", res ); 
      formData.append("postid", id );
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/checkfavouriteByuser", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {     
        if(data.isfavorite=="1"){         
          setIsEnabled(true);              
        } else {         
          setIsEnabled(false);              
        }     
      })    
    }); 
  }
  const { position, duration } = useTrackPlayerProgress()
  
  return (
    <View style={[styles.card, style]}>
      <View style={{ paddingTop : 15, paddingBottom : 15}}>
        <Image style={styles.cover} source={{ uri: trackArtwork }} />     
      </View>
      <Text style={styles.title}>{trackTitle}</Text>
      <Text style={styles.artist}>{trackArtist}</Text>       
       <View style={{flexDirection:"row",justifyContent:"space-between",width:"75%",marginVertical:10}}>  
        <TouchableOpacity onPress={toggleSwitch}>
          { isEnabled ? <Icon name='favorite' type="MaterialIcons" style={{ color :"#fff",fontSize: (SCREEN_HEIGHT*3)/100}}  /> : <Icon name='favorite-border' type="MaterialIcons" style={{ color :"#fff",fontSize:  (SCREEN_HEIGHT*3)/100}}  /> }
        </TouchableOpacity>                          
        <Icon name='arrow-collapse-down' type="MaterialCommunityIcons" style={{ color :"#fff",fontSize:  (SCREEN_HEIGHT*3)/100}} onPress={() => {
          setModalVisible(true);
        }} />
        <Icon name='playlist-add' type="MaterialIcons"  style={{ color :"#fff",fontSize:  (SCREEN_HEIGHT*3)/100}} onPress={addToPlaylist} />
        { isRepeatMode=="" && <Icon name='repeat' type="MaterialCommunityIcons" onPress={()=>setIsRepeat(true)} style={{ color :"#fff",fontSize:  (SCREEN_HEIGHT*3)/100}}  />}
        { isRepeatMode==1 && <Icon name='repeat-off' type="MaterialCommunityIcons" onPress={()=>setIsRepeat(true)} style={{ color :"#fff",fontSize:  (SCREEN_HEIGHT*3)/100}}  />}
        { isRepeatMode==2 && <Icon name='repeat-once' type="MaterialCommunityIcons" onPress={()=>setIsRepeat(true)} style={{ color :"#fff",fontSize:  (SCREEN_HEIGHT*3)/100}}  />}
        
      </View> 
      <ProgressBar />
      <View style={styles.controls}>
        <Icon onPress={onShuffle} name='shuffle' type="Entypo" style={{ color :"#fff",fontSize: 25, paddingTop : 20}}  />        
        <ControlButton title={prevButtonText} onPress={onPrevious} />        
        <ControlButton title={middleButtonText} onPress={() => {setpopupVisible(true); onTogglePlayback();}} />
        <ControlButton title={nextButtonText} onPress={onNext} />        
        <Icon onPress={()=> {setModalVisible3(true),TrackPlayer.pause()} } name='dots-three-horizontal' type="Entypo" style={{ color :"#fff",fontSize:30, paddingTop : 20}}  />        
      </View>  

      <ModalBar trackArtwork={trackArtwork} trackTitle={trackTitle} trackArtist={trackArtist} trackPurchasable={trackPurchasable} />
      <View>
      <Modal
        animationType="slide"
        transparent={true}        
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{borderBottomWidth:1,width:"100%",flexDirection:"row",justifyContent:"space-between", alignContent:"center"}}>
              <Text note style={{textAlign:"left",paddingLeft:20,fontSize:20,fontWeight:"500"}}>Preview Song</Text>              
              <Icon name='close' type="MaterialCommunityIcons" onPress={() => { setModalVisible(!modalVisible)}} style={{ paddingRight:20}} />              
            </View>
            <View style={{flexDirection:"row",padding:15,paddingHorizontal:20,justifyContent:"space-between",}}>
              <View>
              <Thumbnail square source={{ uri: trackArtwork }} />
              </View>
              <View style={{ width:"65%", paddingHorizontal : 5}}>
              <Text >{trackTitle}</Text>
              <Text note numberOfLines={1}>{trackArtist}</Text>
              </View> 
              <CircularProgress percent={duration.position} />                      
            </View>
            <Text note style={{margin:10 }}>Want to Download or Listen to full Song? </Text>
            <TouchableHighlight 
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }} 
            onPress={()=>{Actions.jump('ourplans'),setModalVisible(!modalVisible),setpopupVisible(false)}}
            >
              <Text style={styles.textStyle}> Get Tunit Plus or Premium Now </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>  
      </View> 
      <View>
      <Modal
        animationType="slide"
        transparent={true}        
        visible={modalVisible3}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible3(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={{
              backgroundColor: "#2d3640",
              borderRadius: 20,
              paddingBottom:10,
              paddingTop:10,
              width:"100%",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5
            }}>
            <View style={{borderBottomWidth:1,width:"100%",flexDirection:"row",justifyContent:"space-between", alignContent:"center"}}>
            <View style={{flexDirection:"row",padding:15,paddingHorizontal:20,justifyContent:"space-between",}}>
              <View>
              <Thumbnail square source={{ uri: trackArtwork }} />
              </View>
              <View style={{ width:"65%",}}>
              <Text numberOfLines={2} >{trackTitle}</Text>
              <Text note numberOfLines={1}>{trackArtist}</Text>
              </View>               
            </View>            
            <Icon name='close' type="MaterialCommunityIcons" onPress={() => { setModalVisible3(!modalVisible3),TrackPlayer.play()}} style={{ paddingRight:20}} />              
            </View>
            <View style={{flexDirection:"column",width:"100%", padding:15,paddingHorizontal:20,justifyContent:"flex-start",}}>           
            <Button iconLeft transparent onPress={toggleSwitch}>
            { isEnabled ? <Icon name='favorite' type="MaterialIcons" style={{ color :"#5c5c5c",fontSize: 20}}  /> : <Icon name='favorite-border' type="MaterialIcons" style={{ color :"#5c5c5c",fontSize: 20}}  /> }
            { isEnabled ? <Text style={{marginHorizontal:15,color:"#5c5c5c",fontWeight:"bold"}}>Unlike</Text> : <Text style={{marginHorizontal:15,color:"#5c5c5c",fontWeight:"bold"}}>Like</Text>}
            </Button>
            <Button iconLeft transparent onPress={addToPlaylist} >
            <Icon name='playlist-add' type="MaterialIcons" style={{color:"#5c5c5c"}} />
            <Text style={{marginHorizontal:15,color:"#5c5c5c",fontWeight:"bold"}}>Add To Playlist</Text>
            </Button>
            <Button iconLeft transparent>
            <Icon   name='arrow-collapse-down' type="MaterialCommunityIcons" style={{color:"#5c5c5c"}} />
            <Text style={{marginHorizontal:15,color:"#5c5c5c",fontWeight:"bold"}}>Download</Text>
            </Button>            
            </View>            
          </View>
        </View>
      </Modal>  
      </View>      
    </View>    
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired
};

Player.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  card: {
    height:"100%",
    width: "100%",    
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: "center",
    shadowColor: "black",    
    backgroundColor: theme.DEFAULT_COLOR,
    shadowOffset: { width: 0, height: 1 },
    // justifyContent : "space-between"
  },
  cover: {
    height :(SCREEN_WIDTH * 85) / 100 ,
    width:(SCREEN_WIDTH * 85) / 100,
    marginTop: 1,
    backgroundColor: "grey",
    borderRadius:20
  },
  progress: {
    height: 10,
    width: "80%",
    marginVertical: 20,
    flexDirection: "row",
    borderRadius:50
  },
  title: {
    marginTop: 20,
    color:"white",
    fontWeight:"800",
    fontSize:19,
    textAlign:"center",
  },
  artist: {
    marginTop: 5,
    marginBottom:20,
    color:"white",
    fontWeight:"800",
    fontSize:16,
    textAlign:"center",
  },
  controls: {    
    marginHorizontal:20,
    flexDirection: "row",
    alignItems:"center",
    justifyContent : "center"
  },
  controlButtonContainer: {
    flex: 1
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalView: {
    backgroundColor: "#2d3640",
    borderRadius: 20,
    paddingBottom:10,
    paddingTop:10,
    width:"100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    margin:10,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText:{
    marginBottom: 15,
    textAlign: "center"
  },
  centeredView:{
    position:"absolute",
    bottom:0,   
    width:"100%"    
  },
});