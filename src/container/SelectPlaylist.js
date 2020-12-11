import React, { Component, Fragment } from "react";
import { View,Modal,Image,FlatList,Dimensions, Alert, BackHandler, AsyncStorage} from 'react-native';
import { Container, Header, Content,Thumbnail,Form, Item, Input,Button,Title, Card, CardItem, Text, Icon,Left,Body,Right, Spinner,ListItem } from "native-base";
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';
import AddToPlaylistComponent from '../components/AddToPlaylistComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class SelectPlaylists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      playlist : null,
      message : true,
      modalVisible : false       
    };
  }
  getPlaylistByUser=()=>{
    AsyncStorage.getItem('usertoken').then(res => {          
      var formData = new FormData();       
      formData.append("token", res ); 
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getPlaylistByuser", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {                
        if(data.playlist.length != 0)
        {
          this.setState({ playlist : data.playlist, message : false })    
        }     
        else{
          this.setState({ message : true })    
        }        
      })
      .catch((error) => { console.log(error)  });
    }); 
  }  

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.getPlaylistByUser();
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
    return  <Spinner style={styles.loadingContainer} color="#0A151F" />
  }
  render() {
    const { loading, playlist, message, modalVisible } = this.state
    const { trackid } = this.props
    return (
        <Container style={styles.containerMainDiscover} >
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}> Select Playlists </Title>
          </Body>
          <Right>            
          </Right>
        </Header>
        <Content>          
          { playlist &&  <View>
            <FlatList 
              showsVerticalScrollIndicator={false}    
                data={playlist}
                renderItem={({ item }) =>  <AddToPlaylistComponent                    
                  post_id = {item.id}  
                  post_userid = {item.user_id}  
                  post_title={item.playlist_title}               
                  post_date={item.date}  
                  post_trackid={trackid}             
                />            
                }
                keyExtractor={(item, index) => {
                  return item.id;
                }}                              
              />
            </View>
            }
            { message && <View style={{marginVertical:5,paddingHorizontal:10}}>
               <ListItem thumbnail noBorder >              
              <Left>              
                <Thumbnail square source={require("../assets/images/playlists.png")} style={{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100}} />                
              </Left>
              <Body>
                <Text style={{color:"white",marginBottom:2,fontWeight:'bold'}}>No Playlist available.</Text>                
              </Body>              
              <Right>                
              </Right>
            </ListItem>
           </View>   
           }
        </Content>         
      </Container>
    );
  }
}