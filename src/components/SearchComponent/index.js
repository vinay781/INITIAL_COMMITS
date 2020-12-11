import React, { Component } from 'react';
import { View,Image,TouchableHighlight} from 'react-native';
import { Card,CardItem,Text,Left, Body} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from "./style";
export default class CardComponent extends Component {
render() {
  const {height,width,radius,post_id,post_artist,post_title,post_image,post_name,post_file,music,post_isPurchasable} = this.props
  return (
    <View style={styles.searchComponentOuter}>
      <TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('playlistscreen',{ data:music, currentmusic:{"id":post_id,"url":post_file,"artwork":post_image,"artist":post_artist,"title":post_title, "isPurchasable":post_isPurchasable } })}>
      <Card style={styles.searchComponentCard}>          
        <CardItem cardBody style={styles.searchComponentCardItem} >          
          <Left>
            <Image source={{uri: post_image}} style={{borderRadius:radius,height:height,width:width}}/>    
          </Left>                      
          <Body style={styles.searchComponentCardBody}>
            <Text style={styles.searchComponentCardText}>{post_title}</Text>            
          </Body>       
        </CardItem>     
      </Card>
      </TouchableHighlight>
    </View>
    );
  }
}