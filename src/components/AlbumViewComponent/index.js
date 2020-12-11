import React, { Component } from 'react';
import {Alert} from 'react-native';
import {Icon,ListItem,Thumbnail,Text,Left,Body,Right,View } from 'native-base';
import {styles} from "./style";
export default class AlbumViewComponent extends Component {
  render() {
    const {title,content,image} = this.props
    return (
    <View style={styles.albumViewComponentOuter}>
      <ListItem thumbnail noBorder >
        <Left>
          <Thumbnail square source={{ uri:image }} style={styles.albumViewComponentLeft} />
        </Left>
        <Body>
          <Text style={styles.albumViewComponentTitle}>{title}</Text>
          <Text note numberOfLines={1} style={styles.albumViewComponentContent}>{content}</Text>
        </Body>
        <Right>
          <View style={styles.albumViewComponentRight}>
            
          </View>              
        </Right>
      </ListItem>
    </View>     
    );
  }
}