import React, { Component, Fragment } from "react";
import { View, Text, BackHandler, ImageBackground, Image, Alert, Dimensions, AsyncStorage} from 'react-native';
import { Container,Icon, Content, Form, Item, Input,Button,Spinner  } from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from  '../config/theme';
import {styles} from '../config/style';
const FORGET_PASSWORD_SCHEMA = yup.object().shape({  
  old_password: yup
   .string()
   .trim()
    .required('Old Password is required!'),
  new_password: yup
   .string()
   .trim()
   .required('New Password is required!'),
   confirm_new_password: yup
   .string()
   .trim()
   .required('Confirm Password is required!')
});

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      loading : false      
    };
  }
  
  componentWillMount(){     
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);    
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);    
  }
  componentWillUnmount() {    
    this.backHandler.remove();
  }
  handleBackPress = () => {
     Actions.pop();
     return true;
  }

  isemail(val){          
    AsyncStorage.getItem('usertoken').then(res => {      
      var formData = new FormData();    
      formData.append("token", res );         
      formData.append("old_password", val.old_password );  
      formData.append("new_password", val.new_password );  
      formData.append("confirm_new_password", val.confirm_new_password );  
      this.setState({ modalVisible: false , loading : true });  
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/change_password", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {         
        this.setState({ loading : false });        
        if(data.status=='ok'){
          Alert.alert(
            'Password Update Successful',
            data.msg,
            [{
              text: "OK",
              onPress: () => { Actions.jump('login') },
              style: "cancel"
             },                  
            ],
            { cancelable: true }
          )          
        }
        else
        {
          Alert.alert(
            'Password not match',
            data.msg,
            [{
              text: "OK",
              style: "cancel"
             },                  
            ],
            { cancelable: true }
          )
        }
       
      })
      .catch((error) => {                    
        this.setState({ loading : false });
        Alert.alert(
          "",
          "Connection Lost",
          [{
            text: "OK",
            style: "cancel"
            },                  
          ],
          { cancelable: true }
        )
      });
    });
  }

  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#fff" />
  }
  render() {
    const { loading } = this.state
    return (
    <ImageBackground source={theme.BACKGROUND} style={{width: '100%', height: '100%'}}>
      <Container style={styles.containerMain}>
        <Content showsVerticalScrollIndicator ={false} > 
          <View style={styles.outerSignIn}>
          <View style ={styles.containerInnerchangePassword}>            
            <View style={{alignItems:"center",height:"30%",padding:"1%" }} >               
              <Image source={theme.LOCK} style={styles.logoSignIn}  />                                                        
             </View>            
             <View style={{height:"70%",justifyContent : "center",paddingTop: "1%",}}>
              <Formik    
                initialValues={{ old_password: '',new_password: '', confirm_new_password: '' }}
                onSubmit={val => this.isemail(val)}
                validationSchema = { FORGET_PASSWORD_SCHEMA }
              >                      
                {({ values, handleChange, handleBlur, errors, touched, isValid, handleSubmit }) => (
                  <Fragment>
                    <Form>   
                    <View style={{height:"58%",justifyContent:"center"}}>                                                                           
                      <Item>
                      <Icon name='lock' type="EvilIcons" />
                      <Input
                          onChangeText={handleChange('old_password')}
                          onBlur={handleBlur('old_password')}
                          value={values.old_password}  
                          placeholder="Old Password"                                                        
                          autoCapitalize="none"  
                          secureTextEntry={true}                              
                        />
                      {touched.old_password && errors.old_password &&
                        <Text style={styles.errorInput} >{errors.old_password}</Text>
                      }  
                      </Item>  
                        <Item >
                      <Icon name='lock' type="EvilIcons" />
                      <Input
                        onChangeText={handleChange('new_password')}
                        onBlur={handleBlur('new_password')}
                        value={values.new_password}  
                        placeholder="New Password"                                                        
                        autoCapitalize="none"   
                        secureTextEntry={true}                             
                      />
                      {touched.new_password && errors.new_password &&
                        <Text style={styles.errorInput} >{errors.new_password}</Text>
                      }  
                      </Item> 
                      <Item > 
                      <Icon name='lock' type="EvilIcons" />
                      <Input
                          onChangeText={handleChange('confirm_new_password')}
                          onBlur={handleBlur('confirm_new_password')}
                          value={values.confirm_new_password}  
                          placeholder="Confirm New Password"                                                        
                          autoCapitalize="none"   
                          secureTextEntry={true}                             
                        />
                      {touched.confirm_new_password && errors.confirm_new_password &&
                        <Text style={styles.errorInput} >{errors.confirm_new_password}</Text>
                      }  
                      </Item>   
                    </View>
                  <View style={{height:"40%", justifyContent:"center",}}>                    
                    <Button full style={styles.changePasswordButton} onPress={handleSubmit}>
                      <Text style={styles.linkText} > Change </Text>
                    </Button>  
                    <Button full style={styles.cancelChangePasswordButton} onPress={()=>Actions.pop()}>
                      <Text style={{color : "black", fontWeight : "bold"}} > Cancel </Text>
                    </Button>
                  </View>
                  </Form>
              </Fragment>     
                )}
            </Formik>  
          </View>
          </View>
          </View>
           { loading && this.renderLoader()}                       
        </Content>
      </Container>
    </ImageBackground>
    );
  }
}