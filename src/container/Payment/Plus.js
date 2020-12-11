import React, { Component } from "react";
import { Container, Header, Content, Card, Left, CardItem, Text, Body,Button,Icon,Title, Right, View } from "native-base";
import {TouchableHighlight, BackHandler, Alert} from  'react-native'
import { Actions } from "react-native-router-flux";
import theme from "../../config/theme";

export default class Plus extends Component {

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
    const { plandetails } = this.props    
    return (
      <Container>
        <Header transparent style={{backgroundColor:theme.DEFAULT_COLOR}}>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>              
              <Icon name='arrow-back' style={{ color :"#fff" }} />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"#fff"}}> Payment</Title>
          </Body>
          <Right>             
          </Right>
        </Header>      
        <Content padder>          
          <View style={{marginTop:10}}>
              <Text style={{fontWeight:"500",fontSize:25,textAlign:"center",margin:2}}>
                Enjoy { plandetails.name }
              </Text>
              <Text style={{fontWeight:"500",fontSize:25,textAlign:"center",margin:2}}>
                { plandetails.expiration_number } Days Free Trial
              </Text>              
          </View>
          <View style={{padding:30}}>
            <Text note style={{fontWeight:"400",fontSize:20,textAlign:'center',margin:2}}>
              Then pay ${plandetails.billing_amount}/month after.
            </Text>
            <Text note style={{textAlign:'center',margin:2}}>
              {plandetails.plan_extraainfo }                
            </Text>
          </View>
          <View style={{paddingHorizontal:"15%"}}>
            <Text style={{fontWeight:"bold",fontSize:25}}>Benefits:</Text>
            <Text style={{fontWeight:"400",fontSize:20,textAlign:'center',margin:2, padding: 10}}>
              {plandetails.description}              
            </Text>
          </View>
          <View style={{paddingHorizontal:"15%",paddingVertical:20}}>
            <TouchableHighlight
              style={{ 
              borderRadius: 10,
              borderColor:"black",
              borderWidth:1,
              padding: 10,
              elevation: 2, backgroundColor: "#03a9f4" }}
              onPress={()=> Alert.alert('In Progress')}
            >
              <Text style={{color: "white",fontWeight: "bold",textAlign: "center" }}>PAY With Orange </Text>
            </TouchableHighlight>
          </View>         
          <View style={{paddingHorizontal:"15%",}}>
            <TouchableHighlight
              style={{ 
              borderRadius: 10,
              borderColor:"black",
              borderWidth:1,
              padding: 10,
              elevation: 2, backgroundColor: "#03a9f4" }}
              onPress={()=>{Actions.jump('paymentwithvisa',{ trialdays : plandetails.expiration_number, amount : plandetails.billing_amount})}}
            >
              <Text style={{color: "white",fontWeight: "bold",textAlign: "center" }}> PAY With Visa Card </Text>
            </TouchableHighlight>
          </View>         
        </Content>
      </Container>
    );
  }
}   