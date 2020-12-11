import React, { Component } from 'react';
import { View,BackHandler,Dimensions} from 'react-native';
import { Container, Header, Content,Left,Right,Body,Button, Icon, Text, CardItem, Thumbnail, ListItem, List } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      catlist : null      
    };     
  }
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
    const { title, username, image, description } = this.props;
    const { catlist } = this.state;
    return (
    <Container style={styles.containerMainDiscover} >
    <Header transparent>
        <Left>
          <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
            <Icon name='arrow-back' style={{ color :"#fff" }}  />
          </Button>
        </Left>
          <Body>
            <Text style={{color:"#fff",fontWeight : "bold"}}>My Account</Text>            
          </Body>
          <Right>                     
          </Right>
        </Header>
        <Content style={{backgroundColor:theme.DEFAULT_COLOR}} >
        <CardItem style={{backgroundColor:theme.DEFAULT_COLOR}} >
            <Left style={{ maxWidth : (SCREEN_WIDTH * 25)/100}}>
            {image==null && <Thumbnail large  source={{uri:"http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g"}} style={{marginHorizontal:10}} />}
            {image!=null && <Thumbnail large  source={{uri:image}} style={{marginHorizontal:10}} />}
            </Left>
            <Body style={{ justifyContent: "center",}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{color:"white",fontWeight:"bold",fontSize:18,textTransform:"uppercase",marginLeft:10 }}>{username}</Text>    
            </Body>
            <Right></Right>
          </CardItem>
        <View style={{height:1,borderBottomWidth:1,borderColor:"#fff",marginVertical:10}}></View>
        <List>

            <ListItem noBorder>
              <Left>
                <Text style={{color:"white",fontWeight:"bold"}}>Subscription </Text>
              </Left>
            </ListItem>
            <View style={{borderBottomWidth:1,borderColor:"#fff"}}></View>
            <ListItem>
             <Left>
                <Text style={{color:"white",}}>Current Plan</Text>
              </Left>
              <Right>
              <Text style={{color:"white",}}>free</Text>
              </Right>
            </ListItem>
            <View style={{borderBottomWidth:1,borderColor:"#fff"}}></View>
            {/* <ListItem onPress={()=>console.log("Share App")}>
             <Left>
                <Icon name="currency-usd-circle-outline" style={{color:"white"}}  type="MaterialCommunityIcons" />
                <Text style={{color:"white"}}>Subscribe</Text>
              </Left>
            </ListItem>
            <View style={{borderBottomWidth:1,borderColor:"#fff"}}></View> */}
            <ListItem onPress={() => Actions.jump('ourplans')}>
             <Left>
             <Icon name="database-lock" style={{color:"white"}}  type="MaterialCommunityIcons" />
                <Text style={{color:"white"}}>Manage Subscription</Text>
              </Left>
            </ListItem>
            <View style={{borderBottomWidth:1,borderColor:"#fff"}}></View>
            <ListItem onPress={()=>console.log("Share App")} iconLeft>
             <Left>
                <Icon name="table-key" style={{color:"white"}}   type="MaterialCommunityIcons" />
                <Text style={{color:"white"}}>Enter Promo Code</Text>
              </Left>
            </ListItem>
            <View style={{borderBottomWidth:1,borderColor:"#fff"}}></View>           
          </List>                      
        </Content>              
      </Container>
    );
  }
}