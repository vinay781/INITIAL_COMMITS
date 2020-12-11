import React, { Component } from 'react';
import { View, Dimensions, Alert, BackHandler, FlatList, Image, TouchableHighlight, AsyncStorage } from "react-native";
import { Container, Header, Content, Footer, Left, Right, Body, Card, CardItem, ListTitle, FooterTab, Button, Icon, Text, ListItem, List, Spinner } from 'native-base';
import { styles } from '../../config/style';
import theme from '../../config/theme';
import { Actions } from 'react-native-router-flux';
import CardComponent from '../../components/CardComponent';
import AlbumComponent from '../../components/AlbumComponent';
import VideoPlayerComponent from '../../components/VideoPlayerComponent';
import FooterComponent from '../../components/FooterComponent';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class ArtistView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      artistname: null,
      artisimage: null,
      artistdescription: null,
      artistfollower: null,
      artisttotal_plays: null,
      featured: null,
      newrelease: null,
      playlist: [],
      videolist: null,
      albumlist: null,
      dataMsg: ''
    };
  }
  loadCategoryData = (id) => {
    AsyncStorage.getItem('usertoken').then(res => {
      //console.log("Category Id And Token", res+''+id)
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/musiclistByArtist?token=" +res+ "&category=" +id)
        .then(response => response.json())
        .then(data => {
          console.log('Load Category Data>>'+JSON.stringify(data))
          console.log("Name>> ",data.artistdetails.name)
          this.setState({
            loading: false, 
            artistname: data.artistdetails.name,
            artisimage: data.artistdetails.image,
            artistdescription: data.artistdetails.description,
            artistfollower: data.artistdetails.followersCount,
            artisttotal_plays: data.artistdetails.total_plays,
            newrelease: data.musicslist,
            playlist: data.playlist,
            featured: data.featuredlist,
            videolist: data.videolist,
          })
        })
        .catch((error) => { this.setState({ loading: false }) });
      
    });
  }

  followUnfollow(id) {
    console.log('Follow id>> ',id)
    AsyncStorage.getItem('usertoken').then(res => {
      var formData = new FormData();
      formData.append("token", res);
      formData.append("artist_id", id);
      console.log("Api", res+ " "+id)
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/user_follow_unfollow", { method: 'POST', headers: { 'Content-Type': 'multipart/form-data', }, body: formData })
        .then(response => response.json())
        .then(data => {
          console.log('FollowUnfollow Data',data)
          this.setState({
            dataMsg: data.msg
          })
          console.log('Following>> ' + this.state.dataMsg)
          //  Alert.alert(
          //   "Message",
          //   data.msg,
          //   [{
          //       text: "Cancel",            
          //       style: "cancel"
          //    },
          //    { text: "OK", onPress: () => console.log("OK Pressed") }
          //   ],
          //   { cancelable: false }
          // );
        }).then(
          Actions.refresh({ key: "artistview" })
        )
    })
  }

  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.loadCategoryData(this.props.id);
  }
  componentDidMount = async () => {
    this.loadCategoryData(this.props.id);
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
    return <Spinner style={styles.loadingContainer} color="#fff" />
  }

  render() {
    const { loading, artistname, artisimage, artistdescription, artistfollower, artisttotal_plays, featured, newrelease, playlist, albumlist, artistlist, genrelist, videolist, freemusic } = this.state
    const { id, post_image } = this.props
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>
            <Button transparent style={{ paddingLeft: 15 }} onPress={() => Actions.pop()}>
              <Icon name='arrow-back' style={{ color: "#fff" }} />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Artist</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={{ backgroundColor: theme.DEFAULT_COLOR }} >
          <View style={{ height: (SCREEN_WIDTH * 40) / 100, width: (SCREEN_WIDTH * 100) / 100, padding: 5, alignItems: "center" }}>
            <Image alter source={{ uri: artisimage }} style={{ width: (SCREEN_WIDTH * 25) / 100, height: (SCREEN_WIDTH * 25) / 100, borderRadius: 50 }} />
            <Text style={{ marginTop: 5, color: "#fff" }}>{artistname}</Text>
            {this.state.dataMsg != 'Artist already followed by current user' &&
            <View style={{ width: "15%", alignItems: "center", justifyContent: "center", marginLeft: 10, alignSelf: "flex-start", backgroundColor: theme.PINK_COLOR, borderRadius: 20 }}>
              <TouchableHighlight onPress={() => this.followUnfollow(id)}>
              <Text style={{ fontSize: 12, }}>Follow</Text>
              </TouchableHighlight>
            </View>
            }
            {this.state.dataMsg == 'Artist already followed by current user' &&
            <View style={{ width: "20%", alignItems: "center", justifyContent: "center", marginLeft: 10, alignSelf: "flex-start", backgroundColor: theme.PINK_COLOR, borderRadius: 20 }}>
            <TouchableHighlight onPress={() => this.followUnfollow(id)}>
                <Text style={{ fontSize: 12, }}>Following</Text>
              </TouchableHighlight>
            </View>
            }
            {/* <View style={{ width: "15%", alignItems: "center", justifyContent: "center", marginLeft: 10, alignSelf: "flex-start", backgroundColor: theme.PINK_COLOR, borderRadius: 20 }}>
              {this.state.dataMsg == 'Artist already followed by current user' ?
                <Text style={{ fontSize: 12, }}>Following</Text> : <Text style={{ fontSize: 12, }}>Follow</Text>
              }
            </View> */}
          </View>
          <View style={{ borderTopWidth: 2, borderBottomWidth: 2, borderColor: "#fff", width: (SCREEN_WIDTH * 100) / 100, padding: 5, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-around" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "#fff" }}>{artistfollower}</Text>
              <Text style={{ fontSize: 12, color: "#fff" }}>Followers</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "#fff" }}>4</Text>
              <Text style={{ fontSize: 12, color: "#fff" }}>Following</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "#fff" }}>{artisttotal_plays}</Text>
              <Text style={{ fontSize: 12, color: "#fff" }}>Total Plays</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "#fff" }}>2000</Text>
              <Text style={{ fontSize: 12, color: "#fff" }}>Download</Text>
            </View>
          </View>
          { artistdescription == null &&
          <View style={{ borderBottomWidth: 2, borderColor: "#fff", padding: 15, width: (SCREEN_WIDTH * 100) / 100 }}>
            <Text numberOfLines={2} style={{ color: "#fff", fontSize: 12 }}>{artistdescription}</Text>
          </View>
          }
          <List style={{ paddingHorizontal: 10 }}>
            {/************ NEW RELEASE *********************/}

            <ListItem noBorder style={styles.homeSliderHeader}>
              <Left style={styles.sliderHeaderLeft}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}> Artist Top Releases</Text>
              </Left>
              <Right>
                <Button transparent small onPress={() => { Actions.jump("newreleasesview", { title: "Artist Top Releases", type: "Fromartist", id: id }) }}>
                  <Text style={styles.homeSeeAllButton} > See all </Text>
                </Button>
              </Right>
            </ListItem>
            <View>
              {newrelease == null ? this.renderLoader() :
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={newrelease}
                  renderItem={({ item }) => <CardComponent
                    color={true}
                    height={(SCREEN_WIDTH * 26) / 100}
                    width={(SCREEN_WIDTH * 26) / 100}
                    radius={6}
                    music={newrelease}
                    post_title={item.title}
                    post_file={item.url}
                    post_image={item.artwork}
                    post_id={item.id}
                    post_artist={item.artist}
                    post_isPurchasable={item.isPurchasable}
                  />}
                  keyExtractor={(item, index) => {
                    return item.id.toString();
                  }}
                />
              }
            </View>
            {/************ ALBUMS *********************/}
            <ListItem noBorder style={styles.homeSliderHeader}>
              <Left style={styles.sliderHeaderLeft}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>Artist Album </Text>
              </Left>
              <Right >
                <Button transparent small onPress={() => { Actions.jump("", { title: "ALBUMS", type: "albums" }) }}>
                  <Text style={styles.homeSeeAllButton} > See all </Text>
                </Button>
              </Right>
            </ListItem>
            <View>
              {albumlist == null ? this.renderLoader() :
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={Data}
                  renderItem={({ item }) => <View style={{ marginHorizontal: 5, backgroundColor: "#0A151F" }}>
                    <TouchableHighlight activeOpacity={0.6} >
                      <Card style={{ elevation: 3, backgroundColor: "#0A151F", borderColor: "#0A151F" }}>
                        <CardItem cardBody style={{ backgroundColor: "#0A151F" }} >
                          <Image source={{ uri: item.artwork }} style={{ borderRadius: 10, height: (SCREEN_WIDTH * 21) / 100, width: (SCREEN_WIDTH * 21) / 100 }} />
                        </CardItem>
                        <List style={{ width: (SCREEN_WIDTH * 21) / 100, backgroundColor: "#0A151F", paddingVertical: 5 }}>
                          <Body>
                            <Text style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}>{item.title}</Text>
                          </Body>
                        </List>
                      </Card>
                    </TouchableHighlight>
                  </View>}
                  keyExtractor={(item, index) => { return item.id.toString() }}
                />
              }
            </View>
            {/************ ARTISTS playlist *********************/}
            <ListItem noBorder style={styles.homeSliderHeader}>
              <Left style={styles.sliderHeaderLeft}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}> Playlist(Artist in) </Text>
              </Left>
              <Right>
                <Button transparent small onPress={() => { Actions.jump("freemusicview", { title: "Playlist", type: "Featuredartist", id: id, tags: 'playlist' }) }}>
                  <Text style={styles.homeSeeAllButton} > See all </Text>
                </Button>
              </Right>
            </ListItem>
            <View>
              {playlist.length == 0 ? this.renderLoader() :
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={playlist}
                  renderItem={({ item }) => <CardComponent
                    color={true}
                    height={(SCREEN_WIDTH * 26) / 100}
                    width={(SCREEN_WIDTH * 26) / 100}
                    radius={6}
                    music={freemusic}
                    post_id={item.id}
                    post_title={item.title}
                    post_image={item.artwork}
                    post_file={item.url}
                    post_artist={item.artist}
                    post_isPurchasable={item.isPurchasable}
                  />}
                  keyExtractor={(item, index) => {
                    return item.id.toString()
                  }}
                />
              }
            </View>

            {/************ FREE MUSIC *********************/}
            <ListItem noBorder style={styles.homeSliderHeader}>
              <Left style={styles.sliderHeaderLeft}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}> Featured In </Text>
              </Left>
              <Right>
                <Button transparent small onPress={() => { Actions.jump("freemusicview", { title: "FEATURED", type: "Featuredartist", id: id, tags: 'featured' }) }}>
                  <Text style={styles.homeSeeAllButton} > See all </Text>
                </Button>
              </Right>
            </ListItem>
            <View>
              {featured == null ? this.renderLoader() :
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={featured}
                  renderItem={({ item }) => <CardComponent
                    color={true}
                    height={(SCREEN_WIDTH * 26) / 100}
                    width={(SCREEN_WIDTH * 26) / 100}
                    radius={6}
                    music={freemusic}
                    post_id={item.id}
                    post_title={item.title}
                    post_image={item.artwork}
                    post_file={item.url}
                    post_artist={item.artist}
                    post_isPurchasable={item.isPurchasable}
                  />}
                  keyExtractor={(item, index) => {
                    return item.id.toString()
                  }}
                />
              }
            </View>
            {/************ VIDEOS *********************/}
            <ListItem noBorder style={styles.homeSliderHeader}>
              <Left style={styles.sliderHeaderLeft}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}> Music Video </Text>
              </Left>
              <Right>
                <Button transparent small
                  onPress={() => { Actions.jump("videosview", { title: "VIDEOS", type: "videosartist", id: id }) }}
                >
                  <Text style={styles.homeSeeAllButton} > See all </Text>
                </Button>
              </Right>
            </ListItem>
            <View>
              {videolist == null ? this.renderLoader() :
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={videolist}
                  renderItem={({ item }) => <VideoPlayerComponent
                    color={true}
                    height={(SCREEN_WIDTH * 26) / 100}
                    width={(SCREEN_WIDTH * 40) / 100}
                    radius={5}
                    music={videolist}
                    post_title={item.title}
                    post_name={item.albums != false && item.albums[0].name}
                    post_file={item.url}
                    post_image={item.artwork}
                  />}
                  keyExtractor={(item, index) => { return item.id.toString() }}
                />
              }
            </View>
          </List>
        </Content>
        <FooterComponent activeTab={"home"} />
      </Container>
    );
  }
}

const Data = [{ "id": 8, "title": "Stunna Feat", "artwork": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/08/Stunna-Album-Artwork.jpeg", },
{ "id": 8, "title": "Stunna Feat", "artwork": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/14_1589886523_profile.jpeg", }, { "id": 8, "title": "Stunna Feat", "artwork": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/08/Stunna-Album-Artwork.jpeg", }, { "id": 8, "title": "Stunna Feat", "artwork": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/14_1589886523_profile.jpeg", }
]