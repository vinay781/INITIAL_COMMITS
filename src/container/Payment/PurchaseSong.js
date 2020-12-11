
import React, { Component } from "react";
import { View,BackHandler,TouchableHighlight, AsyncStorage} from 'react-native';
import { Container, Header,Footer,FooterTab, Content, Accordion,Left,Button,Body,Icon,Separator,Title, Right, Spinner,ListItem, Text, Switch } from "native-base";
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';
import {styles} from '../../config/style';
export default class PurchaseSong extends Component {
  constructor(props) {
    super(props);
    this.state = {          
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
  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#724894" />
  }
  render() {
    const { id, title, artist, url } = this.props    
    return (
        <Container style={styles.containerMainDiscover} >
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
              <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"#fff"}}> Pay </Title>
          </Body>
          <Right>            
          </Right>
        </Header>
        <Content>
          <View style={{ alignItems : "center"}}>
            <Text style={{ color : "white"}}> {id} </Text>
            <Text style={{ color : "white"}}> {title} </Text>
            <Text style={{ color : "white"}}> {artist} </Text>
            <Text style={{ color : "white"}}> {url} </Text>
          </View>
        </Content>       
      </Container>
    );
  }
}