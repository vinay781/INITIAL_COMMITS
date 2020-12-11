import React, { Component } from 'react';
import {View, Dimensions,Alert,BackHandler,FlatList, StatusBar } from "react-native";
import { Container,Header,Content,Footer,Left,Right,Body,Title,FooterTab,Button,Icon,Text,ListItem,List,Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import CardComponentTop from '../components/CardComponentTop';
import CardComponent from '../components/CardComponent';
import AlbumComponent from '../components/AlbumComponent';
import ArtistHomeComponent from '../components/ArtistHomeComponent';
import GenersHomeComponent from '../components/GenersHomeComponent';
import VideoPlayerComponent from '../components/VideoPlayerComponent';
import MiniPlayer from '../components/MiniPlayer';
import FooterComponent from '../components/FooterComponent';
import theme from  '../config/theme';
import {styles} from '../config/style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      loading : false,
      featured : null,
      newrelease : null,
      albumlist : null,
      artistlist : null,
      videolist : null,
      freemusic : null,
      genrelist : null
    };
  }

  getFeaturedSongs = () => {
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/latestmusic")
    .then(response => response.json())
    .then(data => {             
      this.setState({loading : false, featured : data.musicslist})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  }
  
  getNewRelease = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/music")
    .then(response => response.json())
    .then(data => {       
      this.setState({loading : false, newrelease:data.musicslist})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  } 
  
  getAlbumList = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/GetAlbumsList")
    .then(response => response.json())
    .then(data => {     
      this.setState({loading : false, albumlist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  }

  getArtistList = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getArtists")    
    .then(response => response.json())
    .then(data => {       
      this.setState({loading : false, artistlist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  }

  getVideosList = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/videos")
    .then(response => response.json())
    .then(data => {       
      this.setState({loading : false, videolist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  }

  getFreeMusic = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getFreemusic")
    .then(response => response.json())
    .then(data => {       
      this.setState({loading : false, freemusic:data.musicslist})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  }

  getGenersList = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/GetGenersList")
    .then(response => response.json())
    .then(data => {       
      this.setState({loading : false, genrelist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);      
    this.getFeaturedSongs();
    this.getNewRelease();    
    this.getAlbumList();
    this.getArtistList();
    this.getVideosList();
    this.getFreeMusic();
    this.getGenersList();
  }
  componentDidMount = async () =>{
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
  }  
  componentWillUnmount() {    
    this.backHandler.remove();     
  }
  handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', 
      [{
        text: 'Cancel',
        onPress: () => { console.log('Home exit') },
        style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => {BackHandler.exitApp()}
        }, ], 
        {
          cancelable: false
        }
    )  
    return true;
  }
  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#fff" />
  }
  render() {
    const { loading, featured, newrelease, albumlist, artistlist, genrelist, videolist, freemusic} = this.state      
    return (
      <>
      <StatusBar backgroundColor='#326799' barStyle='light-content'/>
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Body>
            <Title style={{color:"#fff",paddingRight: (SCREEN_WIDTH * 20)/100  }}> Home </Title>
          </Body>
          <Right>
            <Button             
            transparent 
            onPress={()=> { Actions.jump("notification") }}
            >
              <Icon name='bell' type="EvilIcons" style={{ color :"#fff" }}  />              
            </Button>
            <Button             
            transparent 
            onPress={()=> { Actions.jump("search") }}
            >
              <Icon name='search' type="EvilIcons" style={{ color :"#fff" }}  />              
            </Button>            
          </Right>
        </Header>
        <Content style={{backgroundColor:'#0A151F',paddingHorizontal: 15}} >     
        <List> 
          <View>
          {featured==null ? this.renderLoader() :                                    
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={featured}
              renderItem={({ item }) => <CardComponentTop 
              color={true} 
              height={(SCREEN_WIDTH * 50) / 100} 
              width={(SCREEN_WIDTH * 83) / 100} 
              radius={20}
              post_image = {item.artwork}                                     
            /> }
              keyExtractor={(item, index) => {
                return item.id.toString()
              }}                    
            />                      
          }
          </View>
          {/************ NEW RELEASE *********************/}        
          <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>            
            <Text style={{ marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>New Releases</Text>          
            <Button transparent small onPress={()=> { Actions.jump("newreleasesview",{ title : "NEW RELEASE", type : "newrelease" }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>       
            </Button>           
          </View>
          <View>
            { newrelease==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={newrelease}
              renderItem={({ item }) => <CardComponent            
                color={true} 
                height= {(SCREEN_WIDTH * 26) / 100} 
                width={(SCREEN_WIDTH * 26) / 100} 
                radius={6}
                music={newrelease}
                post_title = {item.title}                                                    
                post_file = {item.url}
                post_image = {item.artwork}  
                post_id = {item.id}      
                post_artist = {item.artist}   
                post_isPurchasable = {item.isPurchasable}                                
              /> }
              keyExtractor={(item, index) => {
                return item.id.toString();
              }}                    
            />
            }
          </View>
          {/************ ALBUMS *********************/}          
          <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>            
            <Text style={{marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Albums </Text>         
            <Button transparent small onPress={()=> { Actions.jump("albumview",{ title : "ALBUMS", type : "albums" }) }}>
                <Text style={styles.homeSeeAllButton} > See all </Text>           
            </Button>           
          </View>
          <View>
            { albumlist==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={albumlist}
              renderItem={({ item }) => <AlbumComponent
                color={true} 
                height= {(SCREEN_WIDTH * 26) / 100} 
                width={(SCREEN_WIDTH * 26) / 100} 
                radius={6}
                post_title = {item.category}                                     
                post_name = {item.description}                                     
                post_taxanomy ={item.taxonomy}                                  
                post_image = {item.image?item.image:""}                                   
              /> }
              keyExtractor={(item, index) => { return item.id.toString() }}                    
            />
            }
          </View>
          {/************ ARTISTS *********************/}          
          <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>            
            <Text style={{marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Artists </Text>         
            <Button transparent small onPress={()=> { Actions.jump("artistlistview",{ title : "ARTISTS", type : "artists" }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>          
            </Button>           
          </View>
          <View>
            { artistlist==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={artistlist}
              renderItem={({ item }) => <ArtistHomeComponent            
                color={true} 
                height= {(SCREEN_WIDTH * 26) / 100} 
                width={(SCREEN_WIDTH * 26) / 100} 
                radius={100}
                post_title = {item.category}                                     
                post_name = {item.description}                                     
                post_taxanomy ={item.taxonomy}                                   
                post_image = {item.image}  
                id={item.id}                                   
              /> }
              keyExtractor={(item, index) => { return item.id.toString()}}                    
            />
            }
          </View>
          {/************ VIDEOS *********************/}        
          <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>            
            <Text style={{marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Videos </Text>         
            <Button transparent small onPress={()=> { Actions.jump("videosview",{ title : "VIDEOS", type : "videos" }) }}
              >
              <Text style={styles.homeSeeAllButton} > See all </Text>          
            </Button>          
          </View>
          <View>
            { videolist==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={videolist}
              renderItem={({ item }) => <VideoPlayerComponent            
              color={true} 
              height= {(SCREEN_WIDTH * 26) / 100} 
              width={(SCREEN_WIDTH * 40) / 100} 
              radius={5}
              music={videolist}
              post_title = {item.title}                                     
              post_name = {item.albums!=false && item.albums[0].name}                                     
              post_file = {item.file_url}                                     
              post_image = {item.image}                                     
            />}
              keyExtractor={(item, index) => { return item.id.toString() }}                    
            />
            }
          </View>
          {/************ FREE MUSIC *********************/}         
          <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>            
            <Text style={{marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Listen For Free </Text>         
            <Button transparent small onPress={()=> { Actions.jump("freemusicview",{ title : "FREE MUSIC", type : "freemusic" }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>       
            </Button>         
          </View>
          <View>
            { freemusic==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={freemusic}
              renderItem={({ item }) => <CardComponent            
                color={true} 
                height= {(SCREEN_WIDTH * 26) / 100} 
                width={(SCREEN_WIDTH * 26) / 100} 
                radius={6}
                music={freemusic}
                post_id = {item.id}      
                post_title = {item.title}                                     
                post_image = {item.artwork}  
                post_file = {item.url}
                post_artist = {item.artist}    
                post_isPurchasable = {item.isPurchasable}                                                   
              /> }
              keyExtractor={(item, index) => {
                return item.id.toString()
              }}                    
            />
            }
          </View>
          {/************ GENERES *********************/}
          <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>            
            <Text style={{marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Genres </Text>         
            <Button transparent small onPress={()=> { Actions.jump("genresview",{ title : "GENRES", type : "genres" }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>            
            </Button>         
          </View>
          <View>
            { genrelist==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={genrelist}
              renderItem={({ item }) => <GenersHomeComponent            
                color={true} 
                height= {(SCREEN_WIDTH * 26) / 100} 
                width={(SCREEN_WIDTH * 40) / 100} 
                radius={5}
                post_title = {item.category}                                     
                post_name = {item.description}                                     
                post_taxanomy ={item.taxonomy}                                     
                post_image = {item.image?item.image:""}                                     
              /> }
              keyExtractor={(item, index) => { return item.id.toString() }}                    
            />
            }
          </View>
        </List>        
        </Content>  
        <MiniPlayer/>    
        <FooterComponent activeTab={"home"}/>          
      </Container>
      </>
    );
  }
}