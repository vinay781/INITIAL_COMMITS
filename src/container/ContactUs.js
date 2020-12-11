import React, { Component, Fragment } from 'react';
import { View, ImageBackground, TouchableOpacity, Image, AsyncStorage, BackHandler, NativeModules, Alert, Platform, TextInput,ToastAndroid } from 'react-native';
import { Container, Header, Content, Form, Input, Item, Footer, Left, Right, Body, Title, Button, Icon, Text, Label, Textarea,Spinner, Toast } from 'native-base';
import { styles } from '../config/style';
import theme from '../config/theme';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  submitContact = (values) => {
    const { comment } = values
    console.log('Comment>> ', comment)
    this.setState({  loading: true })
    AsyncStorage.getItem('usertoken').then(token => {
      var formData = new FormData();
      formData.append("token", token);
      formData.append("message", comment);
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/contactUsMail", { method: 'POST', headers: { 'Content-Type': 'multipart/form-data', }, body: formData })
        .then(response => response.json())
        .then(data => {
          if(data.status == 'ok'){
            Toast.show({
              text: data.msg,
              duration: 3000
            })
          }
          else{
            Toast.show({
              text: data.msg,
              duration: 3000
            })
          }
        })
        .catch((error) => { console.log(error) })
        .finally(() => {
          console.log('Finally')
          this.setState({
            loading: false,
          })
        })
    })
  }

  renderLoader() {
    return <Spinner style={styles.loadingContainer} color={theme.PINK_COLOR} />
  }

  render() {
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>
            <Button transparent style={{ paddingLeft: 15 }} onPress={() => Actions.pop()}>
              <Icon name='arrow-back' style={{ color: "#fff" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "white" }}> Contact Us</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={{ backgroundColor: theme.DEFAULT_COLOR }} >
          <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
            <Formik
              initialValues={{comment: '' }}
              onSubmit={(values, {resetForm}) => {
                this.submitContact(values)
                resetForm()
              }}
              validationSchema={yup.object().shape({
                comment: yup
                  .string()
                  .trim()
                  .required('Comment is required')
              })}
            >
              {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <Fragment>
                  <Form>
                    {/* <Item floatingLabel style={styles.inputItemMA} >
                      <Label style={{ color: "#326799" }}>Full Name</Label>
                      <Input
                        style={{ color: "#ccc" }}
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={() => setFieldTouched('username')}
                        placeholder='Full Name'
                        underlineColor="transparent"
                        autoCapitalize="none"
                      />
                      {touched.username && errors.username &&
                        <Text style={styles.errorInput} >{errors.username}</Text>
                      }
                    </Item>
                    <Item floatingLabel style={styles.inputItemMA}  >
                      <Label style={{ color: "#326799" }}>Email</Label>
                      <Input
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                        placeholder='Email'
                        style={{ color: "#ccc" }}
                        underlineColor="transparent"
                        autoCapitalize="none"
                      />
                      {touched.email && errors.email &&
                        <Text style={styles.errorInput} >{errors.email}</Text>
                      }
                    </Item>
                    <Item floatingLabel style={styles.inputItemMA}  >
                      <Label style={{ color: "#326799" }}>Mobile</Label>
                      <Input
                        value={values.email}
                        onChangeText={handleChange('mobile')}
                        onBlur={() => setFieldTouched('mobile')}
                        placeholder='Mobile'
                        style={{ color: "#ccc" }}
                        underlineColor="transparent"
                        autoCapitalize="none"
                      />
                      {touched.mobile && errors.mobile &&
                        <Text style={styles.errorInput} >{errors.mobile}</Text>
                      }
                    </Item> */}
                      <Textarea
                        value={values.comment}
                        rowSpan={5}
                        bordered
                        onChangeText={handleChange('comment')}
                        onBlur={() => setFieldTouched('comment')}
                        placeholder='Comment'
                        style={{ color: "#ccc", borderRadius:10}}
                        underlineColor="transparent"
                        autoCapitalize="none"
                      />
                      {touched.comment && errors.comment &&
                        <Text style={styles.errorInput} >{errors.comment}</Text>
                      }
                    <Button full style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.linkText} >Submit</Text>
                      {this.state.loading && this.renderLoader()}
                    </Button>
                  </Form>
                </Fragment>
              )}
            </Formik>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ContactUs;
