import React, { Component ,Fragment} from 'react';
import { View ,TouchableOpacity,FlatList, Image,AsyncStorage,BackHandler,Dimensions, Alert} from 'react-native';
import { Container, Header, Content,Form ,Input,Item, Footer,Left,Right,Body,Title, FooterTab, Button, Icon, Text,Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
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
    const { title, name, image, description } = this.props;
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
            <Text style={{color:"#fff",fontWeight : "bold"}}>About</Text>            
          </Body>
          <Right>                     
          </Right>
        </Header>
        <Content style={{backgroundColor:theme.DEFAULT_COLOR}} >
        <View style={{  width : (SCREEN_WIDTH  *100) / 100,  paddingTop:15, alignItems:"center",justifyContent:"center",}} >
            <View  style={{   width : (SCREEN_WIDTH * 25) / 100, height : (SCREEN_WIDTH * 25) / 100}}>
              <Image                          
                source={theme.ABOUT_LOGO}                       
                style={{ width :"100%",
                height :"100%",        
                resizeMode: 'contain'}}   
              />
            </View>
            <View style={{ width : (SCREEN_WIDTH  *80) / 100,marginVertical:10}} >              
              <Text numberOfLines={2}  style={{color:theme.DARK_GREY_COLOR,fontSize:15,textAlign:"center", }}>luberian music for everyone at anytime</Text>
            </View>
        </View>
        <View style={{height:1,borderBottomWidth:1,borderColor:"#fff",marginVertical:10}}></View>
        <List>
            <ListItem noBorder onPress={()=>console.log("object")}>
              <Left>
                <Text style={{color:"white",fontWeight:"bold"}}>Follow us :</Text>
              </Left>
            </ListItem>
            <View style={{borderBottomWidth:1,borderColor:"#fff"}}></View>
            <ListItem onPress={()=>console.log("Share App")}>
             <Left>
                <Text style={{color:"white",marginHorizontal:25}}>Facebook : TunitMusic</Text>
              </Left>
            </ListItem>
            <View style={{borderBottomWidth:1,borderColor:"#fff"}}></View>
            <ListItem onPress={()=>console.log("Share App")}>
             <Left>
                <Text style={{color:"white",marginHorizontal:25}}>Instagram : TunitMusic</Text>
              </Left>
            </ListItem>
            <View style={{borderBottomWidth:1,borderColor:"#fff"}}></View>
            <ListItem onPress={()=>console.log("Share App")}>
             <Left>
                <Text style={{color:"white",marginHorizontal:25}}>Twiter : TunitMusic</Text>
              </Left>
            </ListItem>
            <View style={{borderBottomWidth:1,borderColor:"#fff"}}></View>
            <ListItem onPress={()=>console.log("Share App")}>
             <Left>
                <Text style={{color:"white",marginHorizontal:25}}>LinkedIn : TunitMusic</Text>
              </Left>
            </ListItem>
            <View style={{borderBottomWidth:1,borderColor:"#fff"}}></View>
            <ListItem noBorder onPress={()=>console.log("object")}>
              <Left>
                <Text style={{color:"white",fontWeight:"bold"}}>Term and Condition of use</Text>
              </Left>
            </ListItem>
          </List>                       
        </Content>              
      </Container>
    );
  }
}