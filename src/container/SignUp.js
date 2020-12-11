import React, { Component, Fragment } from "react";
import { View, Text,ImageBackground,Image,BackHandler, Alert} from 'react-native';
import { Container, Header,Icon, Content, Form, Item, Input,ListItem,  Radio, Right, Left ,Button, Spinner  } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from  '../config/theme';
import {styles} from '../config/style'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isremember : false,
      loading : false
    };
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
  
  usersignup(val)
  {         
    var formData = new FormData();
    formData.append( "first_name", val.fullname );            
    formData.append( "email",  val.email );   
    formData.append( "username",  val.username );   
    formData.append( "password",  val.password );   
    this.setState({ loading : true})
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/register", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    .then(response => response.json())
    .then(data => {       
      this.setState({ loading : false})
      if(data.status == 'ok') {  
        Alert.alert(
          "Ready to SignIn",
          data.msg,
          [{
            text: "OK",
            style: "cancel", 
            onPress: () =>  Actions.jump('login')
            }                 
          ],
          { cancelable: true }
        )           
      } else {
        Alert.alert(
          "Validation Error",
          "Password must be at least 8 characters, at least one lower case letter, one upper case letter and one digit",
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
      this.setState({ loading : false})         
    })   
  }
  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#fff" />
  }
  render() {
    const { isremember, loading } = this.state
    return (
    <ImageBackground source={theme.BACKGROUND} style={{width: '100%', height: '100%'}}>
    <Container style={styles.containerMain} >
        <Content showsVerticalScrollIndicator ={false}> 
          <View style ={styles.containerInnerSignup}>
            <View style={styles.containerInnerimg} >
                <Image
                   source={theme.LOGO_APP}                       
                   style={styles.logoSignIn}       
                /> 
             </View>
             <Formik
                initialValues={{ fullname: "", username : "", email: "", password: "" }}                
                onSubmit={values => this.usersignup(values)}
                validationSchema={yup.object().shape({
                  fullname: yup
                    .string()                    
                    .trim()
                    .required('Full name is required!'),
                  email: yup
                    .string()
                    .email('Enter valid email address!')
                    .trim()
                    .required('Email is required!'),
                  username: yup
                    .string()                    
                    .trim()
                    .required('Username is required!'),
                  password: yup
                    .string()
                    .trim()
                    .required('Password is required!')                
                })}
                >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <Fragment>
                <Form>
                <Item style={styles.inputItem} >
                    <Icon name='user' type="EvilIcons" />
                    <Input 
                      value={values.fullname}
                      onChangeText={handleChange('fullname')}
                      onBlur={() => setFieldTouched('fullname')}
                      placeholder='Full Name'                                                          
                      underlineColor="transparent"                 
                      autoCapitalize="none"                    
                    />
                    { touched.fullname && errors.fullname &&
                        <Text style={styles.errorInput} >{errors.fullname}</Text>
                    }
                  </Item>
                  <Item style={styles.inputItem} >
                    <Icon name='envelope' type="EvilIcons" />
                    <Input 
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      placeholder="Email"                                                          
                      underlineColor="transparent"                 
                      autoCapitalize="none"
                    />
                    { touched.email && errors.email &&
                      <Text style={styles.errorInput} >{errors.email}</Text>
                    }
                  </Item>
                  <Item style={styles.inputItem} >
                    <Icon  name='user' type="EvilIcons" />
                    <Input 
                      value={values.username}
                      onChangeText={handleChange('username')}
                      onBlur={() => setFieldTouched('username')}
                      placeholder='Username'
                                                          
                      underlineColor="transparent"                 
                      autoCapitalize="none"                    
                    />
                    { touched.username && errors.username &&
                        <Text style={styles.errorInput} >{errors.username}</Text>
                    }
                  </Item>
                  <Item style={styles.inputItem} >
                    <Icon  name='lock' type="EvilIcons" />
                    <Input 
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      placeholder="Password"                      
                      underlineColor="transparent"                      
                      autoCapitalize="none"
                      secureTextEntry={true}                        
                    />
                    { touched.password && errors.password &&
                      <Text style={styles.errorInput} >{errors.password}</Text>
                    }  
                  </Item>                    
                  <Button full style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.linkText} >SIGN UP</Text>
                  </Button>                  
                </Form>
              </Fragment>
                )}
            </Formik>  
          </View>     
          { loading && this.renderLoader()}               
          
          <View style={styles.bottomLinks}>
            <View style={styles.bottomTextTermsConditions}> 
              <Text style={{color : theme.WHITE_COLOR, height : 40,paddingVertical : 10}}>Already Have an Account?</Text>
              <Text style={{color : theme.WHITE_COLOR, height : 40,paddingVertical : 10,fontWeight:"bold"}} onPress={()=>Actions.jump('login')} > Sign in </Text>           
            </View>   
            <View>
              <Text style={styles.footerLinkText} 
              > Terms {`&`} Conditions </Text>   
              </View>  
          </View>
        </Content>
      </Container>
  </ImageBackground>
    );
  }
}