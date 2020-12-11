import React, { Component } from "react";
import { Container, Header, Content, Card,Left, CardItem, Text, Body,Button,Icon,Title, Right, View } from "native-base";
import {ImageBackground,Dimensions,TouchableHighlight,BackHandler, FlatList} from  'react-native'
import { Actions } from "react-native-router-flux";
import theme from "../../config/theme";
export default class OurPlans extends Component {
  constructor(){
    super();
    this.state = { 
      plans : null
    }
  }
  getPlans = () => {
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/listofplans")
    .then(response => response.json())
    .then(data => { 
      // console.log("PLANS : ", data)            
      this.setState({ plans : data })          
    })
    .catch((error) => { console.log(error)  });
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.getPlans()
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
  renderOurPlans(item){
    return(
    <View style={{ justifyContent:"center", height : 400, marginVertical : 10, marginHorizontal : 10}}>       
        <ImageBackground source={ item.id =='1' ? theme.BG_PREMIUM : theme.BG_PLUS } style={{width: '100%', height : "100%"}} resizeMode="cover">
        <View style={{ paddingVertical : 20}}>
          <Text style={{fontWeight:"bold",fontSize:35,textAlign:"center", margin:2, color : "#fff"}}>
              {item.name}
          </Text>
          <Text style={{textAlign:'center', fontWeight:"300",fontSize:25, margin:2, color : "#fff"}}>
            {item.expiration_number} days Free Trial
          </Text>
          <Text style={{textAlign:'center', fontWeight:"300",fontSize:15, margin:2, color : "#fff"}}>
              Then pay ${item.billing_amount}/month
          </Text>
        </View>
        <View style={{ justifyContent : "center"}}>
          <Text style={{textAlign:'center', fontWeight:"300",fontSize:20, margin:2, color : "#fff", paddingHorizontal : 25}}>
            {item.description}            
          </Text>
        </View>
        <View style={{paddingHorizontal:"30%", paddingVertical : "10%"}}>
          <TouchableHighlight
            style={{ 
            borderColor : "transparent",
            borderRadius: 10,            
            borderWidth:1,
            padding: 10,
            backgroundColor: item.id =='1' ? theme.DARK_GREY_COLOR : theme.BLUE_COLOR }}
            onPress={()=>{Actions.jump('plus',{ plandetails : item })}}
          >
            <Text style={{color: "white",fontWeight: "bold",textAlign: "center" }}>
              Try It Now 
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>{Actions.jump('plus',{ plandetails : item })}}>
            <Text style={{ color:"#fff", textDecorationStyle:"solid", textDecorationLine:"underline",textAlign:"center", marginVertical:10 }}>
              Terms {`&`} Conditions
            </Text>
          </TouchableHighlight>          
        </View>
        </ImageBackground>     
    </View>
    )
  }

  render() {
    const { plans } = this.state
    return (
      <Container style={{backgroundColor:theme.DEFAULT_COLOR}}>
        <Header transparent>
        <Left>
          <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
            <Icon name='arrow-back' style={{ color :"#fff" }}/>            
          </Button>
        </Left>
          <Body>
            <Title style={{color:"#fff"}}>Our Plans</Title>
          </Body>
          <Right>             
          </Right>
        </Header>      
        <Content padder>
          { plans!=null && 
          <FlatList
            data={plans}
            renderItem={({ item }) => this.renderOurPlans(item)} 
            keyExtractor={(item, index) => {
              return item.id.toString();
            }}
          />
          }          
        </Content>
      </Container>
    );
  }
}



    