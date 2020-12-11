import React, { Component } from 'react';
import {AsyncStorage,TouchableHighlight,Alert} from 'react-native';
import {Icon,ListItem,Thumbnail,Text,Left,Body,Right,Button,View} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from "./style";
export default class FavListComponent extends Component {  
  render() {
    const {post_image,post_title,artist,music,post_id,post_file,post_isPurchasable} = this.props
    return (      
    <View style={styles.favListComponentOuter}>
      <ListItem thumbnail noBorder >              
      <Left>
        <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title, "isPurchasable":post_isPurchasable }})}>
          <Thumbnail  square source={{ uri:post_image }} style={styles.favListComponentLeftImage} />
        </TouchableHighlight>
      </Left>
      <Body>
        <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title, "isPurchasable":post_isPurchasable }})}>
          <View>
            <Text numberOfLines={1} style={styles.favListComponentBodyTitle}>{post_title}</Text>
            <Text note numberOfLines={1} style={styles.favListComponentBodyArtist}>{artist}</Text>
          </View>
        </TouchableHighlight>
      </Body>              
      <Right></Right>
    </ListItem>
    </View>  
    );
  }
}