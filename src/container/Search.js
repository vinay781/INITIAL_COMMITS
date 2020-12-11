import React, { Component ,Fragment} from 'react';
import {  StyleSheet, View,  FlatList,Dimensions,TouchableOpacity,  TextInput,TouchableHighlight, ActivityIndicator,BackHandler, Alert} from 'react-native';
import { Container, Header, Content,Form ,Input,Item, Footer,Left,Right,Body,Title, FooterTab, Button, Icon, Text,Card, CardItem, CheckBox,Thumbnail, ListItem, List, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from '../config/theme';
import {styles} from '../config/style';
import SeeAllComponent from '../components/SeeAllComponent';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newrelease : null, 
      genres : [], 
      isLoading: false, 
      text: '',
      gnre: false ,
      togle:false,
      category:"title",
    };
    this.arrayholder = [];
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
  searchSongs(values,category){
    const { text } = values       
    this.setState({ isLoading : true })    
    console.log("Values", "http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/searchmedia?search="+text+"&tags="+category)
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/searchmedia?search="+text+"&tags="+category)
    .then(response => response.json())
    .then(data => {         
      this.setState({ isLoading : false })
      if(data.status == 'ok') {  
        this.setState({ newrelease: data.musicslist})
      }    
      else {
        this.setState({ newrelease: false })
      }   
    })
    .catch((error) => { this.setState({ isLoading : false})                     
    });    
  }   
  searchByCategory(category){
    console.log("search ", category )
  }
  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#fff" />
  }  
  render() {
    const { isLoading, text, newrelease,category, genres, gnre,togle } = this.state    
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent >
          <Left>
            <Button transparent onPress={()=>Actions.pop()}>
              <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
          </Left>
          <Body >
            <Title style={{color:"white"}}>Search</Title>
          </Body>
          <Right >
           <Button transparent onPress={()=>this.setState({togle:!togle})} onPressOut={()=>console.log("onpressout")} >
              <Icon name='filter' type="Feather" style={{ color :"#fff" }}  />
            </Button>           
          </Right>            
        </Header>
        <Content style={{backgroundColor:theme.DEFAULT_COLOR}}  >
         
          <View>
          <TouchableOpacity onPress={()=>this.setState({togle:false})} >
          <View style={{ marginHorizontal : 20, paddingVertical : 20}}>
            <Formik
              initialValues={{ text: ""}}          
              onSubmit={values => this.searchSongs(values, category)}
              validationSchema={yup.object().shape({
                text: yup
                .string()                 
                .trim()
                .required('Please fill to search!')                
              })}
              >
              {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Fragment>
              <Form>
                <Item searchBar rounded >                  
                  <Input 
                    value={values.text}
                    onChangeText={handleChange('text')}
                    onBlur={() =>{ setFieldTouched('text'),console.log("object")}}
                    onFocus={()=>this.setState({togle:false})}
                    placeholder="Search songs" 
                    placeholderTextColor="#ccc"
                    style={{ color : "#fff", paddingLeft : 40}}                  
                    autoCapitalize="none"
                  />
                  { touched.text && errors.text &&
                    <Text style={{ color : "red", position : "absolute",
                      bottom : 0, left : 50 }} >{errors.text}</Text> }
                  <Icon name="ios-search" onPress={handleSubmit} style={{ color: "#fff", paddingRight : 30 }} /> 
                  </Item>                                   
                </Form>
              </Fragment>
              )}
            </Formik>           
          </View>
          {isLoading && this.renderLoader()}         
          <View style={{ marginHorizontal : 20}}>
           { newrelease != null && <FlatList 
                showsHorizontalScrollIndicator={false}              
                data={this.state.newrelease}
                renderItem={({ item }) => <SeeAllComponent
                  music={this.state.newrelease}
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
            /> } 
            { newrelease == false && <View style={{marginVertical:5,paddingHorizontal:10}}>
               <ListItem thumbnail noBorder >              
              <Left>       
                <Thumbnail square source={require("../assets/images/localmusic.png")} style={{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100}} />                
              </Left>
              <Body>
                <Text style={{color:"white",marginBottom:2,fontWeight:'bold'}}>No Songs Found</Text>              
              </Body>              
              <Right>                
              </Right>
            </ListItem>
           </View> }
          </View>
          </TouchableOpacity>
          </View>
        </Content>     
        {togle && <View style={{position:"absolute",top:(SCREEN_HEIGHT*10)/100,right:0,backgroundColor:"#ffff",width:(SCREEN_WIDTH*35)/100,borderTopLeftRadius:10,borderBottomLeftRadius:2}}>
          <Button iconLeft transparent onPress={()=>this.setState({category:"title",togle:false})}>
            <Text style={{marginHorizontal:15,color:"#5c5c5c",fontWeight:"bold"}}>Song Name</Text>
          </Button>
          <Button iconLeft transparent onPress={()=>this.setState({category:"albums",togle:false})} >
            <Text style={{marginHorizontal:15,color:"#5c5c5c",fontWeight:"bold"}}>Album</Text>
          </Button>
          <Button iconLeft transparent  onPress={()=>this.setState({category:"artists",togle:false})}>
            <Text style={{marginHorizontal:15,color:"#5c5c5c",fontWeight:"bold"}}>Artist</Text>
          </Button>
          <Button iconLeft transparent onPress={()=>this.setState({category:"geners",togle:false})} >
            <Text style={{marginHorizontal:15,color:"#5c5c5c",fontWeight:"bold"}}>Geners</Text>
          </Button>
          </View>}         
      </Container>
    );
  }
}