import React, { Component } from 'react';
import {View ,Image,TouchableHighlight,BackHandler} from 'react-native';
import {Card,CardItem,Text,Body,List} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from './style';
export default class GenersHomeComponent extends Component {
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
    const {height,width,radius,post_title,post_image,post_name,post_taxanomy} = this.props    
    return (
      <View style={styles.albumContainer}>
        <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('fullview',{ title:post_title, name:post_name, image:post_image, taxanomy:post_taxanomy})}>
        <Card style={styles.albumCard}>          
          <CardItem cardBody style={styles.albumCardItem} >            
            <Image source={{uri: post_image}} style={{borderRadius:radius,height:height,width:width,resizeMode:"cover"}}/>     
          </CardItem>          
        </Card>
        </TouchableHighlight>
      </View>
    );
  }
}