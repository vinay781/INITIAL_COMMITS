import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, FlatList, Image, AsyncStorage, BackHandler, Dimensions, Alert, Switch } from 'react-native';
import { Container, Header, Content, Left, Right, Body, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import theme from '../../config/theme';
import { styles } from '../../config/style';
import Albumsongscomponet from './Albumsongscomponet'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class AlbumMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catlist: null,
      isEnabled: false,
      isfavourite: false,
    };
  }

  loadCategoryData = (title, category) => {
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/albums?category=" + title)
      .then(response => response.json())
      .then(data => { this.setState({ loading: false, catlist: data.list }) })
      .catch((error) => { this.setState({ loading: false }) });
  }

  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.loadCategoryData(this.props.title, this.props.taxanomy);
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.loadCategoryData(this.props.title, this.props.taxanomy);
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackPress = () => {
    Actions.pop();
    return true;
  }
  toggleSwitch = () => {
    this.setState({ isEnabled: !this.state.isEnabled })
    if (!this.state.isEnabled) {
      Alert.alert(
        "Dowload Song",
        "Under progress",
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
    }
  }
  render() {
    const { title, name, image, description } = this.props;
    const { catlist, isEnabled, isfavourite } = this.state;
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>
            <Button transparent style={{ paddingLeft: 15 }} onPress={() => Actions.pop()}>
              <Icon name='arrow-back' style={{ color: "#fff" }} />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>{title}</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={{ backgroundColor: theme.DEFAULT_COLOR }} >
          <View style={{ flexDirection: "row", width: (SCREEN_WIDTH * 100) / 100, paddingTop: 20, alignItems: "flex-start", justifyContent: "space-around", }} >
            <View style={{ width: (SCREEN_WIDTH * 35) / 100, height: (SCREEN_WIDTH * 35) / 100 }}>
              {image != "" ? <Image source={{ uri: image }} style={styles.AlubmsImage} resizeMode="cover" /> :
                <Image source={theme.LOCALMUSIC} style={styles.AlubmsImage} resizeMode="cover" />}
            </View>
            <View style={{ width: (SCREEN_WIDTH * 55) / 100, height: (SCREEN_WIDTH * 45) / 100 }} >
              <Text style={{ fontWeight: "bold", fontSize: 20, color: "white", textAlign: "left" }}>{title}</Text>
              <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: 'white', fontSize: 15, textAlign: "left" }}>{description}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems : "center" }}>
                <Icon name='dot-single' type='Entypo' style={{ color: theme.LIGHT_GREY_COLOR }} />
                <Text style={{ color: 'white', fontSize: 14, fontWeight:'bold'}}>2020</Text>
              </View>
              <View style={{ marginTop: 25, flexDirection: 'row'}}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight:'bold' }}>56k </Text>
                <Text style={{ color: theme.LIGHT_GREY_COLOR, fontSize: 14 }}>Followers </Text>
                <View style={{height:'100%', width:1, backgroundColor:'#fff'}}></View>
                <Text style={{ color: 'white', fontSize: 15, fontWeight:'bold' }}> 18M </Text>
                <Text style={{ color: theme.LIGHT_GREY_COLOR, fontSize: 14 }}>Plays </Text>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'center', paddingHorizontal: 10, marginBottom: 30 }}>
            <Text style={{ fontSize: 15, color: 'white' }}>This debut album from stunna has proven be to one of the best work out of Liberia. 'Love Letters & Heartbreak' tells astory of sadness and happiness at the same time</Text>
          </View>

          <View style={{ justifyContent: "center" }}>
            <View style={{ width: "100%", height: 1, backgroundColor: "#fff", position: "absolute", zIndex: -1 }}></View>
            <View style={{ flexDirection: "row", marginTop: 5, width: (SCREEN_WIDTH * 100) / 100, justifyContent: "space-around", alignItems: "center" }}>
              {isfavourite ? <Icon name='favorite' type="MaterialIcons" style={{ color: "#ffff", backgroundColor: theme.DEFAULT_COLOR }} /> : <Icon name='favorite-border' type="MaterialIcons" style={{ color: "#ffff", backgroundColor: theme.DEFAULT_COLOR }} />}

              <Button style={{ borderRadius: 10, paddingHorizontal: 10, height: 40, backgroundColor: theme.BLUE_COLOR }} onPress={() => Actions.jump('playlistscreen', { currentmusic: catlist })}>
                <Text style={{ fontWeight: "600" }}>PLAY</Text></Button>

              <Icon name='share-outline' type="MaterialCommunityIcons" style={{ color: "#ffff", backgroundColor: theme.DEFAULT_COLOR }} />
            </View>
          </View>
          <View style={{ flexDirection: "row", margin: 10, width: (SCREEN_WIDTH * 90) / 100, justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>Download</Text>
            </View>
            <View>
              <Switch
                trackColor={{ false: "#ddd", true: "#ddd" }}
                thumbColor={isEnabled ? theme.PINK_COLOR : "#ddd"}
                ios_backgroundColor="#ccc"
                onValueChange={this.toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          {catlist && <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={catlist}
              renderItem={({ item, index }) => <Albumsongscomponet
                music={catlist}
                post_id={item.id}
                post_title={item.title}
                artist={item.artist}
                post_image={item.artwork}
                post_file={item.url}
                post_isPurchasable={item.isPurchasable}
                post_index={index}
              />
              }
              keyExtractor={(item, index) => {
                return item.id;
              }}
            />
          </View>
          }
        </Content>
      </Container>
    );
  }
}