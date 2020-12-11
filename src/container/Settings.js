import React, { Component } from 'react'
import { View ,Dimensions,Share,Modal, FlatList,Linking, TouchableHighlight,Image,AsyncStorage,BackHandler, Alert} from 'react-native';
import { Container, Header, Content,Form ,Input,Item, Footer,Left,Right,Body,Title, Button, Icon, Text,Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
import theme from '../config/theme';
import {Actions} from 'react-native-router-flux';
import { styles } from '../config/style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Settings extends Component {

  constructor(props) {
    super(props)  
    this.state = {
      modalVisible:false,
      ratetheapp:null,
      star1:"#cccc",
      star2:"#cccc",
      star3:"#cccc",
      star4:"#cccc",
      star5:"#cccc",
    }
  }  

  componentWillMount(){
      this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
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
  signOut= async () => { 
      this.setState({ loading : false })
      AsyncStorage.clear();      
      setTimeout(()=>{
        this.setState({ loading : true })
        Actions.auth();           
      }, 700);        
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Tunes liberia',
        message:
        'Please install this app and listen luberian music for everyone at anytime , https://play.google.com/store/apps?hl=en_IN',
          url: 'https://play.google.com/store/apps?hl=en_IN'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType)
        } else {
          console.log("result.activityType","shared")
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  rateTheApp(rate){
    if(rate==1){
      this.setState({ star1:"#eb9534",star2:"#cccc",star3:"#cccc",star4:"#cccc",star5:"#cccc",ratetheapp:rate })
    }
    if(rate==2){
      this.setState({ star1:"#eb9534",star2:"#eb9534",star3:"#cccc",star4:"#cccc",star5:"#cccc",ratetheapp:rate })
    }
    if(rate==3){
      this.setState({ star1:"#eb9534",star2:"#eb9534",star3:"#eb9534",star4:"#cccc",star5:"#cccc",ratetheapp:rate })
    }
    if(rate==4){
      this.setState({ star1:"#eb9534",star2:"#eb9534",star3:"#eb9534",star4:"#eb9534",star5:"#cccc",ratetheapp:rate })
    }
    if(rate==5){
      this.setState({ star1:"#eb9534",star2:"#eb9534",star3:"#eb9534",star4:"#eb9534",star5:"#eb9534",ratetheapp:rate })
    }

  }

  submiteRate(rating){
    this.setModalVisible(!this.state.modalVisible);
    AsyncStorage.getItem('usertoken').then(res => { 
      var formData = new FormData();       
      formData.append("token", res ); 
      formData.append("rating",rating);
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/userAppRating", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {         
        Alert.alert(
          "Message",
            data.msg,
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
        })

    })
  }

    render() {
    const { id , username , image,email,}= this.props
    const {star1,star2,star3,star4,star5,ratetheapp}=this.state        
    return (
    <Container style={styles.containerMainDiscover}>
        <Header transparent>
        <Left>
            <Button transparent onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
        <Body>
            <Title style={{color:"#fff",paddingRight: (SCREEN_WIDTH * 20)/100  }}>Settings</Title>
        </Body>          
        </Header>
        <Content style={{backgroundColor:theme.DEFAULT_COLOR}} > 
        <View style={{padding:1}}>
            <Text style={{color:"white",textAlign:"center",fontSize:18,fontWeight:"bold"}}>Upgrade to Tunit Plus or Tunit Premium</Text>
            <Text note style={{textAlign:"center",}}>start your 7-days free trial to enjoy unlimited</Text>
            <Button rounded   style={{alignSelf:"center",marginTop:5, backgroundColor:theme.PINK_COLOR, }} onPress={()=>Actions.jump('ourplans')} >
                <Text style={{color : theme.WHITE_COLOR,fontWeight : "bold",}} > View plan </Text>
            </Button> 
        </View>
            
        <List style={{paddingRight:10}}>
        <ListItem style={{height:1}}>
          
        </ListItem>
        <ListItem onPress={()=>Actions.jump('myaccount',{username:username,image:image})}>
          <Left>
            <Text style={{color:"white"}}>My Account</Text>
          </Left>
          <Right>
            <Icon name="right"  type="AntDesign" />
          </Right>
        </ListItem>
        <ListItem onPress={()=>Actions.jump('editprofile',{username:username,image:image,email:email})}>
          <Left>
            <Text style={{color:"white"}}>Edit Profile</Text>
          </Left>
          <Right>
            <Icon name="right"  type="AntDesign" />
          </Right>
        </ListItem>
        <ListItem onPress={this.onShare}>
          <Left>
            <Text style={{color:"white"}}>Share App</Text>
          </Left>
          <Right>
          <Icon name="right"  type="AntDesign" />
          </Right>
        </ListItem>
        <ListItem onPress={()=>this.setModalVisible(true)} >
          <Left>
            <Text style={{color:"white"}}>Rate the App</Text>
          </Left>
          <Right>
          <Icon name="right"  type="AntDesign" />
          </Right>
        </ListItem>
        <ListItem onPress={()=>Actions.jump('about')}> 
          <Left>
            <Text style={{color:"white"}}>About</Text>
          </Left>
          <Right>
          <Icon name="right"  type="AntDesign" />
          </Right>
        </ListItem>
        <ListItem onPress={()=> Actions.jump('privacypolicy')}>
          <Left>
            <Text style={{color:"white"}}>Privacy Policy</Text>
          </Left>
          <Right>
              <Icon name="right"  type="AntDesign" />
          </Right>
        </ListItem>
        <ListItem onPress={()=> Actions.jump('contactus')}>
          <Left>
            <Text style={{color:"white"}}>Help/Support</Text>
          </Left>
          <Right>
              <Icon name="right"  type="AntDesign" />
          </Right>
        </ListItem>
      </List>
                    
        <Button rounded style={{alignSelf:"center",marginTop:5, backgroundColor:theme.PINK_COLOR,}} 
            onPress={()=>  Alert.alert(
                'Are You Sure?',
                '', [{
                    text: 'No',
                    onPress: () => { console.log('SignIn Cancel Pressed') },
                    style: 'cancel'
                }, {
                    text: 'Yes',
                    onPress: () => {this.signOut()}
                }, ], {
                    cancelable: false
                }
            ) 
            }>

            <Text style={{color : theme.WHITE_COLOR, fontWeight : "bold", }} > LOGOUT </Text>
        </Button> 
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);

          }}>
          <View style={{marginTop: (SCREEN_HEIGHT*25)/100, marginHorizontal:(SCREEN_WIDTH*5)/100, width:(SCREEN_WIDTH*90)/100,  height:(SCREEN_HEIGHT*60)/100,   alignItems:"center",  backgroundColor:theme.WHITE_COLOR,  borderRadius:20,  shadowColor: "#000",shadowOffset: {width: 0,height: 10,},shadowOpacity: 0.53,shadowRadius: 13.97,elevation: 21,}}>
            <View style={{width : "100%", height : (SCREEN_HEIGHT*20)/100, alignItems:"center",paddingVertical:5}}>
                <Image
                   source={theme.ABOUT_LOGO}                       
                   style={ {        
                    height : "100%", 
                    width : "100%",                           
                    resizeMode: 'contain'                    
                    }}       
                />                
             </View>
              <View style={{width:"100%",alignItems:"center",marginVertical:5,justifyContent:"center", height:(SCREEN_HEIGHT*5)/100}}>
                <Text style={{fontSize:(SCREEN_WIDTH*5)/100,fontWeight:"bold"}}>Rate the App</Text>
              </View>              
              <View style={{width:"75%",marginVertical:5,height:(SCREEN_HEIGHT*5)/100, justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontWeight:"bold",fontSize:(SCREEN_WIDTH*4)/100, textAlign:"center",}}>Well How Was The Process ?</Text>
              </View>
              <View style={{width:"70%",height:(SCREEN_HEIGHT*10)/100,justifyContent:"center", paddingHorizontal:"8%", flexDirection:"row", alignItems:"center"}}>
               <Icon name="star" style={{fontSize: (SCREEN_WIDTH*10)/100, color:star1,marginHorizontal:"2%"}} onPress={()=>this.rateTheApp(1)}/>
               <Icon name="star" style={{fontSize: (SCREEN_WIDTH*10)/100, color: star2,marginHorizontal:"2%"}}  onPress={()=>this.rateTheApp(2)} />
               <Icon name="star" style={{fontSize: (SCREEN_WIDTH*10)/100, color: star3,marginHorizontal:"2%"}}  onPress={()=>this.rateTheApp(3)} />
               <Icon name="star" style={{fontSize: (SCREEN_WIDTH*10)/100, color: star4,marginHorizontal:"2%"}} onPress={()=>this.rateTheApp(4)} />
               <Icon name="star" style={{fontSize: (SCREEN_WIDTH*10)/100, color: star5, marginHorizontal:"2%"}} onPress={()=>this.rateTheApp(5)} />
              </View>              
              <Button full style={{marginVertical:5, backgroundColor:theme.PINK_COLOR,borderRadius:50, marginHorizontal:"20%"}} onPress={() => {this.submiteRate(ratetheapp)}}> 
                <Text style={{color : theme.WHITE_COLOR, fontWeight : "bold",}}>Submit</Text>
             </Button>            
          </View>          
        </Modal>                   
        </Content>
    </Container>
    )
  }
}