import React, { Component, Fragment } from 'react';
import { View, Image, TouchableHighlight, Dimensions, Alert, AsyncStorage, Modal, TouchableOpacity, Share } from 'react-native';
import { ListItem, Text, Icon, Button, Item, Input, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { styles } from "./style";
import theme from '../../config/theme';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islike: this.props.post_isliked,
      modalVisible: false,
      loading: false,
    };
    console.log('Post like>> ', this.state.islike)
  }
  
  likePost = async (postid) => {
    AsyncStorage.getItem('usertoken').then(token => {
      var formData = new FormData();
      formData.append("token", token);
      formData.append("postid", postid);
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz_likeunlike", { method: 'POST', headers: { 'Content-Type': 'multipart/form-data', }, body: formData })
        .then(response => response.json())
        .then(data => {
          // console.log("BUZZ LIKE : ", data)
          data.islike == 'false' ? this.setState({ islike: false }) : this.setState({ islike: true })
        })
        .catch((error) => { console.log(error) })
    });
  }

  renderLoader() {
    return <Spinner style={styles.loadingContainer} color={theme.PINK_COLOR} />
  }

  addComment(values, postid) {
    const { title } = values
    console.log('Title', title)
    this.setState({  loading: true })
    AsyncStorage.getItem('usertoken').then(token => {
      var formData = new FormData();
      formData.append("token", token);
      formData.append("post_id", postid);
      formData.append("comment", title);
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz_addcomment", { method: 'POST', headers: { 'Content-Type': 'multipart/form-data', }, body: formData })
        .then(response => response.json())
        .then(data => {
          // console.log("Comment : ", data)
          Actions.refresh({key: Math.random()});
        })
        .catch((error) => { console.log(error) })
        .finally(() => {
          console.log('Finally')
          this.setState({
            loading: false,
            modalVisible: false
          })
        })
    });

  }

  sharePost = (postid, post_url) => {
    //Alert.alert("share" + postid)
    console.log('Post Url', post_url)
    console.log('Post ID ==> ',postid)

    AsyncStorage.getItem('usertoken').then(token => {
      var formData = new FormData();
      formData.append("token", token);
      formData.append("postid", postid);
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/shareBuzzByUser", { method: 'POST', headers: { 'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {
        // console.log("Share : ", data)
        Share.share({
          title: 'Enterment Post',
          message: post_url
        }).then((res) => {
          console.log(res)
        })
          .catch((error) => console.log(error))
      })
      .catch((error) => { console.log(error) })

    })
  }

  render() {
    const { postid, post_image, post_title, post_time, post_description, post_likes, post_comments, post_share, post_isliked, post_url} = this.props
    const { islike, loading } = this.state
    console.log("post_isliked >>> ", post_isliked)
    
    return (
      <View>
        <View style={styles.profileComponent}>
          <TouchableHighlight onPress={() => Actions.jump('buzzpreview', { post_image: post_image, post_description: post_description, post_title: post_title })}>
            <View style={styles.profileComponentRow}>
              <Image source={{ uri: post_image }} style={styles.profileComponentRowImage} />
              <View style={styles.profileComponentRowBody}>
                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.profileComponentTitle}>{post_title}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.profileComponentDescription}>{post_description}</Text>
                <View style={styles.profileComponentTopButton}>
                  <Icon name="diamond" type="SimpleLineIcons" style={styles.profileComponentDiamondIcon} />
                  <Text style={styles.profileComponentTopText}> Top </Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16, width: (SCREEN_WIDTH * 90) / 100 }}>
            <View style={{ width: "30%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
              {islike == true ? <Icon type="EvilIcons" name="like" style={{ color: theme.BLUE_COLOR }} onPress={() => this.likePost(postid)} /> : <Icon type="EvilIcons" name="like" style={{ color: theme.WHITE_COLOR }} onPress={() => this.likePost(postid)} />}
              <Text style={{ fontWeight: "200", color: "#ccc", fontWeight: "bold", fontSize: 10 }}>{post_likes}</Text>
            </View>
            <View style={{ width: "30%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
              <Icon type="EvilIcons" name="comment" style={{ color: 'white' }} onPress={() => this.setState({ modalVisible: true })} />
              <Text style={{ fontWeight: "200", color: "#ccc", fontWeight: "bold", fontSize: 10 }}>{post_comments}</Text>
            </View>
            <View style={{ width: "30%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
              <Icon type="EvilIcons" name="share-google" style={{ color: 'white' }} onPress={() => this.sharePost(postid, post_url)} />
              <Text style={{ fontWeight: "200", color: "#ccc", fontWeight: "bold", fontSize: 10 }}>{post_share}</Text>
            </View>
          </View>
        </View>
        <ListItem></ListItem>
        <Modal
          animationType="slide"
          transparent={true}
          presentationStyle="overFullScreen"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            this.setState({ modalVisible: false })
          }}>
          <View style={{ height: (SCREEN_HEIGHT * 60) / 100, backgroundColor: "transparent" }}>
            <View style={{ marginTop: (SCREEN_WIDTH * 30) / 100, height: "50%", marginHorizontal: (SCREEN_WIDTH * 5) / 100, width: (SCREEN_WIDTH * 90) / 100, alignItems: "center", backgroundColor: theme.WHITE_COLOR, borderRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 10, }, shadowOpacity: 0.53, shadowRadius: 13.97, elevation: 21, }}>
              <View style={{ width: "100%", }}>
                <Button transparent onPress={() => this.setState({ modalVisible: false })} >
                  <Icon name='close' style={{ color: "#000" }} />
                </Button>
              </View>
              <View style={{ height: "80%", width: "100%", justifyContent: "center", alignContent: "center" }}>
                <Formik
                  initialValues={{ title: "" }}
                  onSubmit={(values) => { this.addComment(values, postid) }}
                  validationSchema={yup.object().shape({
                    title: yup
                      .string()
                      .trim()
                      .required('Please Enter Comment')
                  })}
                >
                  {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <Fragment>
                      <View style={{ width: "100%", justifyContent: "center", paddingHorizontal: "8%", marginVertical: 10, flexDirection: "row", alignItems: "center" }}>
                        <Item style={{ width: "80%" }}>
                          <Input
                            style={styles.formInputs}
                            placeholder='Comment'
                            value={values.title}
                            onChangeText={handleChange('title')}
                            onBlur={() => setFieldTouched('title')}
                            underlineColor="transparent"

                          />
                          {touched.title && errors.title &&
                            <Text style={styles.errorInput} >{errors.title}</Text>
                          }
                        </Item>

                      </View>
                      <View style={{ marginTop: 20, justifyContent: "center", alignContent: "center", alignItems: 'center' }}>
                        <View style={{ paddingTop: 10 }}>
                          <Button style={styles.logOutButton} onPress={handleSubmit}>
                            <Text style={styles.linkTextLo} > SAVE </Text>
                            {loading && this.renderLoader()}
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
      </View>
    );
  }
}