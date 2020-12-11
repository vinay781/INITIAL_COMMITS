import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, FlatList, Image, AsyncStorage, BackHandler, Dimensions, Alert } from 'react-native';
import { Container, Header, Content, Form, Input, Item, Footer, Left, Right, Body, Title, FooterTab, Button, Icon, Text, Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SeeAllComponent from '../components/SeeAllComponent';
import theme from '../config/theme';
import { styles } from '../config/style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class FullView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catlist: null
    };
  }

  loadCategoryData = (title, category) => {
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/" + category + "?category=" + title)
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
  render() {
    const { title, name, image, taxanomy } = this.props;

    const { catlist } = this.state;
    return (
      <Container style={styles.containerMainDiscover} >
        {/* <Header transparent>
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
        </Header> */}
        <Content style={{ backgroundColor: theme.DEFAULT_COLOR }} >
          <View style={{  width : (SCREEN_WIDTH  *114) / 100, height : (SCREEN_HEIGHT *52) / 100, paddingTop:22, }} >
            <Image
              source={{ uri: image }}
              style={{ width :  "100%", height :  "100%", resizeMode: 'cover'}}
            />
          </View>
          <View style={{justifyContent:'center', alignItems:'center', paddingVertical:10}}>
              <Text style={{ fontWeight: "bold", fontSize:22, color:"white", textAlign:"center",}}>{title}</Text>
            </View>
          {catlist && <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={catlist}
              renderItem={({ item }) => <SeeAllComponent
                music={catlist}
                post_id={item.id}
                post_title={item.title}
                artist={item.artist}
                post_image={item.artwork}
                post_file={item.url}
                post_isPurchasable={item.isPurchasable}
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