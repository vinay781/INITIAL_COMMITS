import React, { Component } from 'react';
import {TouchableHighlight,StyleSheet,Dimensions} from 'react-native';
import {ListItem,Thumbnail,Text,Left,Body,Right,View} from 'native-base';
import {Actions} from 'react-native-router-flux';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class PlaylistCatagoryViewComponent extends Component {  
render() {
  const {post_image,post_title,artist,music,post_id,post_file,post_isPurchasable} = this.props    
  return (  
    <View key={post_id} style={styles.seeAllComponentOuter}>
      <ListItem thumbnail noBorder >              
        <Left>
          <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title, "isPurchasable":post_isPurchasable }})}>
            <Thumbnail  square source={{ uri:post_image }} style={styles.seeAllComponentLeftImage} />
          </TouchableHighlight>
        </Left>
        <Body>
          <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title,"isPurchasable":post_isPurchasable }})}>
            <View>
              <Text style={styles.seeAllComponentTitle}>{post_title}</Text>
              <Text note numberOfLines={1} style={styles.seeAllComponentArtist}>{artist}</Text>
            </View>
          </TouchableHighlight>          
        </Body>      
        <Right>             
          <View style={styles.seeAllComponentRight}>            
          </View> 
        </Right>
      </ListItem>      
    </View>     
    );
  }
}
const styles = StyleSheet.create({
    seeAllComponentOuter : {marginVertical:5,paddingHorizontal:10},
    seeAllComponentLeftImage : {borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100},
    seeAllComponentTitle : {color:"white",marginBottom:2,fontWeight:'bold'},
    seeAllComponentArtist : {fontWeight:'bold'},
    seeAllComponentRight : {flexDirection:"row-reverse",justifyContent:"space-between",width:(SCREEN_WIDTH*12)/100}
});  