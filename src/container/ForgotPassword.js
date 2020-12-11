import React, { Component, Fragment } from "react";
import { View, Text , BackHandler, ImageBackground, Image, Alert, Modal, Dimensions, AsyncStorage} from 'react-native';
import { Container, Header,Icon, Content, Form, Item, Input,ListItem,  Radio, Right, Left ,Button,Spinner  } from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from  '../config/theme';
import {styles} from '../config/style';

const FORGET_PASSWORD_SCHEMA = yup.object().shape({  
  confirm_email: yup.string().email('Please enter valid email').required('Required')
});

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      loading : false,      
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
      var formData = new FormData();          
      formData.append("user_login", val.confirm_email );  
      this.setState({ loading : true });  
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/forgot_password", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {         
        this.setState({ loading : false });        
        if(data.status=='ok'){
          Alert.alert(
            'Email sent',
            data.msg,
            [{
              text: "OK",
              onPress: () => { Actions.pop() },
              style: "cancel"
             },                  
            ],
            { cancelable: true }
          )          
        }
        else
        {
          Alert.alert(
            'Email not Exists',
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
          <View style ={styles.containerInnerForgotPassword}>            
            <View style={{alignItems:"center",height:"40%"}} >               
                <Image
                  source={theme.ENVELOP}                       
                  style={styles.logoSignIn}       
                />                                                        
             </View>
            <View style={{height:"20%",justifyContent : "center", alignContent : "center"}}>
            <Text style={{color:'#ccc',fontSize:13, textAlign : "center"}} >Dont worry Resetting your password easy, just Choose the Email or Phone option to resetting your password. </Text>
            </View>
             <View style={{height:"40%",justifyContent : "center"}}>
              <Formik    
                initialValues={{ confirm_email: '' }}
                onSubmit={val => this.isemail(val)}
                validationSchema = { FORGET_PASSWORD_SCHEMA }
              >
                
                {({ values, handleChange, handleBlur, errors, touched, isValid, handleSubmit }) => (
                  <Fragment>
                    <Form>                                                                              
                      <Item>
                      <Icon name='envelope' type="EvilIcons" />
                      <Input
                            onChangeText={handleChange('confirm_email')}
                            onBlur={handleBlur('confirm_email')}
                            value={values.confirm_email}  
                            placeholder="Email address"                                                        
                          autoCapitalize="none"                                
                        />
                      {touched.confirm_email && errors.confirm_email &&
                        <Text style={styles.errorInput} >{errors.confirm_email}</Text>
                      }  
                      </Item>                          
                      <Button full style={styles.submitButton} onPress={handleSubmit}>
                          <Text style={styles.linkText} > GENERATE RECOVERY CODE </Text>
                  </Button>  
                  </Form>
              </Fragment>     
                )}
              </Formik>  
          </View>
          </View>
          </View>

           { loading && this.renderLoader()}          
           <View style={styles.bottomLinks}>
              <View style={styles.bottomTextTermsConditions}>      
              <Text style={{color : theme.WHITE_COLOR, height : 40,paddingVertical : 10}}>Already Have an Account?</Text>
              <Text style={{color : theme.WHITE_COLOR, height : 40,paddingVertical : 10,fontWeight:"bold"}} onPress={()=>Actions.pop()} > Sign in </Text>                                    
              </View>  
           </View>                       
        </Content>
      </Container>
  </ImageBackground>
    );
  }
}
