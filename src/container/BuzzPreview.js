import React, { Component } from 'react'
import {  View,Image ,Dimensions} from 'react-native'
import { Container,Header,Content,Footer,Left,Right,Body,Title,FooterTab,Button,Icon,Text,ListItem,List,Spinner } from 'native-base';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import { Actions } from 'react-native-router-flux';
import theme from  '../config/theme';
import {styles} from '../config/style';
export default class BuzzPreview extends Component {
    render() {
        const {post_image,height,width,radius,post_title,post_time,post_description} = this.props
        console.log("buzzpriview")
        return (
           <Container style={styles.containerMainDiscover}>
               <Header transparent>
                <Left>
                    <Button transparent onPress={()=>Actions.pop()}>
                        <Icon name='arrow-back' style={{ color :"#fff" }}  />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:"#fff",paddingRight: (SCREEN_WIDTH * 20)/100  }}>Buzz</Title>
                </Body>         
                </Header>
               <Content>
                <View style={{width:(SCREEN_WIDTH*100)/100,justifyContent:"center",alignItems:"center"}}>
                    <Image source={{uri: post_image}} style={{height:(SCREEN_WIDTH*50)/100, width:(SCREEN_WIDTH*50)/100,marginHorizontal:5}}/>
                </View>
                <View style={{flexDirection:"column",paddingHorizontal:5, width:(SCREEN_WIDTH*100)/100,}}>
                    <Text ellipsizeMode='tail'  style={{color:"white",fontWeight:"bold",fontSize:20,color:"#ccc",marginTop:5,textAlign:"center"}}>{post_title}</Text>
                    <Text ellipsizeMode='tail' style={ {color:theme.DARK_GREY_COLOR,fontSize:15,textAlign:"center",marginHorizontal:5}}>{post_description}</Text>               
            </View>
            </Content>
            </Container>
        )
    }
}