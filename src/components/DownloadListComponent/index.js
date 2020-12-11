import React, { Component } from 'react';
import {TouchableHighlight} from 'react-native';
import {Icon,ListItem,Thumbnail,Text,Left,Body,Right,View } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from "./style";
export default class DownloadListComponent extends Component {
  render() {
    const {post_image,post_title,artist,music,post_id,post_file} = this.props
    return (      
      <View style={styles.downloadListComponentOuter}>
          <ListItem thumbnail noBorder >              
        <Left>
          <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title }})}>
            <Thumbnail  square source={{ uri:post_image }} style={styles.downloadListComponentLeftImage} />
          </TouchableHighlight>
        </Left>
        <Body>
        <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title }})}>
          <View>
            <Text style={styles.downloadListComponentTitle}>{post_title}</Text>
            <Text note numberOfLines={1} style={styles.downloadListComponentArtist}>{artist}</Text>
          </View>
        </TouchableHighlight>
        </Body>              
        <Right>
          <View style={styles.downloadListComponentRight}>
            <Icon name='dots-three-vertical' type="Entypo" style={styles.downloadListComponentRightIcon}  />
          </View>
        </Right>
      </ListItem>
      </View>  
    );
  }
}