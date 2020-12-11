import React, { Component ,Fragment} from 'react';
import { View,SafeAreaView,TouchableOpacity,BackHandler,FlatList, Dimensions} from 'react-native';
import { Container, Header, Content, Left,Right,Body, Button, Icon, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';
import SeeAllComponent from '../components/SeeAllComponent';
import FreeMusicComponent from '../components/FreeMusicComponent';
import VerticalListComponent from '../components/VerticalListComponent';
import VideoComponent from '../components/VideoComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class SeeAll extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      salist : null,
      alblist : null,
      artlist : null,
      fremusic : null,
      alvideos : null,
      algenres : null
    };    
  } 
  
  getAllNewRelease = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/AllmusicList")
    .then(response => response.json())
    .then(data => { 
      this.setState({loading : false, salist:data.musicslist})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  }
  getAllAlbums = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/AllalbumsList")
    .then(response => response.json())
    .then(data => {       
      this.setState({loading : false, alblist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  }
  getAllArtists = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/GetArtistList")
    .then(response => response.json())
    .then(data => {       
      this.setState({loading : false, artlist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})                     
    });
  }
  getAllFreeMusics = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getAllFreemusic")
    .then(response => response.json())
    .then(data => {             
      this.setState({loading : false, fremusic:data.musicslist})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  }
  getAllVideos = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/AllvideosList")
    .then(response => response.json())
    .then(data => {       
      this.setState({loading : false, alvideos:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})                     
    });
  }
  getAllGenres = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/AllgenersList")
    .then(response => response.json())
    .then(data => {       
      this.setState({loading : false, algenres :data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})                  
    });
  }

  getSeeAllList = (type) =>{    
    if(type=="newrelease"){
      this.getAllNewRelease();
    }
    if(type=="albums"){
      this.getAllAlbums();
    }
    if(type=="artists"){
      this.getAllArtists();
    }
    if(type=="freemusic"){
      this.getAllFreeMusics();
    }
    if(type=="videos"){
      this.getAllVideos();
    }
    if(type=="genres"){
      this.getAllGenres();
    }
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.getSeeAllList(this.props.type);
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
    const { title } = this.props;
    const { salist, alblist, artlist, fremusic, alvideos, algenres }=this.state;
    return (
    <Container style={styles.containerMainDiscover} >
      <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Text style={{color:"#fff",fontWeight : "bold"}}>{title}</Text>            
          </Body>
          <Right>                     
          </Right>
      </Header>
        <Content style={{backgroundColor:theme.DEFAULT_COLOR}} >
        {salist!=null &&
        <SafeAreaView style={{flex: 1}}>
           <FlatList 
              showsVerticalScrollIndicator={false}                  
              data={salist}
              renderItem={({ item }) => <SeeAllComponent
                music={salist}
                post_id = {item.id}  
                post_title={item.title}               
                artist={item.artist}
                post_image={item.artwork}
                post_file = {item.url}
                post_isPurchasable = {item.isPurchasable}  
              /> }
              keyExtractor={(item, index) => {
                return item.id.toString()
              }}                    
            />
       </SafeAreaView>
       }            
        {alblist!=null &&
        <View>
           <FlatList 
              showsVerticalScrollIndicator={false}                  
              data={alblist}
              renderItem={({ item }) => <VerticalListComponent
                color={true} 
                height= {(SCREEN_WIDTH * 21)/100} 
                width={(SCREEN_WIDTH * 21)/100} 
                radius={10}
                post_title = {item.category}                                     
                post_name = {item.description}                                                      
                post_image = {item.image}                                     
              /> }
              keyExtractor={(item, index) => {
                return item.id;
              }}                    
            />
        </View> 
       }      
        {artlist!=null &&
        <View>
           <FlatList 
              showsVerticalScrollIndicator={false}                  
              data={artlist}
              renderItem={({ item }) => <VerticalListComponent
              color={true} 
              height= {(SCREEN_WIDTH * 21) / 100} 
              width={(SCREEN_WIDTH * 21) / 100} 
              radius={10}
              post_title = {item.category}                                     
              post_name = {item.description}                                                                                      
              post_image = {item.image}                                     
            /> }
              keyExtractor={(item, index) => {
                return item.id;
              }}                    
            />
        </View> 
       }      
          {fremusic!=null &&
        <View>
           <FlatList 
              showsVerticalScrollIndicator={false}                  
              data={fremusic}
              renderItem={({ item }) => <FreeMusicComponent
                music={fremusic}
                post_id = {item.id}  
                post_title={item.title}               
                artist={item.artist}
                post_image={item.artwork}
                post_file = {item.url}
                post_isPurchasable = {item.isPurchasable}  
              /> }
              keyExtractor={(item, index) => {
                return item.id;
              }}                    
            />
        </View> 
       }          
          {alvideos!=null &&
        <View>
           <FlatList 
              showsVerticalScrollIndicator={false}                  
              data={alvideos}
              renderItem={({ item }) => <VideoComponent                
                post_id = {item.id}  
                post_title={item.title}               
                artist={item.artist}
                post_image={item.image}
                post_file = {item.file_url}
              /> }
              keyExtractor={(item, index) => {
                return item.id;
              }}                    
            />
        </View> 
       } 

      {algenres!=null &&
        <View>
           <FlatList 
              showsVerticalScrollIndicator={false}                  
              data={algenres}
              renderItem={({ item }) => <VerticalListComponent
                color={true} 
                height={(SCREEN_WIDTH * 21)/100} 
                width={(SCREEN_WIDTH * 21)/100} 
                radius={10}
                post_id = {item.id}                                     
                post_title = {item.category}                                     
                post_name = {item.taxonomy}                                                                                      
                post_image = {item.image}                                     
              /> }
              keyExtractor={(item, index) => {
                return item.id;
              }}                    
            />
        </View> 
       } 
        </Content>              
      </Container>
    );
  }
}