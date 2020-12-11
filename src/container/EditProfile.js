import React, { Component, Fragment } from 'react';
import { View, ImageBackground, TouchableOpacity, Image, AsyncStorage, BackHandler, NativeModules, Alert, Platform } from 'react-native';
import { Container, Header, Content, Form, Input, Item, Footer, Left, Right, Body, Title, FooterTab, Button, Icon, Text, Card, CardItem, Thumbnail, ListItem, List, Spinner, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
var ImagePicker = NativeModules.ImageCropPicker;
import theme from '../config/theme';
import { styles } from '../config/style';
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      newimage: null
    };
  }
  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackPress = () => {
    Actions.pop();
    return true;
  }
  renderLoader() {
    return <Spinner style={styles.loadingContainer} color="#724894" />
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
          uri: Platform.OS === 'ios' ? `data:${image.mime};base64,` + image.data : image.path,
          width: image.width,
          height: image.height
        }
      });
    }).catch(e => Alert.alert(
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

  editConfirm(values, id, newimage) {
    Alert.alert(
      'Sure to update profile?',
      '', [{
        text: 'No',
        onPress: () => { console.log('Cancel Pressed') },
        style: 'cancel'
      }, {
        text: 'Yes',
        onPress: () => { this.editUser(values, id, newimage) }
      },], {
      cancelable: false
    }
    )
  }
  editUser(values, id, newimage) {
    AsyncStorage.getItem('usertoken').then(res => {
      var formData = new FormData();
      formData.append("token", res);

      newimage != null && formData.append("profile_picture", {
        name: "profile.jpeg",
        type: 'image/jpeg',
        uri: newimage.uri,
      });

      formData.append("first_name", values.username);
      this.setState({ loading: true })
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/user_update", { method: 'POST', headers: { 'Content-Type': 'multipart/form-data', }, body: formData })
        .then(response => response.json())
        .then(data => {
          this.setState({ loading: false })
          if (data.status == 'ok') {
            Alert.alert(
              "Success",
              data.msg,
              [{
                text: "OK",
                style: "cancel",
                onPress: () => {

                  Actions.jump('profile')
                  setTimeout(() => {
                    Actions.refresh({ key: 'profile' })
                  }, 800)
                }
              }
              ],
              { cancelable: true }
            )
          } else {
            this.setState({ loading: false })
            Alert.alert(
              "Error",
              "Failed to update",
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
          this.setState({ loading: false })
          Alert.alert(
            "Error",
            "Network Connection Failed",
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

  render() {
    const { id, username, image, email } = this.props
    const { loading, newimage } = this.state
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>
            <Button transparent style={{ paddingLeft: 15 }} onPress={() => Actions.pop()}>
              <Icon name='arrow-back' style={{ color: "#fff" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "white" }}> Edit Profile</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={{ backgroundColor: theme.DEFAULT_COLOR }} >
          <View style={styles.containerInnerImage} >
            <View style={styles.imageOuterView}>
              <TouchableOpacity onPress={() => this.pickSingleBase64(false)}>
                {(newimage != null) ? <Image
                  source={newimage}
                  style={styles.imageEditMyAccount}
                /> : <Image
                    source={{ uri: image }}
                    style={styles.accountProfileImage}
                  />}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
            <Formik
              initialValues={{ username: username, email: email }}
              onSubmit={values => this.editConfirm(values, id, newimage)}
              validationSchema={yup.object().shape({
                username: yup
                  .string()
                  .trim()
                  .required('Username is required!'),
                email: yup
                  .string()
                  .email('Enter valid email address!')
                  .trim()
                  .required('Email is required!'),
              })}
            >
              {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <Fragment>
                  <Form>
                    <Item floatingLabel style={styles.inputItemMA} >
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
                        disabled={true}
                      />
                      {touched.email && errors.email &&
                        <Text style={styles.errorInput} >{errors.email}</Text>
                      }
                    </Item>

                    <View style={{ backgroundColor: theme.WHITE_COLOR }}>
                      {loading && this.renderLoader()}
                    </View>

                    <Button full style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.linkText} >Save Changes</Text>
                    </Button>
                    <Button full bordered style={{ borderRadius: 20, marginVertical: 20, marginHorizontal: 30, height: 50, borderColor: "#326799" }} onPress={() => Actions.jump('changepassword')}>
                      <Text style={{ color: '#326799' }}>Change Password</Text>
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