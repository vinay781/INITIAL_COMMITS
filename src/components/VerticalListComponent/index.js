import React, { Component } from 'react';
import { View,Image,TouchableHighlight} from 'react-native';
import { Text} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from './style';
export default class VerticalListComponent extends Component {
  render() {
    const {height,width,radius,post_title,post_image,post_name,post_id} = this.props
    return (
    <View key={post_id} style={styles.albumContainer}>
      <TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('fullview',{title:post_title})}>       
        <View style={styles.verticalListComponentInner}>
          <View style={styles.verticalListComponentRow}>
            <Image source={{uri: post_image}} style={{borderRadius:radius,height:height, width:width}}/>  
            <View style={styles.verticalListComponentColumn}>
              <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>{post_title}</Text>
              <Text numberOfLines={2} ellipsizeMode='tail' style={styles.verticalListComponentPost}>{post_name}</Text>                
            </View>
          </View>              
        </View>        
      </TouchableHighlight>      
    </View>
    );
  }
}
