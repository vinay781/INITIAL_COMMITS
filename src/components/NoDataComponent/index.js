import React, { Component } from 'react';
import {View} from 'react-native';
import {Card,CardItem,Text,Body} from 'native-base';
import {styles} from "./style";
export default class NoDataComponent extends Component { 
  render() {
    const { post_title, post_description} = this.props    
    return (
      <View style={styles.noDataComponent} >
        <Card  style={styles.noDataComponentCard} >          
          <CardItem cardBody style={styles.noDataComponentCardItem}  >            
          </CardItem>          
          <CardItem>
            <Body>
              <Text style={styles.noDataComponentCardItemTitle}>{post_title}</Text>
              <Text note ></Text>
            </Body>           
          </CardItem>
          <CardItem style={styles.noDataComponentCardItemDesc} >
            <Text note>{post_description}</Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}
