import React, { Component } from 'react';
import { View,Text,FlatList,BackHandler, AsyncStorage, Image, Dimensions, Modal} from 'react-native';
import { Container,Tab, Tabs,ScrollableTab,Header, Content,Left,Right,Body,Title, Button, Icon, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';
import ProfileComponent from '../components/ProfileComponent';
import FooterComponent from '../components/FooterComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Buzz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page : 0,
      data:null,
      loading : false,
      isliked: '',
      modalVisible : false ,   
    };    
  }
  componentWillMount(){    
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.setState({ loading : true})
    if(this.state.page==0){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    AsyncStorage.getItem('usertoken').then(res => {
      // console.log('UserToken>> ',res)
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz?category=Entertainment&token="+res, requestOptions)
      .then(response => response.json())
      .then(result =>{ 
        // console.log("BUZZ : ", result.list)
        this.setState({ loading : false,data : result.list, isliked: result.list.isliked })
        console.log("Like>> ", this.state.isliked)
      
      })
      .catch(error => console.log('error', error));
    }); 
    }   
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

  tabChange(i){    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    if(i==0){
      this.setState({ loading : true})
      AsyncStorage.getItem('usertoken').then(res => {
        fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz?category=Entertainment&token="+res, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.setState({ loading : false, data:result.list })
        })
        .catch(error => console.log('error', error));
      })
      
    }
    if(i==1){
      this.setState({ loading : true})
      AsyncStorage.getItem('usertoken').then(res => {
        fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz?category=Sports&token="+res, requestOptions)
        .then(response =>response.json())
        .then(result => { this.setState({ loading : false, data:result.list }) })
        .catch(error => console.log('error', error));
      })
      
    }
    if(i==2){
      this.setState({ loading : true})
      AsyncStorage.getItem('usertoken').then(res => {
        fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz?category=Lifestyle&token="+res, requestOptions)
        .then(response =>response.json())
        .then(result => {  this.setState({ loading : false, data:result.list}) })
        .catch(error => console.log('error', error));
      })
      
    }
    if(i==3){
      this.setState({ loading : true})
      AsyncStorage.getItem('usertoken').then(res => {
        fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz?category=Following&token="+res, requestOptions)
        .then(response =>response.json())
        .then(result => { this.setState({ loading : false, data:result.list}) })
        .catch(error => console.log('error', error));
      })
     
    }
  }
  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#fff" />
  }
  render() {
    const{page,data,loading}=this.state
    return (
    <Container style={styles.containerMainDiscover} >
    <Header transparent hasTabs>
      <Left>
          <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
              <Icon name='arrow-back' style={{ color :"#fff" }}  />
          </Button>
      </Left>
      <Body>        
      </Body>
      <Right>            
      </Right>
    </Header>
    <Content style={{backgroundColor:theme.DEFAULT_COLOR}} >  
      <View style={{ flex : 1, justifyContent: 'center', alignItems : "center", paddingVertical : 20}}>
        <Text style={{ color: "#fff", fontSize : 40, fontWeight : "500", fontStyle : "normal"}}> Geez </Text>
      </View>      
      <Tabs initialPage={page}  onChangeTab={({ i }) => this.tabChange(i)} tabBarTextStyle={{fontSize:100}}   tabBarBackgroundColor={theme.DEFAULT_COLOR} tabBarUnderlineStyle={{ marginLeft:"5%", width:20,backgroundColor : "#fff"}} renderTabBar={()=> <ScrollableTab style={{ borderWidth: 0}} tabsContainerStyle={{backgroundColor:theme.DEFAULT_COLOR}} />} >
          <Tab heading="ENTERTAINMENT" tabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTextStyle={{color:"white",fontSize:10}}  style={{backgroundColor:theme.DEFAULT_COLOR, }} >
            <View style={{paddingHorizontal:15}}>          
          { loading && this.renderLoader()}
          { data!=null && <FlatList 
                showsVerticalScrollIndicator={false}                     
                data={data}
                renderItem={({ item }) => <ProfileComponent color={true}
                postid = {item.id}
                post_image = {item.image}
                post_description={item.content}
                post_title = {item.title}
                post_likes = {item.like_count ? item.like_count : 0}
                post_comments = {item.comment_count ? item.comment_count : 0}
                post_share = {item.share_count ? item.share_count : 0}
                post_isliked = {item.isliked}
                post_url = {item.url}
              /> }
              keyExtractor={(item, index) => {
                return item.id.toString();
              }}                    
          />}
            </View>
          </Tab>
          <Tab heading="SPORTS" tabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTextStyle={{color:"white",fontSize:10}} style={{backgroundColor:theme.DEFAULT_COLOR}}>
          <View style={{paddingHorizontal:15}}>          
          { loading && this.renderLoader()}
          { data!=null && <FlatList 
                showsVerticalScrollIndicator={false}                     
                data={data}
                renderItem={({ item }) => <ProfileComponent color={true}
                postid = {item.id}
                post_image = {item.image}
                post_description={item.content}
                post_title = {item.title}
                post_likes = {item.like_count ? item.like_count : 0}
                post_comments = {item.comment_count ? item.comment_count : 0}
                post_share = {item.share_count ? item.share_count : 0}
                post_isliked = {item.isliked}
                post_url = {item.url}
              /> }
                keyExtractor={(item, index) => {
                  return item.id.toString();
                }}                    
          />}
          </View>
          </Tab>
          <Tab heading="LIFESTYLE" tabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTextStyle={{color:"white",fontSize:10}} style={{backgroundColor:theme.DEFAULT_COLOR}}>
          <View style={{paddingHorizontal:15}}>          
          { loading && this.renderLoader()}
          { data!=null && <FlatList 
                      showsVerticalScrollIndicator={false}                      
                      data={data}
                      renderItem={({ item }) => <ProfileComponent color={true}
                      postid = {item.id}
                      post_image = {item.image}
                      post_description={item.content}
                      post_title = {item.title}
                      post_likes = {item.like_count ? item.like_count : 0}
                      post_comments = {item.comment_count ? item.comment_count : 0}
                      post_share = {item.share_count ? item.share_count : 0}
                      post_isliked = {item.isliked}
                      post_url = {item.url}
                    /> }
                      keyExtractor={(item, index) => {
                        return item.id.toString();
                      }}                    
                />}
              </View>
          </Tab>
          <Tab heading="FOLLOWING" tabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTextStyle={{color:"white",fontSize:10}} style={{backgroundColor:theme.DEFAULT_COLOR}}>
          <View style={{paddingHorizontal:15}}>          
          { loading && this.renderLoader()}
          { data!=null && <FlatList 
                      showsVerticalScrollIndicator={false}                      
                      data={data}
                      renderItem={({ item }) => <ProfileComponent color={true}
                      postid = {item.id}
                      post_image = {item.image}
                      post_description={item.content}
                      post_title = {item.title}
                      post_likes = {item.like_count ? item.like_count : 0}
                      post_comments = {item.comment_count ? item.comment_count : 0}
                      post_share = {item.share_count ? item.share_count : 0}
                      post_isliked = {item.isliked}
                      post_url = {item.url}
                    /> }
                      keyExtractor={(item, index) => {
                        return item.id.toString();
                      }}                    
                />}
                </View>
          </Tab>          
        </Tabs>                   
        </Content> 
        <FooterComponent activeTab={"buzz"}/>      
      </Container>
    );
  }
}

