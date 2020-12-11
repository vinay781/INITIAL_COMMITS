import React, { Component } from 'react';
import {TouchableHighlight,Dimensions} from 'react-native';
import {ListItem,Thumbnail,Text,Left,Body,Right,View,Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class SeeAllComponent extends Component {  
render() {
  const {post_image,post_title,artist,music,post_id,post_file,post_isPurchasable,post_index} = this.props    
  return (  
    <View key={post_id} style={{paddingHorizontal:20}}>
      <ListItem thumbnail noBorder >              
        <Left>
          <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title, "isPurchasable":post_isPurchasable }})}>
           <Text style={{color:'white',fontWeight:'bold'}}>{post_index+1}.</Text>
          </TouchableHighlight>
        </Left>
        <Body>
          <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title,"isPurchasable":post_isPurchasable }})}>
            <View>
              <Text style={{color:"white",fontWeight:'bold'}}>{post_title}</Text>
            </View>
          </TouchableHighlight>          
        </Body>      
        <Right>             
          <View style={{flexDirection:"row-reverse",justifyContent:"space-between",width:(SCREEN_WIDTH*12)/100}}>            
          </View> 
        </Right>
      </ListItem>      
    </View>     
    );
  }
}