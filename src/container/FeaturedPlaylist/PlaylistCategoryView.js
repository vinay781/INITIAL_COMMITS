import React, { Component ,Fragment} from 'react';
import { View ,TouchableOpacity,FlatList,Switch, Image,AsyncStorage,BackHandler,Dimensions, Alert} from 'react-native';
import { Container, Header, Content,Form ,Input,Item, Footer,Left,Right,Body,Title, FooterTab, Button, Icon, Text,Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import PlaylistCatagoryViewComponent from './PlaylistCatagoryViewComponent';
import theme from '../../config/theme';
import {styles} from '../../config/style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PlaylistCategoryView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      catlist : [] ,  
      isEnabled :false ,
      isfavourite:false, 
      favCount:null
    };     
  }
  toggleSwitch = () => {
      this.setState({isEnabled:!this.state.isEnabled})
       if(!this.state.isEnabled){
        Alert.alert(
            "Dowload Song",
            "Under progress",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );   
       }
}
 favoriteunfavorite = async (id) => {   
  await AsyncStorage.getItem('usertoken').then(res => {        
    var formData = new FormData();    
    formData.append("token", res );       
    formData.append("postid", id );   
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/updatefavourites", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    .then(response => response.json())
    .then(data => {          
      if(data.isfavourite == "1")
      {
        this.setState({isfavourite:true})
        Alert.alert(
          "",
          data.msg,
          [{
            text: "OK",
            onPress:()=>{Actions.refresh({key:"playlistcategoryview"})},               
            }                 
          ],
          { cancelable: true }
        )           
      }
      if(data.isfavourite == "0")
      {
        this.setState({isfavourite:false})
        Alert.alert(
          "",
          data.msg,
          [{
            text: "OK",
            onPress:()=>{Actions.refresh({key:"playlistcategoryview"})},               
            }                 
          ],
          { cancelable: true }
        )   
      }         
    })    
  });    
}

trackChange = async (id) => {       
  AsyncStorage.getItem('usertoken').then(res => {          
    var formData = new FormData();       
    formData.append("token", res ); 
    formData.append("postid", id );
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/checkfavouriteByuser", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    .then(response => response.json())
    .then(data => {     
      if(data.isfavorite=="1"){         
        this.setState({isfavourite:true})              
      } else {         
        this.setState({isfavourite:false})              
      }     
    })    
  }); 
}
onShare(){
  Alert.alert(
    "Share Song",
    "Under  progress",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );  
}

  loadCategoryData = (slug,id) => {      
    AsyncStorage.getItem('usertoken').then(res =>{       
        var formData = new FormData();       
        formData.append("token", res ); 
        formData.append("category",slug );
        formData.append("post_id",id);
        fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/viewFeaturedlistSongs", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {         
        this.setState({loading : false, catlist:data.musicslist,favCount:data.favCount})          
      })
      .catch((error) => { 
        this.setState({ loading : false})                
      });  
    });
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);    
    this.loadCategoryData(this.props.slug,this.props.id);
    this.trackChange(this.props.id)
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);    
    this.loadCategoryData(this.props.slug,this.props.id);    
  }
  componentWillUnmount() {    
    this.backHandler.remove();     
  }
  handleBackPress = () => {
      Actions.pop();
      return true;
  }
  render() {
    const { title, name, image,id } = this.props;
    const { catlist ,isEnabled,isfavourite,favCount} = this.state;
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
        <View style={styles.containerInnerImageAlbums} >
            <View style={{ width : (SCREEN_WIDTH * 60) / 100, height : (SCREEN_WIDTH * 60) / 100 }}>
              <Image source={{uri :image}} style={styles.AlubmsImage} resizeMode="cover" />
            </View>
            <View style={styles.textTitleAlbums} >
              <Text style={styles.titleAlbums}>{title}</Text> 
              <Text note style={{ fontWeight:"300", fontSize:16,textAlign:"center"}}>Tunit Music</Text>
            </View>
            <View style={{flexDirection:"row",marginVertical:10, width:(SCREEN_WIDTH*100)/100,alignItems:"center", justifyContent:"center"}}>
              <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                <Text style={{ fontSize:12,textAlign:"center", color:"#fff"}}> 56K </Text> 
                <Text note style={{ fontSize:12,textAlign:"center"}}> Followers </Text> 
              </View>
              <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                <Text style={{ fontSize:12,textAlign:"center", color:"#fff"}}> | 18M </Text> 
                <Text note style={{ fontSize:12,textAlign:"center"}}> Plays </Text> 
              </View>
              <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                <Text style={{ fontSize:12,textAlign:"center", color:"#fff"}}> | 6K </Text> 
                <Text note style={{ fontSize:12,textAlign:"center"}}> Shares </Text>  
              </View>                        
            </View>

            <View style={{ justifyContent : "center"}}>
              <View style={{ width:"100%",height:1,backgroundColor:"#fff",position:"absolute",zIndex:-1}}></View>
              <View style={{flexDirection:"row",marginTop:5, width:(SCREEN_WIDTH*100)/100,justifyContent:"space-around",alignItems:"center"}}>
                { isfavourite ? <Icon name='favorite' type="MaterialIcons" style={{ color :"#ffff",backgroundColor:theme.DEFAULT_COLOR}} onPress={()=>{this.favoriteunfavorite(id)}}  /> : <Icon name='favorite-border' type="MaterialIcons" style={{ color :"#ffff",backgroundColor:theme.DEFAULT_COLOR}} onPress={()=>{this.favoriteunfavorite(id)}} /> }
                
                {catlist.length != 0 && <Button style={{ borderRadius:10,paddingHorizontal:10,height:40,backgroundColor:theme.BLUE_COLOR}} onPress={()=>Actions.jump('playlistscreen',{ currentmusic:catlist})}>
                  <Text style={{ fontWeight : "600"}}>PLAY</Text></Button>}

                <Icon name='share-outline' type="MaterialCommunityIcons" style={{ color :"#ffff",backgroundColor:theme.DEFAULT_COLOR}} onPress={()=>this.onShare()} />
              </View>
            </View>

            <View style={{flexDirection:"row",margin:10, width:(SCREEN_WIDTH*90)/100,justifyContent:"space-between",alignItems:"center"}}>
            <View>
                <Text style={{fontWeight:"bold",color:"white",fontSize:20}}>Download</Text>
            </View>
            <View>
            <Switch                
              trackColor={{ false: "#ddd", true: "#ddd" }}
              thumbColor={isEnabled ? theme.PINK_COLOR : "#ddd"}
              ios_backgroundColor="#ccc"
              onValueChange={this.toggleSwitch}
              value={isEnabled}
            />
          </View>
          </View>     
        </View>
        <View>
          <FlatList 
            showsVerticalScrollIndicator={false}                  
            data={catlist}
            renderItem={({ item }) =>   <PlaylistCatagoryViewComponent
            music={catlist}
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
            />
          </View>                           
        </Content>              
      </Container>
    );
  }
}