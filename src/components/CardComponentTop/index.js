import React, { Component } from 'react';
import {View,Image} from 'react-native';
import {Card,CardItem} from 'native-base';
import {styles} from "./style";
export default class CardComponentTop extends Component {  
  render() {
    const {height,width,radius,post_image} = this.props
    return (
      <View style={styles.cardComponentTop}>        
        <Card style={styles.cardComponentCard}>          
          <CardItem cardBody style={styles.cardComponentCardItem} >            
            <Image source={{uri: post_image}} style={{ borderRadius:radius, height:height, width:width}} resizeMode="contain" />                 
          </CardItem>                  
        </Card>
      </View>
    );
  }
}