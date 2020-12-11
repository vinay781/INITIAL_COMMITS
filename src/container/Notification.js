
import React, { Component } from "react";
import { View,BackHandler, AsyncStorage} from 'react-native';
import { Container, Header,Footer,FooterTab, Content, Accordion,Left,Button,Body,Icon,Separator,Title, Right, Spinner,ListItem, Text, Switch } from "native-base";
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,     
      notifications : null    
    };
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.setState({ loading : true})     
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
    const { loading, notifications } = this.state
    return (
        <Container style={styles.containerMainDiscover} >
         <Header transparent>
        <Left>
        <Button transparent onPress={()=>Actions.pop()}>
            <Icon name='arrow-back' style={{ color :"#fff" }}  />
        </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}>Notifications</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder >       
        </Content>        
      </Container>
    );
  }
}