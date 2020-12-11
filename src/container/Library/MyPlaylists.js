import React, { Component, Fragment } from "react";
import { View,Modal,Image,TouchableHighlight,FlatList,Dimensions,NativeModules,TouchableOpacity, Alert, BackHandler, AsyncStorage} from 'react-native';
import { Container, Header, Content, Item, Input,Button,Title, Card, CardItem, Text, Icon,Left,Body,Right, Spinner } from "native-base";
import {Actions} from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from '../../config/theme';
import {styles} from '../../config/style';
import PlaylistComponent from '../../components/PlaylistComponent';
var ImagePicker = NativeModules.ImageCropPicker;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class MyPlaylists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      playlist : null,
      modalVisible : false ,     
      newimage :null
    };
  }
  getPlaylistByUser=()=>{
    AsyncStorage.getItem('usertoken').then(res => {         
      var formData = new FormData();    
      formData.append("token", res ); 
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getPlaylistByuser", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {         
        this.setState({ playlist : data.playlist  })            
      })
      .catch((error) => { console.log(error) });
    }); 
  }
  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    }).then(image => {      
      this.setState({
        newimage: { 
          uri: Platform.OS === 'ios' ? `data:${image.mime};base64,`+ image.data : image.path, 
          width: image.width, 
          height: image.height
        }
      });
    }).catch(e =>  Alert.alert(
      "",
      e.message,
      [{
        text: "OK",
        style: "cancel"
        },                  
      ],
      { cancelable: true }
    ))
  }
  createPlaylist(title,newimage) {    
    AsyncStorage.getItem('usertoken').then(res => {         
      var formData = new FormData();    
      formData.append("token", res );       
      formData.append("title", title );
      newimage!=null && formData.append("image", {               
        name: title + ".jpeg",            
        type: 'image/jpg',
        uri: newimage.uri,  
      } );      
      this.setState({ loading : true })      
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/createPlaylistByUser", { method:  'POST', headers: {'Content-Type':  'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => { 
        this.setState({ modalVisible : false ,loading : false });
        if(data.status=="ok")
        {                       
          Alert.alert(
            "Success",
            data.msg,
            [{
              text: "OK",
              style: "cancel"
              },                  
            ],
            { cancelable: true }
          )
          this.getPlaylistByUser();
        }        
      })
      .catch((error) => {                 
        this.setState({ modalVisible : false ,loading : false });              
      });
    }); 
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.getPlaylistByUser();
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
    return  <Spinner style={styles.loadingContainer} color={theme.DEFAULT_COLOR} />
  }
  render() {
    const { loading, playlist, modalVisible,newimage } = this.state
    return (
        <Container style={styles.containerMainDiscover} >
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}> My Playlists</Title>
          </Body>
          <Right>            
          </Right>
        </Header>
        <Content>
          <TouchableHighlight activeOpacity={0.6}  onPress={() => this.setState({ modalVisible : true })}>
            <Card style={{ backgroundColor:"#0A151F", borderColor :"#0A151F"}}>
              <CardItem style={{ backgroundColor:"#0A151F", }}>
                <Left>
                  <Icon style={{ color:"#fff",fontSize: 20, backgroundColor:"#326799", padding : 10 }} name="plus" type="FontAwesome5" />
                  <Body>
                    <Text style={{ color:"#fff", fontSize : 18}} > Create Playlist </Text>                  
                  </Body>
                </Left>              
              </CardItem>
            </Card>
          </TouchableHighlight>
          { playlist &&  <View>
            <FlatList 
                showsVerticalScrollIndicator={false}    
                  data={playlist}
                  renderItem={({ item }) =>  <PlaylistComponent                    
                    post_id = {item.id}  
                    post_userid = {item.user_id}  
                    post_title={item.playlist_title}               
                    post_date={item.date}               
                    post_image={item.playlist_image}               
                  />            
                  }
                  keyExtractor={(item, index) => {
                    return item.id;
                  }}                              
                />
            </View>
            }
             
        </Content>
          <Modal 
            animationType="slide"
            transparent={true}
            presentationStyle="overFullScreen"            
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
              <View style={{ height:(SCREEN_HEIGHT*100)/100, backgroundColor : "transparent" }}>
                <View style={{ marginTop: (SCREEN_WIDTH*30)/100,height:"50%",  marginHorizontal:(SCREEN_WIDTH*5)/100, width:(SCREEN_WIDTH*90)/100,  alignItems:"center",  backgroundColor:theme.WHITE_COLOR, borderRadius:20, shadowColor: "#000", shadowOffset: {width: 0,height: 10,},shadowOpacity: 0.53, shadowRadius: 13.97, elevation: 21,}}>  
                  <View style={{ width : "100%",}}>
                    <Button transparent  onPress={()=>  this.setState({ modalVisible : false })} >
                        <Icon name='close' style={{ color :"#000" }}  />            
                    </Button>                
                  </View>             
                  <View style={{ height:"80%", width: "100%", justifyContent : "center", alignContent : "center" }}>
                  <View style={styles.containerInnerImage} >
                        <View  style={{ width : (SCREEN_WIDTH * 30) / 100, height : (SCREEN_WIDTH * 30) / 100,}}>
                          <TouchableOpacity onPress={() => this.pickSingleBase64(false)}> 
                           {  (newimage != null) ? <Image   source={newimage}   style={{ width : "100%",height : "100%",   borderRadius:50,}}    /> :
                           <Image   source={require("../../assets/images/playlist.png")} style={styles.accountProfileImage} />}  
                  </TouchableOpacity>
                  </View>                  
                  </View>
                  <Formik
                    initialValues={{ title : "" }}                
                    onSubmit={(values) => { this.createPlaylist(values.title,newimage)  }}
                    validationSchema={yup.object().shape({
                      title: yup  
                        .string()               
                        .trim()                       
                        .required('Please Enter Title')      
                    })}
                    >
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                  <Fragment>
                    <View style={{width:"100%",justifyContent:"center", paddingHorizontal:"8%",marginVertical:10, flexDirection:"row", alignItems:"center"}}>
                      <Item style={{width:"80%"}}>                    
                        <Input 
                            style={styles.formInputs} 
                            placeholder='Playlist Name'
                            value={values.title}
                            onChangeText={handleChange('title')}
                            onBlur={() => setFieldTouched('title')}
                            underlineColor="transparent"                 
                                                                                        
                          />
                          { touched.title && errors.title &&
                            <Text style={styles.errorInput} >{errors.title}</Text>
                          }
                      </Item>
                  
                    </View>                    
                      <View style={{ marginTop : 20,justifyContent:"center", alignContent:"center",alignItems:"flex-end"}}>                       
                        <View  style={{paddingTop:10}}>
                          <Button style={styles.logOutButton} onPress={handleSubmit}>
                           {!loading &&  <Text style={styles.linkTextLo} > SAVE </Text>}
                            { loading && this.renderLoader() }
                        </Button> 
                        </View>
                      </View>
                    </Fragment>
                      )}
                  </Formik>  
                  </View>                  
                </View>
              </View>
          </Modal>
      </Container>
    );
  }
}