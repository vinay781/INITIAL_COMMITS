import React, { Component } from 'react';
import { View,Image,TouchableHighlight} from 'react-native';
import { Card,CardItem,Text,Body,List } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from "./style";
export default class VideoPlayerComponent extends Component {
  render() {
    const {height,width,radius,post_title,post_image,post_file}=this.props    
    return (
      <View style={styles.videoPlayerComponent}>
        <TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('videoplayer',{title:post_title,url:post_file})}>
        <Card style={styles.videoPlayerComponentCard}>          
          <CardItem cardBody style={styles.videoPlayerComponentCardItem} >            
            <Image source={{uri: post_image}} style={{borderRadius:radius,height:height,width:width}}/>     
          </CardItem>
          <View style={{width:width,backgroundColor:"#0A151F",paddingVertical:5}}>
          <Text style={styles.videoPlayerComponentTitle}>{post_title}</Text>              
          </View>          
        </Card>
        </TouchableHighlight>
      </View>
    );
  }
}
