import React, { Component } from 'react';
import { View ,Image} from 'react-native';
import { Text,Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from "./style";
export default class VideoComponent extends Component {
  render() {
    const {post_image,post_title,post_file} = this.props
    return (
      <View style={styles.videoComponentOuter}>
        <View>
          <Image source={{uri: post_image}} style={styles.videoComponentImage}/>          
          <View style={styles.videoComponentCenter}>
            <Icon name='play' type="FontAwesome5" style={styles.videoComponentIcon} onPress={()=>Actions.jump('videoplayer',{title : post_title, url : post_file})} />
          </View>
        </View>             
        <View style={styles.videoComponentBottom} >
          <Text style={styles.videoComponentTitle}>{post_title}</Text>          
        </View>                       
      </View>
    );
  }
}
