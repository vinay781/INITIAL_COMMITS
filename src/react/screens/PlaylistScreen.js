import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions,TouchableHighlight, AsyncStorage, BackHandler, Alert,Modal } from "react-native";
import { Container,Header,Content,Left,Right,Body,Title,FooterTab,Button,Icon,Text,Toast,Footer} from 'native-base';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import {Actions} from 'react-native-router-flux';
import Player from "../components/Player";
import SongQuelist from "../../container/SongsQueList";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
state = {  showToast: false };

addToFavourites = async(songid) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();   
  AsyncStorage.getItem('usertoken').then(res => {        
    var formData = new FormData();  
    formData.append("token", res );       
    formData.append("postid", songid ); 
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/addTofavourites", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    .then(response => response.json())
    .then(data => {        
      if(data.status=="ok"){     
        Alert.alert(
          '',
          data.msg,
          [{text: 'Ok', onPress: () => console.log('cancel'), style: 'cancel'}],
          { cancelable: true  }
        )
      }
      else {
        Alert.alert(
          '',
          data.msg,
          [ {text: 'Ok', onPress: () => console.log('cancel'), style: 'cancel'} ],
          { cancelable: true }
        )
      } 
    })
    .catch((error) => {               
      Toast.show({
        text: "Connection issue..",
        useNativeDriver: true,    
      })              
    });
  }); 
}
export default function PlaylistScreen(props) {
  const playbackState = usePlaybackState();  
  const { data , currentmusic } = props
  const [modalVisible, setModalVisible] = useState(false);  
 
  useEffect(() => {
    setup(data,currentmusic);    
  }, []); 
  
  async function setup(data,currentmusic) {    
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add(currentmusic);
    await TrackPlayer.add(data);
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
      ]
    });
  }
  
  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();        
    if(currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(currentmusic);
      await TrackPlayer.add(data);    
      await TrackPlayer.play();
    } 
    else  {      
      if(playbackState === TrackPlayer.STATE_PAUSED)  {        
        await TrackPlayer.play();
        await addToRecent(currentTrack);        
      }
      else {        
        await TrackPlayer.pause();
      }
    }
  }   
  
  async function shuffle(){
    const queue = await TrackPlayer.getQueue();
    const curentid = await TrackPlayer.getCurrentTrack();        
    const shuffledQueue = shuffleArray(queue);    
    await TrackPlayer.destroy();    
    await TrackPlayer.setupPlayer();   
		await TrackPlayer.add(shuffledQueue);
		await TrackPlayer.play();
  };
 const shuffleArray = (array) => {
		let currentIndex = array.length, temporaryValue, randomIndex;		
		while (0 !== currentIndex) {			
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;			
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
  };

  return (    
    <Container style={{ backgroundColor: "#0A151F"}}>
      <Header transparent>
        <Left>
          <Button transparent onPress={()=> Actions.pop() } >
            <Icon name='chevron-down' type="MaterialCommunityIcons" style={{ color :"#fff",fontSize:50 }}  />
          </Button>
        </Left>        
        <Body></Body>
        <Right> 
          <Button transparent onPress={()=> Actions.jump('songsquelist') }>
          <Icon name='playlist-music-outline' type="MaterialCommunityIcons" style={{ color :"#fff",fontSize:35 }}  />
        </Button>
        </Right>
      </Header>
      <Content>
      <View style={styles.container}>   
        <Player
          thisTrack={currentmusic}
          onNext={skipToNext}
          style={styles.player}
          onPrevious={skipToPrevious}
          onTogglePlayback={togglePlayback}
          onShuffle={shuffle}
          onFavoriteSong={()=>favouriteSong(currentmusic.id)}
          addToPlaylist={()=>songPlaylist()}          
        />        
      </View>          
      </Content>
    </Container>
  );
}
async function addToRecent(currentTrack) {  
  console.log("TRACK ID > : ", currentTrack) 
  AsyncStorage.getItem('usertoken').then(res => {        
    var formData = new FormData();  
    formData.append("token", res );       
    formData.append("postid", currentTrack ); 
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/recentplayByUser", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    .then(response => response.json())
    .then(data => {  console.log("TRACK ID > ADDED RECENT", data)  })
    .catch((error) => {               
      Toast.show({
        text: "Connection issue..",
        useNativeDriver: true,    
      })              
    })
  }) 

}
async function songPlaylist(currentTrack) {  
  await TrackPlayer.getCurrentTrack()
  Actions.jump('selectplaylist',{ trackid : currentTrack})
  
}
async function Shuffleplaylist(){
  shuffle()
}
async function favouriteSong(currentTrack) {    
  addToFavourites(currentTrack);
}

async function skipToNext() {
  try {
    await TrackPlayer.skipToNext();
  } catch (_) {}
}

async function skipToPrevious() {
  try {
    await TrackPlayer.skipToPrevious();
  } catch (_) {}
}

const styles = StyleSheet.create({
  container: {     
    height: (SCREEN_HEIGHT*100)/100,        
  },
  description: {
    width: "80%",
    marginTop: 20,
    textAlign: "center"
  },
  player: {
    // marginTop: 10
  },
  state: {
    marginTop: 20
  },
  modalOuter : { height:(SCREEN_HEIGHT*100)/100, backgroundColor : "transparent", justifyContent : "center", alignItems : "center" },
  modalInner : { 
    marginTop: (SCREEN_HEIGHT*55)/100,         
    width:(SCREEN_WIDTH*100)/100,
    height:(SCREEN_HEIGHT*45)/100, 
    alignItems:"center", 
    backgroundColor:"#fff", 
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.53,
    shadowRadius: 13.97, 
    elevation: 21 
  },   
  modalCloseButton : { width : "100%"},
  modalBody : { 
      backgroundColor:"#ccc", 
      height:"10%", width: "100%", flex: 1,
  alignItems: 'center' }, 
  // modalll
  centeredView: {
    position:"absolute",
    bottom:0,   
    width:"100%"    
  },
  modalView: {
    backgroundColor: "white",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});