import React, { Component } from "react";
import { View,Image, FlatList,Dimensions, Alert, BackHandler, AsyncStorage} from 'react-native';
import { Container, Header, Content, Thumbnail,Text,Left,Button,Body,Icon,Title, Right, Spinner,ListItem } from "native-base";
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';
import {styles} from '../../config/style';
import MyPlaylistComponent from '../../components/MyPlaylistComponent'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class MyPlaylistSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {  
        loading : false,
        mysongs : null,
        message : false  
    };  
  }
  
  getPlaylistItems=(listid)=>{
    AsyncStorage.getItem('usertoken').then(res => {            
        var formData = new FormData();    
        formData.append("token", res );         
        formData.append("playlist_id", listid ); 

        fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getSongsbyplaylists", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
        .then(response => response.json())
        .then(data => { 
          if(data.status=="ok") {
            this.setState({ mysongs : data.musicslist  })    
          } 
          else {
            this.setState({ message : data.msg  }) 
          }           
        })
        .catch((error) => {   console.log(error);                   
        });
      });
  }

  componentWillMount(){    
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.getPlaylistItems(this.props.playlistid)   
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
    const { loading, mysongs, message } = this.state
    const { playlistid } = this.props
    return (
        <Container style={styles.containerMainDiscover} >
            <Header transparent>
                <Left>
                    <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                        <Icon name='arrow-back' style={{ color :"#fff" }}  />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:"white"}}> MyPlaylistSongs </Title>
                </Body>
                <Right>                    
                </Right>
            </Header>
        <Content>
            
            { message && <View style={{marginVertical:5,paddingHorizontal:10}}>
               <ListItem thumbnail noBorder >              
              <Left>              
                <Thumbnail square source={require("../../assets/images/localmusic.png")} style={{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100}} />                
              </Left>
              <Body>
                <Text style={{color:"white",marginBottom:2,fontWeight:'bold'}}>{message}</Text>                
              </Body>              
              <Right>              
              </Right>
            </ListItem>
           </View>   
           }
            {mysongs!=null &&
                <View>
                <FlatList 
                    showsVerticalScrollIndicator={false}                  
                    data={mysongs}
                    renderItem={({ item }) => <MyPlaylistComponent
                        music={mysongs}
                        post_id = {item.id}  
                        post_title={item.title}               
                        artist={item.artist}
                        post_image={item.artwork}
                        post_file = {item.url}
                        post_isPurchasable = {item.isPurchasable}  
                        post_playlist = {playlistid}
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