import React, { Component} from 'react';
import { View ,Dimensions,FlatList,Linking, TouchableHighlight,Image,AsyncStorage,BackHandler, Alert} from 'react-native';
import { Container, Header, Content,Left,Right,Body,Title, Button, Icon, Text,Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';
import ProfileComponent from  '../components/ProfileComponent';
import FooterComponent from '../components/FooterComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      profileinfo : null,
      id : null,
      name : null,
      email : null,
      favourites : null,
      playlists : null,
      downloads : null,
      buzzpost : null,
      image: null,
      images : null,
      showbutton:null
    };   
  }
  getProfileInfo=()=>{
    AsyncStorage.getItem('usertoken').then(res => {      
      var formData = new FormData();    
      formData.append("token", res ); 
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/UserProfile", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      //console.log(response.json())
      .then(data => {
        console.log('ProfileFav>> '+data.userinfo.favourites)         
        this.setState({
          loading : true,
          id : data.userinfo.ID,
          name : data.userinfo.display_name,
          email : data.userinfo.email,          
          favourites : data.userinfo.favourites,          
          playlists : data.userinfo.playlists,          
          downloads : data.userinfo.downloads,       
          profileinfo:data
        })    
        if(data.userinfo.profile_pic){
          this.setState({
            image : data.userinfo.profile_pic,
            showbutton:true
          })
        }else{
          this.setState({
            image : "http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g",
            showbutton:true
          })
        }
      })
    }); 
  }
  getBuzzPosts=()=>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getfeaturedbuzz")
    .then(response => response.json())
    .then(data => {    
      if(data.status=="ok"){        
        this.setState({loading : false, buzzpost : data.list})   
      }               
    })
    .catch((error) => { 
      this.setState({ loading : false})      
    });
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.getProfileInfo();
    this.getBuzzPosts();
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
  signOut= async () => { 
    this.setState({ loading : false })
    AsyncStorage.clear();      
    setTimeout(()=>{
      this.setState({ loading : true })
      Actions.auth();           
    }, 700);      
  }  
  render() {
    const { image,loading,showbutton, buzzpost, id, name, email, favourites, playlists, downloads } = this.state    
    return (
    <Container style={styles.containerMainDiscover} >
    <Header transparent>
      <Left>
        <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
          <Icon name='arrow-back' style={{ color :"#fff" }}  />
        </Button>
      </Left>
      <Body>
        <Title style={{color:"#fff" }}> Profile </Title>
      </Body>
      <Right> 
        <Button             
          transparent 
          onPress={()=> { Actions.jump("notification") }}
          >
            <Icon name='bell' type="SimpleLineIcons" style={{ color :"#fff" }} />
          </Button>            
         {image!=null && <Button             
          transparent 
          onPress={()=> { Actions.jump("settings",{ id : id, username : name, image : image,email:email}) }}
          >
            <Icon name='settings' type="SimpleLineIcons" style={{ color :"#fff" }} />
          </Button> }    
          {image==null && <Button             
          transparent 
          // onPress={()=> { Actions.jump("settings",{ id : id, username : name, image : image,email:email}) }}
          >
            <Icon name='settings' type="SimpleLineIcons" style={{ color :"#fff" }} />
          </Button> }       
      </Right>
    </Header>
      <Content style={{backgroundColor:theme.DEFAULT_COLOR}} >        
      <CardItem style={{backgroundColor:theme.DEFAULT_COLOR}} >
            <Left style={{ maxWidth : (SCREEN_WIDTH * 25)/100}}>
            {image==null && <Thumbnail large  source={{uri:"http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g"}} style={{marginHorizontal:10}} />}
            {image!=null && <Thumbnail large  source={{uri:this.state.image}} style={{marginHorizontal:10}} />}
            </Left>
            <Body style={{ justifyContent: "center",}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{color:"white",fontWeight:"bold",fontSize:18,textTransform:"uppercase",marginLeft:10 }}>{name}</Text>    
            </Body>
            <Right></Right>
          </CardItem>
        <View style={{ paddingHorizontal : (SCREEN_WIDTH*29)/100,}}>        
        </View>

          <View style={{flexDirection:"row",paddingHorizontal:"2%",marginTop:10, width:(SCREEN_WIDTH*100)/100}}>
          <TouchableHighlight style={{flexDirection:"column",width:"33%",alignItems:"center"}} activeOpacity={0.6} onPress={() => Actions.jump('myplaylists')}> 
            <View style={{alignItems:"center"}}>
              <Text style={{fontWeight:"bold" ,color:"white",marginBottom:8}}>{playlists != null ? playlists : 0 }</Text>
              <Text style={{fontWeight:"bold",color:theme.DARK_GREY_COLOR}}>PLAYLISTS</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={{flexDirection:"column",width:"33%",alignItems:"center"}} activeOpacity={0.6} onPress={() => Actions.jump('favourites')}>
            <View style={{alignItems:"center"}}>
              <Text style={{fontWeight:"bold", color:"white", marginBottom:8}}>{favourites != null ? favourites : 0 } </Text>
              <Text style={{fontWeight:"bold", color:theme.DARK_GREY_COLOR}}>FAVORITES</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={{flexDirection:"column",width:"33%",alignItems:"center"}} activeOpacity={0.6} onPress={() => Actions.jump('downloads')}>
            <View style={{alignItems:"center"}}>
              <Text style={{fontWeight:"bold" ,color:"white",marginBottom:8}}>{downloads != null ? downloads : 0 }</Text>
              <Text style={{fontWeight:"bold",color:theme.DARK_GREY_COLOR}}>DOWNLOADS</Text>
            </View>
          </TouchableHighlight>
                
          </View>
          <ListItem style={{ marginHorizontal : 15}}></ListItem>
          <View>
          { buzzpost==null ? this.renderLoader() :  
          <FlatList 
            showsVerticalScrollIndicator={false}                  
            data={buzzpost}
            renderItem={({ item }) => <ProfileComponent 
              color={true}
              post_image = {item.image}
              post_description={item.description}
              post_title = {item.title}
            /> }
            keyExtractor={(item, index) => {
              return item.ID;
            }}                    
          />
          }
        </View>                    
      </Content>  
      <FooterComponent activeTab={"profile"}/>                  
      </Container>
    );
  }
}