import React, { Component } from "react";
import { View, ImageBackground,Image, FlatList,Dimensions, Alert, BackHandler, AsyncStorage,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Thumbnail,Text,Accordion,Left,Button,Body,Icon,Separator,Title, Right, Spinner,ListItem, Switch } from "native-base";
import {Actions} from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';
import theme from '../../config/theme';
import {styles} from '../../config/style';
import FavListComponent from '../../components/FavListComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      message : false,
      favlist : null        
    };
  }
  getFavourites=()=>{
    AsyncStorage.getItem('usertoken').then(res => {          
      var formData = new FormData();    
      formData.append("token", res ); 

      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getfavourites", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {  
        if(data.status=="ok") {          
          this.setState({ favlist : data.musicslist  })   
        }
        else {
          this.setState({ message : data.msg  }) 
        } 
      })
      .catch((error) => {  console.log(error);                
      });
    }); 
  }
  unFavouriteSong(id){    
    AsyncStorage.getItem('usertoken').then(res => {          
      var formData = new FormData();    
      formData.append("token", res );    
      formData.append("postid", id ); 
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/removefavourites", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {         
        if(data.status=="ok") {                             
          Alert.alert(
            "",
            "Successfully Removed",
            [{
              text: "OK",
              style: "cancel",
              onPress: () => { this.getFavourites() }
              },                  
            ],
            { cancelable: true }
          )
        }       
      })
      .catch((error) => { console.log("ERROR : ", error); });
    });     
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.getFavourites();
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
    const { loading, favlist, message } = this.state
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
        <View style={{ flex : 1, justifyContent: 'center', alignItems : "center", paddingVertical : 20}}>
          <Text style={{ color: "#fff", fontSize : 40, fontWeight : "500", fontStyle : "normal"}}> Favorites </Text>
          {favlist!=null && <Button style={{ borderRadius:10, marginTop : 20, paddingHorizontal:20,height:45,backgroundColor:theme.BLUE_COLOR}} onPress={()=>Actions.jump('playlistscreen',{ currentmusic:favlist})}>
            <Text style={{ fontWeight : "600"}}>PLAY</Text>
          </Button> }
        </View> 
        { message && <View style={{marginVertical:5,paddingHorizontal:10}}>
          <ListItem thumbnail noBorder >              
            <Left>              
              <Thumbnail square source={require("../../assets/images/localmusic.png")} style={{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100}} />                
            </Left>
            <Body>
              <Text style={{color:"white",marginBottom:2,fontWeight:'bold'}}>{message}</Text>                
            </Body>
            <Right></Right>
          </ListItem>
         </View>   
        }
        <View>
        { favlist && <SwipeListView
                useFlatList={true}
                data={favlist}
                renderItem={ (data, rowMap) => (                    
                  <FavListComponent
                    music={favlist}
                    post_id = {data.item.id}  
                    post_title={data.item.title}               
                    artist={data.item.artist}
                    post_image={data.item.artwork}
                    post_file = {data.item.url}  
                    post_isPurchasable = {data.item.isPurchasable}                
                  /> 
                )}
                renderHiddenItem={ (data, rowMap) => (                 
                    <View style={{ alignItems: 'center', backgroundColor: "red", flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <TouchableOpacity 
                      style={{ alignItems: 'center', flexDirection: 'row'}}
                      onPress={()=> Alert.alert(
                            'Are You Sure?',
                            'Unfavorite '+data.item.title, 
                            [{
                              text: 'No',
                              onPress: () => { console.log('SignIn Cancel Pressed') },
                              style: 'cancel'
                            }, 
                            {
                                text: 'Yes',
                                onPress: () => { this.unFavouriteSong(data.item.id) }
                            }], 
                            { cancelable: false }
                          )} >
                        <Text style={{color :"#fff",fontSize: 12, fontWeight : "bold", paddingHorizontal : 5}}>Delete</Text>
                        <Icon name='trash' type="FontAwesome" style={{color :"#fff",fontSize: 15}}  />
                      </TouchableOpacity>                                                                  
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
                disableLeftSwipe={true}                
              /> }
        </View>
        </Content>       
      </Container>
    );
  }
}