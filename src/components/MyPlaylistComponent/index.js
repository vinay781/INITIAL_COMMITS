import React, { Component } from 'react';
import {AsyncStorage,TouchableHighlight,Alert} from 'react-native';
import {Icon,ListItem,Thumbnail,Text,Left,Body,Right,View} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from './style';
export default class MyPlaylistComponent extends Component {
 
  removeFomPlaylist(songid,playlistid){    
    AsyncStorage.getItem('usertoken').then(res => {   
    var formData = new FormData();    
    formData.append("token", res);      
    formData.append("postid", songid); 
    formData.append("playlist_id", playlistid); 
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/removeSongsfromPlaylists", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    .then(response => response.json())
    .then(data => {       
      if(data.status=="ok")  {          
        Actions.pop();           
        Alert.alert(
          "Success",
          "Song Removed from Playlist",
          [{
            text: "OK",
            style: "cancel"
            },                  
          ],
          { cancelable: true }
        )
      }       
    })
    .catch((error) => { console.log("removeFomPlaylist ERROR : ", error);  });
    });
  }

  render() {
  const {post_image,post_title,artist,music,post_id,post_file, post_playlist,post_isPurchasable} = this.props    
  return (  
    <View key={post_id} style={styles.myPlaylistComponentOuter}>
      <ListItem thumbnail noBorder >              
        <Left>
          <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title, "isPurchasable":post_isPurchasable }})}>
            <Thumbnail  square source={{ uri:post_image }} style={styles.myPlaylistComponentLeftImage} />
          </TouchableHighlight>
        </Left>
        <Body>
          <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title, "isPurchasable":post_isPurchasable }})}>
            <View>
              <Text style={styles.myPlaylistComponentBodyTitle}>{post_title}</Text>
              <Text note numberOfLines={1} style={styles.myPlaylistComponentBodyArtist}>{artist}</Text>
            </View>
          </TouchableHighlight>
        </Body>      
        <Right>             
          <View style={styles.myPlaylistComponentRight}>
            <Icon name='playlist-remove' type="MaterialCommunityIcons" style={styles.myPlaylistComponentRightIcon} onPress={()=> Alert.alert(
              'Are You Sure?',
              'Remove '+post_title+' from Playlist', 
              [{
                  text: 'No',
                  onPress: () => {console.log('Cancel Pressed')},
                  style: 'cancel'
              }, {
                  text: 'Yes',
                  onPress: () => {this.removeFomPlaylist(post_id,post_playlist)}
              }], {  cancelable: false }
            ) } />            
          </View> 
        </Right>
      </ListItem>      
    </View>     
    );
  }
}