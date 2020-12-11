import React, { Component ,Fragment} from 'react';
import { View,SafeAreaView,TouchableOpacity,BackHandler,FlatList,TouchableHighlight,Image,AsyncStorage, Dimensions} from 'react-native';
import { Container, Header, Content, Left,Right,Body, Button, Icon, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';
import {styles} from '../../config/style';
import axios from 'axios';
import FooterComponent from '../../components/FooterComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class FreeMusicView extends Component {
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
 
  getAllFreeMusics = async () =>{    
    axios.get('http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getAllFreemusic')    
    .then(res => {  
      console.log("Music Data>> ", res.data.musicslist)                  
      this.setState({loading : false, fremusic:res.data.musicslist})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  }
  
  featuredlist = async (id,tags) =>{
    AsyncStorage.getItem('usertoken').then(res => { 
      var formData = new FormData();       
      formData.append("token", res ); 
      formData.append("artist_id", id );
      formData.append("tags", tags );

      const user = {
       body:formData
      };      
      axios.post('http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/seeAllByartists',{user})
      .then(res => {      
       this.setState({loading : false, fremusic:res.data.musicslist})              
    })
    .catch((error) => { 
      this.setState({ loading : false})            
    });
  });
  }
  renderAllFreeMusicList(){    
    var freemusicview = [];   
    var freemusic;                
    this.state.fremusic.forEach(pre => {        
        freemusic =  <View  style={{  paddingTop:8, margin:(SCREEN_WIDTH*1)/100 }}>
        <TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('playlistscreen',{ data :this.state.fremusic  , currentmusic:{"id":pre.id, "url":pre.url, "artwork":pre.artwork, "artist":pre.artist, "title":pre.title, "isPurchasable":pre.isPurchasable }})}>                 
            <View style={{ width:(SCREEN_WIDTH*45)/100, alignItems:"center"}}>
              <Image source={{uri: pre.artwork}} style={{borderRadius:10,height:(SCREEN_WIDTH * 35)/100, width:(SCREEN_WIDTH * 35)/100}}/>  
              <View style={{paddingHorizontal:5,alignItems:"center"}}>
                <Text ellipsizeMode='tail' numberOfLines={2} style={{ color:"white",fontWeight:"bold",color:"#ccc",marginTop:5}}>{pre.title}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={{color:theme.DARK_GREY_COLOR,fontSize:15,fontSize:12 }}>{pre.artist}</Text>                
              </View>
            </View>                             
        </TouchableHighlight>      
      </View>;
       freemusicview.push(freemusic);
      })
    
    return(
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
        {freemusicview}
      </View>
    )
  }
   getSeeAllList = (type) =>{    
    if(type=="newrelease") {
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
    if(type=="Featuredartist"){
     this.featuredlist(this.props.id,this.props.tags)
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
       
        {fremusic!=null &&
        <View style={{padding:(SCREEN_WIDTH*3)/100,}}>
           { this.renderAllFreeMusicList() } 
        </View> 
       }          
        </Content>      
        <FooterComponent activeTab={"home"}/>     
      </Container>
    );
  }
}