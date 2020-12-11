import React, { Component } from "react";
import { View, Image,Dimensions, Alert, BackHandler,TouchableHighlight,AsyncStorage,FlatList} from 'react-native';
import { Container,Header,Content,Left,Button,Body,Icon,Title, Right, Spinner,Text } from "native-base";
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';
import FooterComponent from '../components/FooterComponent';
import RecentListComponent from '../components/RecentListComponent ';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,        
      recentsongs : null,        
    };
  }
  getRecentPlaylist = async (token) => {    
    this.setState({ loading : true })
    var formData = new FormData();    
    formData.append("token", token ); 
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getrecentplaylistByUser", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    .then(response => response.json())
    .then(data => {         
      // console.log("AA : ",data.musicslist)
      this.setState({ recentsongs : data.musicslist })
    })
    .catch((error) => { console.log(error)  })
    .finally(()=>{ this.setState({ loading : false })  })
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    AsyncStorage.getItem('usertoken').then(res => {     
      this.getRecentPlaylist(res)
    });    
  }
  componentWillUnmount() {    
    this.backHandler.remove();     
  }
  handleBackPress = () => {
      Actions.pop();
      return true;
  }
  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#fff" />
  }
  render() {
    const { loading, recentsongs } = this.state
    return (
        <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
          </Left>
          <Body>
            <Title style={{color:"white"}}> Library </Title>
          </Body>
          <Right></Right>
        </Header>        
         <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:(SCREEN_WIDTH*5)/100,paddingVertical:10}}>           
          <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('favourites')}>
           <View style={{alignItems:"center"}}>
           <Image source={theme.FAVOURITE} style={{height:(SCREEN_WIDTH*20)/100, width:(SCREEN_WIDTH*20)/100}}/>
           <Text style={{color:"white", fontSize:(SCREEN_WIDTH*3)/100}}>FAVORITES</Text>
           </View>
          </TouchableHighlight>

          <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('myplaylists')}>
           <View style={{alignItems:"center"}}>
           <Image source={theme.PLAYLISTS} style={{height:(SCREEN_WIDTH*20)/100, width:(SCREEN_WIDTH*20)/100}}/>
           <Text style={{color:"white", fontSize:(SCREEN_WIDTH*3)/100}}>MY PLAYLISTS</Text>
           </View>
          </TouchableHighlight>

          <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('downloads')}>
           <View style={{alignItems:"center"}}>
            <Image source={theme.DOWNLOAD} style={{height:(SCREEN_WIDTH*20)/100, width:(SCREEN_WIDTH*20)/100}}/>
            <Text style={{color:"white", fontSize:(SCREEN_WIDTH*3)/100}}>DOWNLOADS</Text>
           </View>
          </TouchableHighlight>

          <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('videos')}>
           <View style={{alignItems:"center"}}>
           <Image source={theme.VIDEO} style={{height:(SCREEN_WIDTH*20)/100, width:(SCREEN_WIDTH*20)/100}}/>
           <Text style={{color:"white", fontSize:(SCREEN_WIDTH*3)/100}}>VIDEOS</Text>
           </View>
          </TouchableHighlight>
         </View>
         <View style={{alignItems:"center",marginVertical:10}}>
         <View style={{height:10,width:(SCREEN_WIDTH*90)/100,borderBottomWidth:1,borderBottomColor:"#ccc"}}></View>
         </View> 
         <View style={{ justifyContent: 'center', alignItems : "center", paddingVertical : 10}}>
            <Text note style={{ fontSize : 18, fontWeight : "300", fontStyle : "normal"}}> Recent Songs </Text>
            { loading && this.renderLoader() }           
        </View> 
         <Content>          
          <View style={{ paddingBottom : 50}}>
            { recentsongs && <FlatList 
              showsVerticalScrollIndicator={false}    
              data={recentsongs}
              renderItem={({ item}) =>  <RecentListComponent
                music={recentsongs}
                post_id = {item.id}  
                post_title={item.title}               
                artist={item.artist}
                post_image={item.artwork}
                post_file = {item.url}  
                post_isPurchasable = {item.isPurchasable}                
              />           
              }
              keyExtractor={(item, index) => {
                return item.id;
              }}                              
            /> }
          </View>
        </Content>   
        <FooterComponent activeTab={"library"}/>     
      </Container>
    );
  }
}