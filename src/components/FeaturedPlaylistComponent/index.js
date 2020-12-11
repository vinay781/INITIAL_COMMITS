import React, { Component } from 'react';
import {View,Image,TouchableHighlight} from 'react-native';
import {Card,CardItem,Text,Body,List} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from "./style";
export default class FeaturedPlaylistComponent extends Component {
  render() {
    const { height,width,radius,post_title,post_image,notshow,artist,post_file,music,post_id,post_artist,post_slug, post_isPurchasable,resizemode } = this.props     
    return (
      <View style={styles.cardComponentOuter}>
       {artist=="playlist" &&  <TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('playlistscreen',{data:music,currentmusic:{"id":post_id,"url":post_file,"artwork":post_image,"artist":post_artist,"title":post_title,"isPurchasable":post_isPurchasable} }) }>
        <Card style={styles.cardComponentCard}>          
          <CardItem cardBody style={styles.cardComponentCardItem} >            
            <Image source={{ uri: post_image }} style={{ borderRadius:radius, height:height, width:width,resizeMode:resizemode}}/>     
          </CardItem>
         {notshow && 
          <View style={{ width:width, backgroundColor:"#0A151F",paddingHorizontal:5,paddingVertical:5 }}>
            <Text numberOfLines={1} style={styles.cardComponentTitle}>{post_title}</Text>  
            <Text note style={styles.cardComponentArtist}>{post_artist}</Text> 
          </View> }      
        </Card>
        </TouchableHighlight>}
        {artist==null &&  <TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('playlistcategoryview',{title:post_title, image:post_image,id:post_id,slug:post_slug})}>
        <Card style={styles.cardComponentCard}>          
          <CardItem cardBody style={styles.cardComponentCardItem} >            
            <Image source={{ uri: post_image }} style={{ borderRadius:radius, height:height, width:width ,resizeMode:resizemode}}/>     
          </CardItem>
         {notshow && 
         <View style={{ width:width, backgroundColor:"#0A151F",paddingHorizontal:5,paddingVertical:5 }}>
          <Text numberOfLines={1} style={styles.cardComponentTitle}>{post_title}</Text>  
          <Text note style={styles.cardComponentArtist}>{post_artist}</Text> 
        </View>}      
        </Card>
        </TouchableHighlight>}
      </View>
    );
  }
}