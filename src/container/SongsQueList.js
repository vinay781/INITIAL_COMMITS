import React, { useState, useEffect } from 'react';
import { Platform, TouchableHighlight, Alert,FlatList ,Dimensions} from 'react-native';
import { View, ListItem, Thumbnail, Text,Title, Left, Body, Right, Button,Icon, Container,Content,Header } from 'native-base';
import TrackPlayer, { usePlaybackState,useTrackPlayerProgress } from 'react-native-track-player'
import { Actions } from "react-native-router-flux";
import {styles} from '../config/style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default function SongQuelist(props) {
  const playbackState = usePlaybackState(); 
  const [trackId, setTrackId] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackUrl, setTrackUrl] = useState();
  const [trackPurchasable, setTrackPurchasable] = useState();
  const [trackPlayble, setTrackPlayble] = useState();
  const [Queuelist, getQueuelist] = useState();
  const [popupVisible, setpopupVisible] = useState(false);  
  
    useEffect(() => {
      setup();
    }, []); 

    setTimeout(() => {
      setup();
    }, 1)  

    async function setup() {
      const currentTrack = await TrackPlayer.getCurrentTrack();      
      const getque = await TrackPlayer.getQueue();      
      console.log("que",getque)
      getQueuelist(getque)
      const currentstate = await TrackPlayer.getTrack(currentTrack);    
    }

  return ( 
    <Container style={styles.containerMainDiscover} >
    <Header transparent>
      <Left>
        <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
            <Icon name='arrow-back' style={{ color :"#fff" }}  />
        </Button>
        </Left>
      <Body>
        <Title style={{color:"#fff",paddingRight: (SCREEN_WIDTH * 10)/100  }}> QueueList </Title>
      </Body>
      <Right>       
      </Right>
    </Header>
    <Content style={{backgroundColor:'#0A151F',paddingHorizontal: 15}} >
      <FlatList 
        data={Queuelist}
        renderItem={({ item ,index}) =>
        <View  style={{paddingHorizontal:20}}>
        <ListItem thumbnail  >              
          <Left>
            <TouchableHighlight activeOpacity={0.6} onPress={()=> {Actions.jump('playlistscreen',{ data : Queuelist , currentmusic:{"id":item.id, "url":item.url, "artwork":item.artwork, "artist":item.artist, "title":item.title, "isPurchasable":item.isPurchasable }}),Actions.refresh({key:"playlistscreen"})}}>
                <Text style={{color:"white"}}>{index+1}.</Text>
            </TouchableHighlight>
          </Left>
          <Body>
            <TouchableHighlight activeOpacity={0.6} onPress={()=> {Actions.jump('playlistscreen',{ data : Queuelist , currentmusic:{"id":item.id, "url":item.url, "artwork":item.artwork, "artist":item.artist, "title":item.title, "isPurchasable":item.isPurchasable  }}),Actions.refresh({key:"playlistscreen"})}}>
              <View>
                <Text numberOfLines={1} style={{color:"white",fontWeight:'bold'}}>{item.title}</Text>
                <Text note style={{fontWeight:'bold'}}>{item.artist}</Text>
              </View>
            </TouchableHighlight>          
          </Body>      
          <Right>             
            <View style={{flexDirection:"row-reverse",}}>            
            </View> 
          </Right>
        </ListItem>      
      </View>                                     
        }
        keyExtractor={(item, index) => { return item.id.toString() }}                    
      />
 </Content>
</Container>       
  );
}