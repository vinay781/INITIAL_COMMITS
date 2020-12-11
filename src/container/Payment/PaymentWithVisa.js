import React, { Component,Fragment } from "react";
import { Container, Header, Content, Card,Left,List, ListItem, CardItem,Form,Label,Input, Item, Text, Body,Button,Icon,Title, Right, View } from "native-base";
import {Dimensions,TouchableHighlight,Image, Alert} from  'react-native'
import * as yup from 'yup';
import { Formik } from 'formik';
import { Actions } from "react-native-router-flux";
import { styles } from "../../config/style";
import theme from "../../config/theme";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PaymentWithVisa extends Component {
    
  render() {
    const { trialdays, amount } = this.props
    return (
      <Container style={{backgroundColor:theme.DEFAULT_COLOR}}>
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }} />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"#fff"}}>Payment</Title>
          </Body>
          <Right>             
          </Right>
        </Header>
      
        <Content padder style={{padding:10,backgroundColor:"#efeff1"}}>
          <Card style={{ elevation:5 ,borderWidth:10,padding:5}}> 
          <List>
          <ListItem icon noBorder>
            <Left>
              <Icon name='chevron-down' type="MaterialCommunityIcons" style={{ color :"#bebebf" }}  />              
              <Image source={theme.VISA} style={{width:30,height:30}}/>
              <Image source={theme.MASTERCARD} style={{width:30,height:30}}/>
            </Left>
            <Body>              
            </Body>
            <Right>
            </Right>
          </ListItem>          
            <ListItem noBorder>
                <Card style={{backgroundColor:"#dff1d8",padding:10}}>             
                <Text style={{color:"#96bb8e"}}>You will not be charged before the end of your trail period which ends on the mm/dd/yyyy.</Text>
                <Text style={{color:"#96bb8e"}}>No commitments. you can cancel at any time.</Text>              
              </Card>
            </ListItem>            
            <ListItem noBorder>
              <Left>
                {/* <Text>Dejan Lovren</Text> */}
              </Left>
              <Right>
                {/* <Icon name="arrow-forward" /> */}
              </Right>
            </ListItem>
            <Formik
                initialValues={{ cardnumber : "", exp_month: "", exp_year: "", cvc: "" }}                
                onSubmit={(values) => {  Alert.alert('In Progress') }}
                validationSchema={yup.object().shape({
                cardnumber: yup  
                    .string()               
                    .trim()
                    .max(16)
                    .min(16)
                    .required('Card Number is required!'),
                exp_month: yup            
                    .string()                                           
                    .trim()
                    .max(2)
                    .min(2)
                    .required('Expiry month is required!'),
                exp_year: yup
                    .string()               
                    .trim()
                    .max(2)
                    .min(2)
                    .required('Expiry year is required!'),
                cvc: yup
                    .string()               
                    .max(3)
                    .min(3)                   
                    .trim()
                    .required('CVC is required!')        
                })}
                >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <Fragment>
                <Form>
                <Label style={styles.inputLabel} >Card Number</Label>
                
                <Item style={styles.inputItem} >
                <Icon type="AntDesign" name="creditcard" style={{color:"#bebebf",}} />
                    <Input style={{paddingLeft : 10,  fontSize : 12,  }} 
                    placeholder='xxxx xxxx xxxx xxxx'
                    value={values.cardnumber}
                    onChangeText={handleChange('cardnumber')}
                    onBlur={() => setFieldTouched('cardnumber')}
                    underlineColor="transparent"                 
                    autoCapitalize="none" 
                    keyboardType="numeric"                   
                    // selectionColor="#ffffff"                                        
                    />
                    { touched.cardnumber && errors.cardnumber &&
                        <Text style={{        
                            color : "red",         
                            position : "absolute",
                            bottom : 0,
                            left : 45        
                        }} >{errors.cardnumber}</Text>
                    }
                </Item>
               
                <Label style={styles.inputLabel} >Expiry Month</Label>
                <Item  style={styles.inputItem} >
                
                    <Input 
                    style={styles.formInputs} 
                    placeholder='MM'
                    value={values.exp_month}
                    onChangeText={handleChange('exp_month')}
                    onBlur={() => setFieldTouched('exp_month')}
                    underlineColor="transparent"                 
                    autoCapitalize="none"    
                    keyboardType="numeric"                
                    // selectionColor="#ffffff"                                        
                    />
                    { touched.exp_month && errors.exp_month &&
                        <Text style={{        
                            color : "red",         
                            position : "absolute",
                            bottom : 0,
                            left : 50        
                        }} >{errors.exp_month}</Text>
                    }
                </Item>
                <Label style={styles.inputLabel} >Expiry year</Label>
                <Item  style={styles.inputItem} >
                    <Input 
                    style={styles.formInputs} 
                    placeholder='YY'
                    value={values.exp_year}
                    onChangeText={handleChange('exp_year')}
                    onBlur={() => setFieldTouched('exp_year')}
                    underlineColor="transparent"                 
                    autoCapitalize="none"   
                    keyboardType="numeric"                 
                    // selectionColor="#ffffff"                                        
                    />
                    { touched.exp_year && errors.exp_year &&
                        <Text style={{        
                            color : "red",         
                            position : "absolute",
                            bottom : 0,
                            left : 50        
                        }} >{errors.exp_year}</Text>
                    }
                </Item>
                <Label style={styles.inputLabel} >CVC</Label>
                <Item  style={styles.inputItem} >
                    <Input 
                    style={styles.formInputs} 
                    placeholder='xxx'
                    value={values.cvc}
                    onChangeText={handleChange('cvc')}
                    onBlur={() => setFieldTouched('cvc')}
                    underlineColor="transparent"                 
                    autoCapitalize="none"  
                    keyboardType="numeric"                  
                    // selectionColor="#ffffff"                                        
                    />
                    { touched.cvc && errors.cvc &&
                        <Text style={{        
                            color : "red",         
                            position : "absolute",
                            bottom : 0,
                            left : 50        
                        }} >{errors.cvc}</Text>
                    }
                </Item>
                </Form>



                <ListItem  noBorder >
                <Text >Start my {trialdays}-days trial period, then pay ${amount}/month.   </Text>
                </ListItem>
                <ListItem  noBorder >
                <Text note >I confirm i have read and accepted the Terms and Conditions of Use. By clicking on "Start my free trial" you agree to immediately access the service and to waive any right of withdrawl. You may terminate your subscription at any time by going to "Settings" in your account. The termination will be applied at the end of the current subscription period.   </Text>
                </ListItem>
                
                <Button full style={styles.submitButton} onPress={handleSubmit} > 
                    <Text style={styles.linkText}>Start my free trial</Text>
                </Button>
                </Fragment>
                )}
                </Formik>  
          </List>         
          </Card>
          <ListItem>

          </ListItem>
        </Content>
      </Container>
    )}
  }