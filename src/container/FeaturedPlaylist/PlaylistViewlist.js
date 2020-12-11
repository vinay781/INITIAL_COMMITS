import React, { Component ,Fragment} from 'react';
import { View,SafeAreaView,TouchableOpacity,BackHandler,AsyncStorage, FlatList,TouchableHighlight,Image, Dimensions} from 'react-native';
import { Container, Header, Content, Left,Right,Body, Button, Icon, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';
import {styles} from '../../config/style';
import FooterComponent from '../../components/FooterComponent';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PlaylistViewlist extends Component {
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

  getSeeAllList = async (cat) =>{      
    AsyncStorage.getItem('usertoken').then(res => {         
        var formData = new FormData();       
        formData.append("token", res ); 
        formData.append("category", cat );
        fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/seeAllsongsByFeatured", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {           
          if(cat=="artists"||cat=="playlists"){
            this.setState({loading : false, alblist:data.musicslist}) 
          }
          else{
            this.setState({loading : false, alblist:data.termlist1})  
          } 
      })
      .catch((error) => { 
        this.setState({ loading : false})                
      });  
    });
  }
  
  renderAlbumList(){    
    var albmview = [];   
    var albm;  
              
      this.state.alblist.forEach(pre => {        
        albm =  <View  style={{  paddingTop:8, margin:(SCREEN_WIDTH*1)/100 }}>
        {(this.props.type=="playlists")?<TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('playlistscreen',{ data :this.state.alblist  , currentmusic:{"id":pre.id, "url":pre.url, "artwork":pre.artwork, "artist":pre.artist, "title":pre.title, "isPurchasable":pre.isPurchasable }})}>       
          
          <View style={{ width:(SCREEN_WIDTH*45)/100, alignItems:"center"}}>
            <Image source={{uri: pre.artwork}} style={{borderRadius:10,height:(SCREEN_WIDTH * 35)/100, width:(SCREEN_WIDTH * 35)/100}}/>  
            <View style={{paddingHorizontal:5,alignItems:"center"}}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={{ color:"white",fontWeight:"bold",color:"#ccc",marginTop:5}}>{pre.title}</Text>
              <Text numberOfLines={2} ellipsizeMode='tail' style={{color:theme.DARK_GREY_COLOR,fontSize:15,fontSize:12 }}>{pre.artist}</Text>                
            </View>
          </View>              
             
      </TouchableHighlight>  :<TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('playlistcategoryview',{title:pre.category,image:pre.image,slug:pre.slug})}>             
            <View style={{ width:(SCREEN_WIDTH*45)/100, alignItems:"center"}}>
              <Image source={{uri: pre.image}} style={{borderRadius:10,height:(SCREEN_WIDTH * 35)/100, width:(SCREEN_WIDTH * 35)/100}}/>  
              <View style={{paddingHorizontal:5,alignItems:"center"}}>
                <Text ellipsizeMode='tail' numberOfLines={2} style={{ color:"white",fontWeight:"bold",marginTop:5}}>{pre.category}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' note style={{fontSize:15,fontSize:12 }}>Tunit Music</Text>                
              </View>
            </View>                    
        </TouchableHighlight>  }    
      </View>;
       albmview.push(albm);
      })   
    return(
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
        {albmview}
      </View>
    )
  }
 
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.getSeeAllList(this.props.type);
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.getSeeAllList(this.props.type);
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
        {alblist!=null &&
        <View style={{padding:(SCREEN_WIDTH*3)/100,}}>
           { this.renderAlbumList() } 
        </View> 
       }      
        </Content> 
        <FooterComponent activeTab={"home"}/>               
      </Container>
    );
  }
}