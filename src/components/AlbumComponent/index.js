import React, { Component } from 'react';
import {View ,Image,TouchableHighlight,BackHandler} from 'react-native';
import {Card,CardItem,Text,Body,List} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from './style';
import theme from '../../config/theme';
export default class AlbumComponent extends Component {
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
    const { height,width,radius,post_title,post_image,post_name } = this.props    
    return (
      <View style={styles.albumContainer}>
        <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('albummain',{ title:post_title, description:post_name, image:post_image })}>
        <Card style={styles.albumCard}>          
          <CardItem cardBody style={styles.albumCardItem} >            
            {post_image==""? <Image source={theme.LOCALMUSIC} style={{borderRadius:radius,height:height,width:width}}/> : <Image source={{uri:post_image}} style={{borderRadius:radius,height:height,width:width}}/>}     
          </CardItem>
          <View style={{ width:width, backgroundColor:"#0A151F", paddingVertical:5 }}>
            <Text style={styles.postTitle}>{post_title}</Text>  
            <Text note numberOfLines={1} style={styles.postArtist}>{post_name}</Text>            
          </View>          
        </Card>
        </TouchableHighlight>
      </View>
    );
  }
}