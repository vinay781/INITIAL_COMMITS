import React, { Component } from 'react';
import { View,BackHandler,TouchableHighlight,Image, Dimensions, AsyncStorage} from 'react-native';
import { Container, Header, Content, Left,Right,Body, Button, Icon, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';
import {styles} from '../../config/style';
import FooterComponent from '../../components/FooterComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class NewReleasesView extends Component {
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

  nreleaseartist = async (id) =>{
    AsyncStorage.getItem('usertoken').then(res => { 
      var formData = new FormData();       
      formData.append("token", res ); 
      formData.append("artist_id", id );
      formData.append("tags", "music" );
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/seeAllByartists", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    .then(response => response.json())
    .then(data => { 
      this.setState({loading : false, salist:data.musicslist})          
    })
    .catch((error) => { 
      this.setState({ loading : false})              
    });
  });
  }
  
  renderAllNewReleaseList(){    
    var nreleaseview = [];   
    var nrelease;                
    this.state.salist.forEach(pre => {        
        nrelease =  <View  style={{  paddingTop:8, margin:(SCREEN_WIDTH*1)/100 }}>
        <TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('playlistscreen',{ data :this.state.salist  , currentmusic:{"id":pre.id, "url":pre.url, "artwork":pre.artwork, "artist":pre.artist, "title":pre.title, "isPurchasable":pre.isPurchasable }})}>                
            <View style={{ width:(SCREEN_WIDTH*45)/100, alignItems:"center"}}>
              <Image source={{uri: pre.artwork}} style={{borderRadius:10,height:(SCREEN_WIDTH * 35)/100, width:(SCREEN_WIDTH * 35)/100}}/>  
              <View style={{paddingHorizontal:5,alignItems:"center"}}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ color:"white",fontWeight:"bold",color:"#ccc",marginTop:5}}>{pre.title}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={{color:theme.DARK_GREY_COLOR,fontSize:15,fontSize:12 }}>{pre.artist}</Text>                
              </View>
            </View>                  
        </TouchableHighlight>      
      </View>;
       nreleaseview.push(nrelease);
      })
    
    return(
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
        {nreleaseview}
      </View>
    )
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
    if(type=="Fromartist"){
      this.nreleaseartist(this.props.id)
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
        <View style={{padding:(SCREEN_WIDTH*3)/100,}}>
           { this.renderAllNewReleaseList() } 
        </View> 
       }            
        </Content>  
        <FooterComponent activeTab={"home"}/>             
      </Container>
    );
  }
}