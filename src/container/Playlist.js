import React, { Component} from 'react';
import { View,Dimensions, Image,AsyncStorage,BackHandler, FlatList,Alert} from 'react-native';
import { Container, Header, Content,Left,Right,Body,Title, Button, Icon, Text, List, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from '../config/style';
import MiniPlayer from '../components/MiniPlayer';
import FeaturedPlaylistComponent from '../components/FeaturedPlaylistComponent'
import FooterComponent from '../components/FooterComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partytime : null,
      musicbymood:[],
      gospelinspiration:null,
      artistessentials:null,
      throwitback:null,
      influencersplaylist:null,
      nonstoprap:null
    };    
  }
  getFeaturedPlaylist = () => {
    AsyncStorage.getItem('usertoken').then(res => { 
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getfeaturedPlaylistByadmin?token="+res)
      .then(response => response.json())
      .then(data => {         
        this.setState({loading : false,
        partytime : data.termlist1,
        musicbymood:data.termlist2,
        gospelinspiration:data.termlist3,
        artistessentials:data.artistlist,
        throwitback:data.termlist4,
        influencersplaylist:data.playlist,
        nonstoprap:data.termlist5,
        })  })
      .catch((error) => { 
        this.setState({ loading : false})              
      });
    });
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.getFeaturedPlaylist();
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
    return  <Spinner style={styles.loadingContainer} color="#fff" />
  }
  render() {
    const { partytime,musicbymood,gospelinspiration,artistessentials,throwitback,influencersplaylist,nonstoprap } = this.state
    
    return (
    <Container style={styles.containerMainDiscover} >
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}> Playlist</Title>
          </Body>
          <Right> 
          </Right>
        </Header>
        <Content style={{backgroundColor:'#0A151F',paddingHorizontal: 15}}>      
          <List> 
            {/* **********partytime********** */}
            <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>              
              <Text style={{ marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Party Time</Text>              
              <Button transparent small onPress={()=> { Actions.jump("playlistviewlist",{ title : "Party Time", type : 17 }) }}>
                <Text style={styles.homeSeeAllButton} > See all </Text>       
              </Button>              
            </View>
         
          <View>
         { partytime==null ? this.renderLoader() :  
           <FlatList 
           showsHorizontalScrollIndicator={false}
           horizontal
           data={partytime}
           renderItem={({ item }) => <FeaturedPlaylistComponent            
             color={true} 
             height= {(SCREEN_WIDTH * 26) / 100} 
             width={(SCREEN_WIDTH * 26) / 100} 
             radius={6}
             resizemode={"cover"}
             music={partytime}
             post_title = {item.category}                                                    
             post_image = {item.image?item.image:""}  
             post_id = {item.id}   
             post_artist={"Tunit Music"}   
             post_slug = {item.slug}    
             notshow = {true}                              
           /> }
           keyExtractor={(item, index) => {
             return item.id.toString();
           }}                    
         />
            }    
            </View>

          {/* ********** muisc by mood ********** */}              
          <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>              
              <Text style={{ marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Music By Mood</Text>              
              <Button transparent small onPress={()=> { Actions.jump("playlistviewlist",{ title : "Music By Mood", type : 18 }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>       
              </Button>              
            </View>

          <View>
         { musicbymood.length == 0 ? this.renderLoader() :  
           <FlatList 
           showsHorizontalScrollIndicator={false}
           horizontal
           data={musicbymood}
           renderItem={({ item }) => <FeaturedPlaylistComponent            
             color={true} 
             height= {70} 
             width={150} 
             resizemode={"cover"}
             radius={6}
             music={musicbymood}
             post_title = {item.category}                                                    
             post_image = {item.image?item.image:""}  
             post_id = {item.id}      
             post_slug = {item.slug}  
             post_artist={"Tunit Music"}    
             notshow = {false}                               
           /> }
           keyExtractor={(item, index) => {
             return item.id.toString();
           }}                    
         />
            }    
          </View>
          {/* ********** gospel insperation********** */}       
          <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>              
              <Text style={{ marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Gospel Inspiration</Text>              
              <Button transparent small onPress={()=> { Actions.jump("playlistviewlist",{ title : "Gospel Inspiration", type : 19 }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>       
              </Button>              
            </View>
          <View>
         { gospelinspiration==null ? this.renderLoader() :  
           <FlatList 
           showsHorizontalScrollIndicator={false}
           horizontal
           data={gospelinspiration}
           renderItem={({ item }) => <FeaturedPlaylistComponent            
             color={true} 
             height= {(SCREEN_WIDTH * 26) / 100} 
             width={(SCREEN_WIDTH * 26) / 100} 
             radius={6}
             resizemode={"cover"}
             music={gospelinspiration}
             post_title = {item.category}                                                    
             post_image = {item.image?item.image:""}  
             post_id = {item.id}      
             post_slug = {item.slug}      
             notshow = {true}       
             post_artist={"Tunit Music"}                       
           /> }
           keyExtractor={(item, index) => {
             return item.id.toString();
           }}                    
         />
            }    
            </View>
        {/* **********artist essential********** */}
          <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>              
              <Text style={{ marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Artist Essentials</Text>              
              <Button transparent small onPress={()=> { Actions.jump("playlistviewlist",{ title : "Artist Essentials", type : "artists" }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>       
              </Button>              
            </View>

          <View>
         { artistessentials==null ? this.renderLoader() :  
           <FlatList 
           showsHorizontalScrollIndicator={false}
           horizontal
           data={artistessentials}
           renderItem={({ item }) => <FeaturedPlaylistComponent            
             color={true} 
             height= {(SCREEN_WIDTH * 26) / 100} 
             width={(SCREEN_WIDTH * 26) / 100} 
             radius={6}
             music={artistessentials}
             post_title = {item.category}                                                    
             post_image = {item.image?item.image:""}  
             post_id = {item.id}      
             post_slug = {item.slug}      
             notshow = {true}    
             post_artist={"Tunit Music"}                          
           /> }
           keyExtractor={(item, index) => {
             return item.id.toString();
           }}                    
         />
            }    
            </View>
          {/* **********throw it back********** */}          
          <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>              
              <Text style={{ marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Throw It Back</Text>              
              <Button transparent small onPress={()=> { Actions.jump("playlistviewlist",{ title : "Throw It Back", type : 20 }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>       
              </Button>             
            </View>
       
          <View>
         { throwitback==null ? this.renderLoader() :  
           <FlatList 
           showsHorizontalScrollIndicator={false}
           horizontal
           data={throwitback}
           renderItem={({ item }) => <FeaturedPlaylistComponent            
             color={true} 
             height= {(SCREEN_WIDTH * 26) / 100} 
             width={(SCREEN_WIDTH * 26) / 100} 
             radius={6}
             resizemode={"cover"}
             music={throwitback}
             post_title = {item.category}                                                    
             post_image = {item.image?item.image:""}  
             post_id = {item.id}      
             post_slug = {item.slug}    
             notshow = {true}   
             post_artist={"Tunit Music"}                             
           /> }
           keyExtractor={(item, index) => {
             return item.id.toString();
           }}                    
         />
            }    
            </View>
           {/* **********influencersplaylist********** */}        
           <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>              
              <Text style={{ marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Influencers Playlist</Text>              
              <Button transparent small onPress={()=> { Actions.jump("playlistviewlist",{ title : "Influencers Playlist", type : "playlists" }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>       
              </Button>            
            </View>
          <View>
         { influencersplaylist==null ? this.renderLoader() :  
           <FlatList 
           showsHorizontalScrollIndicator={false}
           horizontal
           data={influencersplaylist}
           renderItem={({ item }) => <FeaturedPlaylistComponent            
             color={true} 
             height= {(SCREEN_WIDTH * 26) / 100} 
             width={(SCREEN_WIDTH * 26) / 100} 
             radius={6}
             resizemode={"cover"}
             music={influencersplaylist}

             post_title = {item.title}                                                    
             post_file = {item.url}
             post_image = {item.image?item.image:""}  
             post_id = {item.id}      
             post_artist = {item.artist}   
             post_isPurchasable = {item.isPurchasable}   
             notshow = {true}    
             artist = {'playlist'}                          
           /> }
           keyExtractor={(item, index) => {
             return item.id.toString();
           }}                    
         />
            }    
            </View>
          {/* **********non stop rap ********** */}          
           <View noBorder style={{marginTop : 10, justifyContent:"space-between",flexDirection:"row"}}>              
              <Text style={{ marginLeft : 10, color:"#fff",fontWeight:"bold",fontSize:16}}>Non Stop Rap</Text>              
              <Button transparent small onPress={()=> { Actions.jump("playlistviewlist",{ title : "Non Stop Rap", type : 21 }) }}>
                <Text style={styles.homeSeeAllButton} > See all </Text>       
              </Button>            
            </View>             
          <View>
          { nonstoprap==null ? this.renderLoader() :  
            <FlatList 
            showsHorizontalScrollIndicator={false}
            horizontal
            data={nonstoprap}
            renderItem={({ item }) => <FeaturedPlaylistComponent            
              color={true} 
              height= {(SCREEN_WIDTH * 26) / 100} 
              width={(SCREEN_WIDTH * 26) / 100} 
              radius={6}
              resizemode={"cover"}
              music={nonstoprap}
              post_title = {item.category}                                                    
              post_image = {item.image?item.image:""}  
              post_id = {item.id}      
              post_slug = {item.slug}    
              notshow = {true}    
              post_artist={"Tunit Music"}                         
            /> }
            keyExtractor={(item, index) => {
              return item.id.toString();
            }}                    
            />
            }    
           </View>
          </List>        
        </Content> 
        <MiniPlayer/>    
        <FooterComponent activeTab={"playlist"}/>               
      </Container>
    );
  }
}