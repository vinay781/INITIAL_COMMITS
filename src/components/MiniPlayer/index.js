import React, { useState, useEffect } from 'react';
import { Platform, TouchableHighlight, Alert } from 'react-native';
import { View, ListItem, Thumbnail, Text, Left, Body, Right, Button,Icon } from 'native-base';
import TrackPlayer, { usePlaybackState,useTrackPlayerProgress } from 'react-native-track-player'
import { Actions } from "react-native-router-flux";
import {styles} from './style';
import theme from '../../config/theme';

export default function MiniPlayer(props) {
  
  const playbackState = usePlaybackState(); 
  const [trackId, setTrackId] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackUrl, setTrackUrl] = useState();
  const [trackPurchasable, setTrackPurchasable] = useState();
  const [trackPlayble, setTrackPlayble] = useState();
  const [trackShow, setTrackShow] = useState();
  const [popupVisible, setpopupVisible] = useState(false);  
  const [minimizeTrack,setminimizeTrack] = useState(true); 
  
    useEffect(() => {
      setup();
    }, []); 

    setTimeout(() => {
      setup();
    }, 1)  

    async function setup() {
      const currentTrack = await TrackPlayer.getCurrentTrack();      
      const currentstate = await TrackPlayer.getTrack(currentTrack);    
      if(currentstate==null) {
        setTrackShow(false)
      }
      else {
        setTrackShow(true)
      }
      setTrackId(currentstate.id)
      setTrackArtwork(currentstate.artwork)
      setTrackTitle(currentstate.title)
      setTrackArtist(currentstate.artist)
      setTrackUrl(currentstate.url)
      setTrackPurchasable(currentstate.isPurchasable)
      setTrackPlayble(playbackState)
  }

  async function togglePlayback() {
    setpopupVisible(true)
    const currentTrack = await TrackPlayer.getCurrentTrack();        
    const currentstate = await TrackPlayer.getTrack(currentTrack);    
    setTrackId(currentstate.id)
    setTrackArtwork(currentstate.artwork)
    setTrackTitle(currentstate.title)
    setTrackArtist(currentstate.artist)
    setTrackUrl(currentstate.url)
    setTrackPurchasable(currentstate.isPurchasable)
    if(playbackState === TrackPlayer.STATE_PAUSED) {        
      await TrackPlayer.play();
    } else {       
      await TrackPlayer.pause();
    }    
  }
  
  if(popupVisible){     
    if((trackPurchasable == "false") || (trackPurchasable == false) ){
      const timer = setTimeout( async () => {        
        await TrackPlayer.pause()
        await TrackPlayer.seekTo(0)
        for(var i = 1; i < timer; i++){
          clearTimeout(timer)
        }        
        setpopupVisible(false)
        Alert.alert(
          "Want to Download or Listen to full Song?",
          "Get Tunit Plus or Premium Now",
          [{
            text: "Yes",
            style: "cancel", 
            onPress: () => Actions.jump('ourplans')
            },
            {
              text: "No",
              style: "cancel"              
            }                 
          ],
          { cancelable: true }
        ) 
      }, 15000)  
    }
    setpopupVisible(false)
  }
 
  async function miniTrackhHide(){
    setminimizeTrack(false)
  }

  return ( 
      <View>
       {minimizeTrack &&  <View>
        {trackShow && 
        <View style={styles.miniPlayerOuter}>                   
          <View style={styles.miniPlayerList} >
          <Left style={{ maxWidth : 80, justifyContent : "center", alignItems : "center"}}>        
            <Thumbnail square source={{ uri: trackArtwork }} style={styles.miniPlayerImage} />          
          </Left>
          <Body style={styles.miniPlayerBody} >
          <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : [] , currentmusic:{"id":trackId, "url":trackUrl, "artwork":trackArtwork, "artist":trackArtist, "title":trackTitle, "isPurchasable":trackPurchasable }})}>
            <View>
              <Text numberOfLines={1} style={styles.miniPlayerTitle}>{trackTitle}</Text>
              <Text note numberOfLines={1} style={styles.miniPlayerArtist}>{trackArtist}</Text>
            </View>
          </TouchableHighlight>
          </Body>
          {Platform.OS === 'ios' && 
          <Right>                
          { playbackState == "paused"  && <Button transparent onPress={togglePlayback}>
          <Icon name='play' type="AntDesign" style={styles.miniPlayerButton}  />  
            </Button>}
          { playbackState == "playing" && <Button transparent onPress={togglePlayback}>
          <Icon name='pause' type="AntDesign" style={styles.miniPlayerButton}  /> 
            </Button>}
          </Right>
          }
          {Platform.OS === 'android' && 
          <Right>    
            <View style={{flexDirection:"row"}}>
           <Button transparent onPress={miniTrackhHide}>
                <Icon name='close' type="AntDesign" style={{ color :theme.DEFAULT_COLOR ,fontSize:20 }}  />  
          </Button>
          { playbackState == 2  && <Button transparent onPress={togglePlayback}>              
            <Icon name='play' type="AntDesign" style={styles.miniPlayerButton}  />  
          </Button>}
          { (playbackState == 3) && <Button transparent onPress={togglePlayback}>
            <Icon name='pause' type="AntDesign" style={styles.miniPlayerButton}  /> 
          </Button>}
          </View> 
          </Right>
          }   
          </View>             
        <ProgressBar trackPurchasable={trackPurchasable} />
      </View>      
      }    
      </View>  }
     </View>  
    );
  }
  function ProgressBar(props) {
    const progress = useTrackPlayerProgress();  
    const { trackPurchasable }=props
    if(progress.position>=15 && trackPurchasable === 'true'){
      console.log("modal after duration modal mini",progress.position)
      TrackPlayer.seekTo(0)
      progress.position=0
      TrackPlayer.pause()
    }   
    return (
      <View style={{ height: 0.5, width: "100%", flexDirection: "row", borderRadius:50, position : "absolute", bottom : 0}}>
        <View style={{ flex: progress.position, backgroundColor: "white"}} />
        <View
          style={{
            flex: progress.duration - progress.position,
            backgroundColor:"#112330"
          }}
        />
      </View>
    );
  }