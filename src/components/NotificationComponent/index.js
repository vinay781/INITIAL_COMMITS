import React, { Component } from 'react';
import {List,ListItem,Left,Body,Right,Thumbnail,Text,View} from 'native-base';
import {styles} from "./style";
export default class Notification extends Component {
  render() {
    const {discription,time,title, image} = this.props
    return (     
    <List>
      <ListItem avatar >
        <Left>
          <View style={styles.notificationComponent}>
            <Thumbnail large style={styles.notificationComponentLeftImage} source={{ uri: image }} />                
          </View>
        </Left>
        <Body>
          <Text style={styles.notificationComponentTitle} >{title}</Text>
          <Text note>{discription}</Text>              
        </Body>
        <Right>
          <Text note>3:43 pm</Text>
        </Right>
      </ListItem>
    </List>      
    );
  }
}