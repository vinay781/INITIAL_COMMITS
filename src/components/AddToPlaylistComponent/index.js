import React, { Component } from 'react';
import {AsyncStorage,TouchableHighlight,Alert} from 'react-native';
import { Icon, ListItem, Thumbnail, Text, Left, Body, Right, Button, View, Toast } from 'native-base';
import {styles} from './style';
const PLAYLIST_LOGO = require("../../assets/images/playlist.png");
export default class AddToPlaylistComponent extends Component {
  addToPlaylist(playlistid, trackid){    
    AsyncStorage.getItem('usertoken').then(res => {          
      var formData = new FormData();  
      formData.append("token", res );     
      formData.append("playlist_id", playlistid ); 
      formData.append("postid", trackid ); 
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/addToplaylists", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {         
        if(data.status=="ok") {          
          this.renderAlert(data.msg)
        } else {
          this.renderAlert(data.msg)
        }      
      })
      .catch((error) => {                 
        Toast.show({ text: "Connection issue.."  })                 
      });
    });     
  }

  confirmPlaylist(post_id,post_title,post_trackid){
    Alert.alert(
      'Sure to add song in',
      post_title + '?',
      [
        {text: 'Yes', onPress: () => this.addToPlaylist(post_id,post_trackid)},
        {text: 'No', onPress: () => console.log('cancel'), style: 'cancel'},
      ],
      { cancelable: true  }
    )
  }

  renderAlert(message){
    Alert.alert(
      '',
      message,
      [              
        {text: 'Ok', onPress: () => console.log('cancel'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    )
  }  

  render() {
    const { post_id,post_title,post_date, post_trackid } = this.props
    return (      
    <View style={styles.addToPlaylistOuter}>
        <ListItem thumbnail noBorder >              
        <Left>
          <Thumbnail square source={PLAYLIST_LOGO} style={styles.addToPlaylistLeft} />
        </Left>
        <Body>
          <TouchableHighlight activeOpacity={0.6} onPress={()=> this.confirmPlaylist(post_id,post_title,post_trackid)} >
            <View>
              <Text style={styles.addToPlaylistTitle}>{post_title}</Text>
              <Text note numberOfLines={1} style={styles.addToPlaylistDate}>{post_date}</Text>
            </View>
          </TouchableHighlight>
        </Body>        
        <Right>                
          <Button transparent onPress={()=> this.confirmPlaylist(post_id,post_title,post_trackid)} >
            <Icon name='add-to-list' type="Entypo" style={styles.addToPlaylistIcon}  />
          </Button>  
        </Right>
      </ListItem>
    </View>       
    );
  }
}