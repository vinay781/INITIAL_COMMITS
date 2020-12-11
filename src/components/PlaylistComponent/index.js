import React, { Component } from 'react';
import {AsyncStorage,TouchableHighlight,Alert} from 'react-native';
import {Icon,ListItem,Thumbnail,Text,Left,Body,Right,Button,View } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from "./style";
export default class PlaylistComponent extends Component {

  removePlaylist(id, userid){
    AsyncStorage.getItem('usertoken').then(res => {         
      var formData = new FormData();    
      formData.append("token", res );      
      formData.append("playlist_id", id ); 
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/removePlaylistByuser", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => { 
        if(data.status=="ok") {         
          Actions.pop();           
          Alert.alert(
            "Success",
            "Playlist Removed",
            [{
              text: "OK",
              style: "cancel",
              onPress: () =>  Actions.jump('myplaylists')
              },                  
            ],
            { cancelable: true }
          )
        }       
      })
      .catch((error) => { console.log("removePlaylist ERROR : ", error);  });
    }); 
    
  }
  renderDate(post_date)  {
    var d = new Date(post_date);    
    var date = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    return month + '/' + date + '/' + d.getFullYear();
  }

  render() {
    const { post_id, post_userid, post_title, post_date,post_image } = this.props
    return (      
      <View style={styles.playlistComponentOuter}>
        <ListItem thumbnail noBorder >              
        <Left>
         { post_image?<Thumbnail square source={{uri:post_image}} style={styles.playlistComponentLeftImage} />:
          <Thumbnail square source={require("../../assets/images/playlist.png")} style={styles.playlistComponentLeftImage} />}
        </Left>
        <Body>
          <TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('myplaylistsong',{ playlistid : post_id })}>
            <View>
              <Text style={styles.playlistComponentTitle}>{post_title}</Text>
              <Text note numberOfLines={1} style={styles.playlistComponentDate}>{this.renderDate(post_date)}</Text>
            </View>
          </TouchableHighlight>
        </Body>        
        <Right>          
          <Button transparent                 
            onPress={()=>  Alert.alert(
              'Are You Sure?',
              'Remove '+post_title, [{
                  text: 'No',
                  onPress: () => { console.log('Cancel Pressed') },
                  style: 'cancel'
              }, {
                  text: 'Yes',
                  onPress: () => {this.removePlaylist(post_id,post_userid)}
              }, ], { cancelable: false }
            ) } 
          >
            <Icon name='trash' type="FontAwesome" style={styles.playlistComponentRightIcon}  />
          </Button>  
        </Right>
      </ListItem>
      </View>     
    );
  }
}