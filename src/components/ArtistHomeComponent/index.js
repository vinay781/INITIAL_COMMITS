import React, { Component } from 'react';
import {View ,Image,TouchableHighlight,BackHandler} from 'react-native';
import {Card,CardItem,Text,Body,List} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from './style';
export default class ArtistHomeComponent extends Component {
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);        
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);        
  }
  componentWillUnmount() {    
    this.backHandler.remove();     
  }
  handleBackPress = () => {
      Actions.pop();
      return true;
  }
  render() {
    const {height,width,radius,post_title,post_image,post_name,post_taxanomy,id} = this.props    
    return (
      <View style={styles.albumContainer}>
        <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('artistview',{id:id, image:post_image})}>
        <Card style={styles.albumCard}>          
          <CardItem cardBody style={styles.albumCardItem} >            
            <Image source={{uri: post_image}} style={{borderRadius:radius,height:height,width:width}}/>     
          </CardItem>
          <List style={[styles.bottomText,{width: width}]}>               
            <Body>
              <Text style={styles.postTitle}>{post_title}</Text>              
            </Body>            
          </List>        
        </Card>
        </TouchableHighlight>
      </View>
    );
  }
}
