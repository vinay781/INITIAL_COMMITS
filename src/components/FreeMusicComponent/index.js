import React, { Component } from 'react';
import {TouchableHighlight} from 'react-native';
import {ListItem, Thumbnail,Text,Left,Body,Right,View} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from "./style";
export default class FreeMusicComponent extends Component {
  render() {
  const {post_image,post_title,artist,music,post_id,post_file,post_isPurchasable} = this.props
  return (
    <View style={styles.freeMusicComponentOuter}>
      <ListItem thumbnail noBorder >              
        <Left>
          <TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title, "isPurchasable":post_isPurchasable }})}>
            <Thumbnail  square source={{ uri:post_image }} style={styles.freeMusicComponentLeftImage} />
          </TouchableHighlight>
        </Left>
        <Body>
          <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title, "isPurchasable":post_isPurchasable }})}>
            <View>
              <Text style={styles.freeMusicComponentTitle}>{post_title}</Text>
              <Text note numberOfLines={1} style={styles.freeMusicComponentArtist}>{artist}</Text>
            </View>
          </TouchableHighlight>
        </Body>        
        <Right></Right>
      </ListItem>
    </View> 
    );
  }
}