import React, { Component } from "react";
import { View, ImageBackground,Image, FlatList,Dimensions, Alert, BackHandler,TouchableHighlight, AsyncStorage} from 'react-native';
import { Container, Header,Footer,FooterTab, Content, Accordion,Left,Button,Body,Icon,Separator,Title, Right, Spinner,ListItem, Text, Switch } from "native-base";
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';
import {styles} from '../../config/style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false        
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
    const { loading } = this.state
    return (
        <Container style={styles.containerMainDiscover} >
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>            
          </Body>
          <Right>            
          </Right>
        </Header>
        <Content>       
        </Content>       
      </Container>
    );
  }
}