import React, { Component } from "react";
import { Container, Header, Content, Card,Left, CardItem, Text, Body,Button,Icon,Title, Right, View } from "native-base";
import {Dimensions,TouchableHighlight} from  'react-native'
import { Actions } from "react-native-router-flux";
import { styles } from "../../config/style";


export default class Premium extends Component {
  render() {
    return (
      <Container>
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back'   />
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
              <Text style={{fontWeight:"500",letterSpacing:2, fontSize:25,textAlign:"center",margin:2}}>
                 Enjoy Tunit Premium
              </Text>
              <Text style={{fontWeight:"500",letterSpacing:1,fontSize:25,textAlign:"center",margin:2}}>
                  7 Days for Free 
              </Text>              
          </View>
          <View style={{padding:30}}>
          <Text  style={{fontWeight:"400",fontSize:20,color:"#ccc", textAlign:'center',margin:2}}>
                  Then pay $5.00/month after.
              </Text>
              <Text note style={{textAlign:'center',margin:2}}>
                 No comitment. Cancle anytime 
              </Text>
          </View>
          <View style={{padding:30,paddingHorizontal:"15%"}}>
              <Text style={{fontWeight:"bold",fontSize:25}}>Benefits:</Text>
          <Text  style={{fontWeight:"400",fontSize:20,color:"#ccc", textAlign:'center',margin:2}}>
          Access unlimited songs,No ads,listen offline  access our curated playlist premium user badge & high quality sound
              </Text>
          </View>

          <View style={{paddingHorizontal:"15%",paddingVertical:20}}>
          <TouchableHighlight
              style={{ 
              borderRadius: 10,
              borderColor:"black",
              borderWidth:2,
              padding: 15,
              elevation: 2, backgroundColor: "#2196F3" }}
              onPress={()=>{Actions.jump('ourplans'),setModalVisible(!modalVisible);}}
            >
              <Text style={styles.textStyleButton}>PAY With Orange </Text>
            </TouchableHighlight>
          </View>
          <View style={{paddingHorizontal:"15%",}}>
          <TouchableHighlight
              style={{ 
              borderRadius: 10,
              borderColor:"black",
              borderWidth:2,
              padding: 15,
              elevation: 2, backgroundColor: "#2196F3" }}
              onPress={()=>{Actions.jump('ourplans'),setModalVisible(!modalVisible);}}
            >
              <Text style={styles.textStyleButton}> PAY With Visa Card </Text>
            </TouchableHighlight>
          </View>        
        </Content>
      </Container>
    );
  }
} 